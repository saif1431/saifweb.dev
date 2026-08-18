import { useRef } from "react";
import { Link } from "react-scroll";
import { HiArrowRight, HiDownload, HiChevronDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/gsap";
import Button from "./ui/Button";
import { SITE } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HEADLINE = [
  { text: "I build digital" },
  { text: "products that ", highlight: "ship" },
  { text: "and scale." },
];

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const badgeRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const lines = headlineRef.current?.querySelectorAll("[data-hero-line]");
      const tl = gsap.timeline({ delay: reducedMotion ? 0 : 1.65, defaults: { ease: "power4.out" } });

      if (lines?.length && !reducedMotion) {
        tl.fromTo(
          lines,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          0
        );
      } else if (lines?.length) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
      }

      tl.fromTo(
        "[data-hero-fade]",
        reducedMotion ? {} : { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        reducedMotion ? 0 : "-=0.45"
      );

      tl.fromTo(
        "[data-hero-photo]",
        reducedMotion ? {} : { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
        reducedMotion ? 0 : "-=0.6"
      );

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

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div data-hero-fade className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {SITE.availability}
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-foreground mb-8 font-display font-semibold tracking-tight text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[1.05]"
            >
              {HEADLINE.map((line, i) => (
                <span key={i} data-hero-line className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
                  <span className="block">
                    {line.text}
                    {line.highlight && <span className="text-primary">{line.highlight}</span>}
                  </span>
                </span>
              ))}
            </h1>

            <p data-hero-fade className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed">
              {SITE.tagline}
            </p>
            <p data-hero-fade className="font-mono text-sm text-muted-foreground/80 mb-10">
              {SITE.proofLine}
            </p>

            <div data-hero-fade className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
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

            <div data-hero-fade className="flex items-center gap-5 pt-8 border-t border-border">
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

          <div data-hero-photo className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:max-w-[22rem] lg:aspect-square">
              <div
                className="absolute inset-0 rounded-[2rem] border border-primary/20 -rotate-3"
                aria-hidden="true"
              />
              <img
                src={SITE.profileImage}
                alt={`${SITE.name}, ${SITE.title}`}
                width={352}
                height={352}
                className="relative w-full h-full object-cover rounded-[2rem] border border-border grayscale hover:grayscale-0 transition-all duration-500"
                fetchPriority="high"
              />

              {!reducedMotion && (
                <div
                  ref={badgeRef}
                  aria-hidden="true"
                  className="absolute -bottom-7 -left-7 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-background border border-primary/40"
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
            <HiChevronDown className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
