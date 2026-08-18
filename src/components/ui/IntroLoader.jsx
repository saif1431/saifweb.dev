import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const IntroLoader = () => {
  const reducedMotion = useReducedMotion();
  const [removed, setRemoved] = useState(reducedMotion);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          document.body.style.overflow = "";
          setRemoved(true);
        },
      });

      // A thread "shoots" from the corner along a curved path, drawing itself in behind the
      // travelling dot, then the wordmark snaps into place like it was just reeled in.
      tl.set(dotRef.current, { opacity: 1 })
        .fromTo(
          pathRef.current,
          { drawSVG: "0%" },
          { drawSVG: "0% 100%", duration: 0.7, ease: "power2.in" },
          0
        )
        .to(
          dotRef.current,
          {
            motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5] },
            duration: 0.7,
            ease: "power2.in",
          },
          0
        )
        .to(dotRef.current, { scale: 2.4, opacity: 0, duration: 0.35, ease: "power2.out" }, 0.6)
        .fromTo(
          "[data-intro-char]",
          { opacity: 0, scale: 0.3, yPercent: 60 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 0.6, stagger: 0.02, ease: "elastic.out(1, 0.55)" },
          0.58
        )
        .to(containerRef.current, { yPercent: -100, duration: 0.55, ease: "power4.inOut" }, "+=0.25");

      return () => tl.kill();
    },
    { dependencies: [reducedMotion] }
  );

  if (removed) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-background overflow-hidden"
    >
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <path
          ref={pathRef}
          d="M 20 85 Q 55 35 80 50"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle ref={dotRef} r="1.6" fill="var(--color-primary)" opacity="0" />
      </svg>

      <div className="relative flex items-center gap-1 font-display text-3xl font-semibold tracking-tight text-foreground overflow-hidden">
        {"<Saif/>".split("").map((char, i) => (
          <span
            key={i}
            data-intro-char
            className={`inline-block ${char === "<" || char === "/" || char === ">" ? "text-primary" : ""}`}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IntroLoader;
