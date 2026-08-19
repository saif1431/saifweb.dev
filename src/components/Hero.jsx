import { useRef } from "react";
import { Link } from "react-scroll";
import { HiArrowRight, HiDownload, HiChevronDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
import Button from "./ui/Button";
import { SITE } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const photoFrameRef = useRef(null);
  const photoTiltRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (!reducedMotion) {
        gsap.to("[data-hero-blob-a]", { x: 40, y: -30, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("[data-hero-blob-b]", {
          x: -30,
          y: 40,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
        if (badgeRef.current) {
          gsap.to(badgeRef.current, { rotation: 360, duration: 18, repeat: -1, ease: "none" });
        }
      }

      // Entrance plays immediately on load, synced to the intro loader's own wipe-out — the
      // Hero must be fully visible the instant a first-time visitor lands, never gated behind
      // a scroll action. Each headline line flips down from a folded-up 3D state; supporting
      // content and the photo build in right after.
      gsap.set("[data-hero-line3d]", { transformPerspective: 900, transformOrigin: "50% 100%" });

      const tl = gsap.timeline({ delay: reducedMotion ? 0 : 1.55, defaults: { ease: "power3.out" } });

      if (reducedMotion) {
        gsap.set(["[data-hero-line3d]", "[data-hero-buildin]", "[data-hero-photo]"], {
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
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.5"
          )
          .fromTo(
            photoFrameRef.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" },
            "<"
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
          rotateXTo(8 - py * 16);
          rotateYTo(px * 16 - 8);
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
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {!reducedMotion && (
          <>
            <div
              data-hero-blob-a
              className="absolute top-1/4 left-[8%] w-[24rem] h-[24rem] bg-primary/10 rounded-full blur-[120px] will-change-transform"
            />
            <div
              data-hero-blob-b
              className="absolute bottom-0 right-[6%] w-[22rem] h-[22rem] bg-primary/5 rounded-full blur-[120px] will-change-transform"
            />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(215,255,63,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(215,255,63,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,black,transparent)]" />
      </div>

      <div data-hero-parallax className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-8">
            <div data-hero-buildin className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {SITE.availability}
              </span>
            </div>

            <h1 className="text-foreground mb-8 font-display font-bold tracking-tight text-[clamp(2.75rem,7.6vw,7.25rem)] leading-[0.98]">
              <span data-hero-line3d className="block will-change-transform">
                I build digital
              </span>
              <span data-hero-line3d className="block will-change-transform">
                products that <span className="text-primary">ship</span>
              </span>
              <span data-hero-line3d className="block will-change-transform">
                and scale.
              </span>
            </h1>

            <p data-hero-buildin className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed">
              {SITE.tagline}
            </p>
            <p data-hero-buildin className="font-mono text-sm text-muted-foreground/80 mb-10">
              {SITE.proofLine}
            </p>

            <div data-hero-buildin className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
              <Link to="work" smooth duration={500} offset={-80}>
                <Button variant="primary" magnetic className="group text-base px-8">
                  View My Work
                  <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={SITE.cvPath} download={SITE.cvFilename} className="inline-flex items-center">
                <Button variant="outline" magnetic className="group text-base px-8">
                  <HiDownload className="inline-block mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </Button>
              </a>
            </div>

            <div data-hero-buildin className="flex items-center gap-5 pt-8 border-t border-border">
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-12 min-w-12 flex items-center justify-center"
                aria-label="GitHub profile"
              >
                <FaGithub />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-12 min-w-12 flex items-center justify-center"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin />
              </a>
              <span className="text-border" aria-hidden="true">
                /
              </span>
              <span className="font-mono text-xs text-muted-foreground">{SITE.location}</span>
            </div>
          </div>

          <div data-hero-photo className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              ref={photoTiltRef}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-full lg:max-w-[19rem] lg:aspect-square"
            >
              <div
                className="absolute inset-0 rounded-[2rem] border border-primary/20 -rotate-3"
                aria-hidden="true"
              />
              <div ref={photoFrameRef} className="absolute inset-0 rounded-[2rem] overflow-hidden">
                <img
                  src={SITE.profileImage}
                  alt={`${SITE.name}, ${SITE.title}`}
                  width={304}
                  height={304}
                  className="relative w-full h-full object-cover border border-border grayscale hover:grayscale-0 transition-all duration-500"
                  fetchPriority="high"
                />
              </div>

              {!reducedMotion && (
                <div
                  ref={badgeRef}
                  aria-hidden="true"
                  className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-background border border-primary/40"
                >
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                    <path
                      id="heroCirclePath"
                      d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                      fill="none"
                    />
                    <text className="uppercase font-mono" fontSize="12" letterSpacing="1.5" fill="var(--color-primary)">
                      <textPath href="#heroCirclePath">Full Stack Dev • Open to Work • </textPath>
                    </text>
                  </svg>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block" aria-hidden="true">
        <Link to="about" smooth duration={500} offset={-80}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary transition-colors">
            <span className="text-xs font-mono">Scroll</span>
            <HiChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
