import { useRef } from "react";
import { Link } from "react-scroll";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";
import Button from "../ui/Button";
import HeroImage from "./HeroImage";
import HeroCard from "./HeroCard";
import { HERO } from "../../content/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const photoFrameRef = useRef(null);
  const photoTiltRef = useRef(null);
  const badgeRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (!reducedMotion && badgeRef.current) {
        gsap.to(badgeRef.current, { rotation: 360, duration: 18, repeat: -1, ease: "none" });
      }

      // Entrance plays immediately on load, synced to the intro loader's own wipe-out — the
      // Hero must be fully visible the instant a first-time visitor lands, never gated behind
      // a scroll action. Each headline line flips down from a folded-up 3D state; supporting
      // content, the portrait and the floating cards build in right after.
      gsap.set("[data-hero-line3d]", { transformPerspective: 900, transformOrigin: "50% 100%" });

      const tl = gsap.timeline({ delay: reducedMotion ? 0 : 1.55, defaults: { ease: "power3.out" } });

      if (reducedMotion) {
        gsap.set(["[data-hero-line3d]", "[data-hero-buildin]", "[data-hero-photo]", "[data-hero-card]"], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        });
      } else {
        tl.fromTo(
          "[data-hero-line3d]",
          { rotateX: -100, opacity: 0 },
          { rotateX: 0, opacity: 1, ease: "power2.out", stagger: 0.12, duration: 0.7 },
          0
        )
          .fromTo(
            "[data-hero-buildin]",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
            "-=0.45"
          )
          .fromTo(
            "[data-hero-photo]",
            { opacity: 0, y: 20, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
          )
          .fromTo(
            photoFrameRef.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" },
            "<"
          )
          .fromTo(
            "[data-hero-card]",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            "[data-hero-bigtext]",
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8 },
            "-=0.6"
          );
      }

      // Live mouse-parallax tilt on the photo — precise pointers only (touch just gets the
      // static reveal above, no synthetic hover to fight).
      let cleanupTilt = null;
      if (!reducedMotion && photoTiltRef.current && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const tiltEl = photoTiltRef.current;
        const rotateXTo = gsap.quickTo(tiltEl, "rotationX", { duration: 0.5, ease: "power3" });
        const rotateYTo = gsap.quickTo(tiltEl, "rotationY", { duration: 0.5, ease: "power3" });

        const handleMove = (e) => {
          const rect = tiltEl.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          rotateXTo(6 - py * 12);
          rotateYTo(px * 12 - 6);
        };
        const handleLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
        };

        tiltEl.addEventListener("mousemove", handleMove);
        tiltEl.addEventListener("mouseleave", handleLeave);
        gsap.set(tiltEl, { transformPerspective: 700, transformStyle: "preserve-3d" });

        cleanupTilt = () => {
          tiltEl.removeEventListener("mousemove", handleMove);
          tiltEl.removeEventListener("mouseleave", handleLeave);
        };
      }

      // Bonus, non-gating scroll effect: once the Hero is already fully visible, scrolling
      // past it eases the content up and out while the background blobs drift a bit faster —
      // no pin, so it never blocks the initial reveal or holds the user in place.
      if (!reducedMotion) {
        gsap.to("[data-hero-parallax]", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      }

      // Holds the (already fully visible) Hero in place for one extra viewport height so the
      // card right after it — see App.jsx — can rise up from below and visibly slide over it,
      // rounded top edge first, instead of the two sections just handing off. Desktop only:
      // mobile browser chrome resizing mid-pin is a known source of jank for viewport-based pins.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const pin = ScrollTrigger.create({ trigger: section, start: "top top", end: "+=100%", pin: true });
        return () => pin.kill();
      });

      return () => {
        tl.kill();
        cleanupTilt?.();
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-14 px-4 sm:px-6 lg:px-12"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,black,transparent)]" />
      </div>

      <div data-hero-parallax className="relative z-10 mx-auto w-full max-w-[92rem]">
        <div className="relative lg:min-h-[70vh]">
          {/* Text column — constrained width so the portrait has room to bleed in on the right */}
          <div className="relative z-20 lg:max-w-[52%] xl:max-w-[48%]">
            <div data-hero-buildin className="mb-7 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {HERO.kicker}
              </span>
            </div>

            <h1 className="mb-7 font-display font-bold tracking-tight text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.98] text-foreground">
              {HERO.headline.map((line, i) => (
                <span key={i} data-hero-line3d className="block will-change-transform">
                  {line.text}
                  {line.accent && <span className="text-primary">{line.accent}</span>}
                </span>
              ))}
            </h1>

            <p data-hero-buildin className="mb-4 max-w-lg text-lg text-muted-foreground leading-relaxed sm:text-xl">
              {HERO.subtext}
            </p>
            <p data-hero-buildin className="mb-9 font-mono text-sm text-primary/80">
              {HERO.proofLine}
            </p>

            <div data-hero-buildin className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to={HERO.ctaPrimary.to} smooth duration={500} offset={-80}>
                <Button variant="primary" magnetic className="group px-8 text-base">
                  {HERO.ctaPrimary.label}
                  <HiArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to={HERO.ctaSecondary.to} smooth duration={500} offset={-80}>
                <Button variant="outline" magnetic className="group px-8 text-base">
                  {HERO.ctaSecondary.label}
                </Button>
              </Link>
            </div>
          </div>

          {/* Portrait — bleeds to the edge and behind the nav, integrated (not boxed) into the scene */}
          <div
            data-hero-photo
            className="relative mx-auto mt-14 aspect-[4/5] w-full max-w-sm sm:max-w-md lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[46%] lg:max-w-none lg:-top-16 lg:-bottom-10"
          >
            <HeroImage tiltRef={photoTiltRef} frameRef={photoFrameRef} badgeRef={badgeRef} reducedMotion={reducedMotion} />
          </div>

          {/* Large editorial typography, sitting low and behind the portrait */}
          <div
            data-hero-bigtext
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-[2%] z-0 hidden select-none overflow-hidden md:block"
          >
            <span
              className="block whitespace-nowrap font-display font-bold leading-none tracking-tight text-stroke text-[clamp(3rem,8.5vw,8rem)]"
              style={{ "--stroke-color": "rgb(var(--fg-rgb) / 0.16)" }}
            >
              {HERO.bigText}
            </span>
          </div>

          {/* Floating tech cards */}
          <div className="relative z-20 mt-10 flex flex-wrap justify-center gap-4 lg:absolute lg:bottom-4 lg:left-0 lg:mt-0 lg:justify-start lg:max-w-[50%]">
            {HERO.cards.map((card, i) => (
              <HeroCard
                key={card.title}
                title={card.title}
                items={card.items}
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden="true">
        <Link to="about" smooth duration={500} offset={-80}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary cursor-pointer">
            <span className="text-xs font-mono">Scroll</span>
            <HiChevronDown className="h-5 w-5 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
