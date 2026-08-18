import { useRef, useState } from "react";
import { HiArrowUpRight, HiArrowsRightLeft } from "react-icons/hi2";
import { gsap, useGSAP } from "../lib/gsap";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
import { PROJECTS } from "../content/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SHOWCASE_IDS = ["stock-analyzer", "pakjoblive", "kraftell", "the-huddle", "verocta", "wedding-aisle"];
const SHOWCASE = SHOWCASE_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

const Panel = ({ project, index }) => {
  const href = project.demo || project.github;
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer", "data-cursor": "View" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      data-sw-panel
      className="group block relative w-[82vw] sm:w-[60vw] lg:w-[46vw] xl:w-[38vw] h-[62vh] sm:h-[68vh] max-h-[560px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="absolute inset-0">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image || undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <span className="absolute top-5 right-5 sm:top-6 sm:right-6 font-display text-5xl sm:text-6xl font-semibold text-stroke select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">{project.title}</h3>
          {href && (
            <HiArrowUpRight className="text-2xl sm:text-3xl text-primary shrink-0 -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          )}
        </div>
        <p className="text-muted-foreground text-sm max-w-md mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const SelectedWork = () => {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [atStart, setAtStart] = useState(true);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      gsap.fromTo(
        track.querySelectorAll("[data-sw-panel]"),
        reducedMotion ? {} : { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        }
      );

      const updateProgress = () => {
        const max = track.scrollWidth - track.clientWidth;
        const ratio = max > 0 ? track.scrollLeft / max : 0;
        setAtStart(track.scrollLeft < 4);
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: Math.max(0.04, Math.min(1, ratio || 0.04)) });
        }
      };
      updateProgress();

      // Plain vertical mouse-wheel gets converted to horizontal scroll. Trackpad users
      // sending real deltaX (a natural two-finger horizontal swipe) are left alone so the
      // browser's own native horizontal scroll handles it — converting deltaY on top of
      // that would fight the gesture and make it feel stuck.
      const handleWheel = (e) => {
        const max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        const atLeftEdge = track.scrollLeft <= 0;
        const atRightEdge = track.scrollLeft >= max - 1;
        const scrollingForward = e.deltaY > 0;
        if ((atLeftEdge && !scrollingForward) || (atRightEdge && scrollingForward)) return;

        e.preventDefault();
        track.scrollLeft += e.deltaY;
      };

      // Click-and-drag scrolling with a thrown-momentum finish, built on plain Pointer Events
      // (not GSAP's Draggable, whose "scroll" mode inserts its own wrapper element around the
      // target's children and silently broke this flex layout — verified directly). Gated to
      // `pointerType === "mouse"` per-event — not a one-time capability check — so touch/pen
      // still fall through untouched to native scrolling.
      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;
      let lastX = 0;
      let lastTime = 0;
      let velocity = 0;
      let momentumTween = null;

      const handlePointerDown = (e) => {
        if (e.pointerType !== "mouse") return;
        isDragging = true;
        startX = e.clientX;
        startScrollLeft = track.scrollLeft;
        lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
        momentumTween?.kill();
        track.setPointerCapture?.(e.pointerId);
      };

      const handlePointerMove = (e) => {
        if (!isDragging) return;
        track.scrollLeft = startScrollLeft - (e.clientX - startX);

        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) velocity = (e.clientX - lastX) / dt;
        lastX = e.clientX;
        lastTime = now;
      };

      const handlePointerUp = () => {
        if (!isDragging) return;
        isDragging = false;

        const throwDistance = velocity * 220;
        if (Math.abs(throwDistance) > 4 && !reducedMotion) {
          const max = track.scrollWidth - track.clientWidth;
          const target = gsap.utils.clamp(0, max, track.scrollLeft - throwDistance);
          momentumTween = gsap.to(track, { scrollLeft: target, duration: 0.7, ease: "power3.out" });
        }
      };

      track.addEventListener("scroll", updateProgress, { passive: true });
      track.addEventListener("wheel", handleWheel, { passive: false });
      track.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("resize", updateProgress);

      return () => {
        track.removeEventListener("scroll", updateProgress);
        track.removeEventListener("wheel", handleWheel);
        track.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("resize", updateProgress);
        momentumTween?.kill();
      };
    },
    { scope: trackRef, dependencies: [reducedMotion] }
  );

  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* No max-w wrapper here on purpose: this row shares the exact same px-* padding as the
          scroll track below so their left edges always line up, at every viewport width. */}
      <div className="px-4 sm:px-6 lg:px-12 mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-primary">00</span>
            <span className="h-px w-10 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Selected Work
            </span>
          </div>
          <RevealText
            as="h2"
            id="work-heading"
            text="Shipped products, not just mockups."
            className="text-foreground max-w-2xl"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground/70 mb-2">
          <HiArrowsRightLeft className={`text-base transition-opacity ${atStart ? "opacity-100" : "opacity-30"}`} />
          <span>Drag to explore</span>
        </div>
      </div>

      <div
        ref={trackRef}
        data-cursor="Drag"
        className="flex gap-5 px-4 sm:px-6 lg:px-12 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {SHOWCASE.map((project, i) => (
          <Panel key={project.id} project={project} index={i} />
        ))}
        <div className="shrink-0 w-px sm:w-4 lg:w-8" aria-hidden="true" />
      </div>

      <div className="px-4 sm:px-6 lg:px-12 mt-4">
        <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full w-full bg-primary origin-left" style={{ transform: "scaleX(0.04)" }} />
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
