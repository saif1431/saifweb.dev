import { useEffect, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, [role='button'], [role='tab']";

const CustomCursor = () => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsHover && !reducedMotion);
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (!enabled) return;

      const dot = document.getElementById("cc-dot");
      const ring = document.getElementById("cc-ring");
      const label = document.getElementById("cc-label");
      if (!dot || !ring || !label) return;

      gsap.set([dot, ring, label], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
      const labelX = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" });
      const labelY = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" });

      let currentLabel = "";

      const handleMove = (e) => {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
        labelX(e.clientX);
        labelY(e.clientY);
        gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
      };

      const handleOver = (e) => {
        const cursorTarget = e.target.closest("[data-cursor]");
        const interactive = e.target.closest(INTERACTIVE_SELECTOR);

        if (cursorTarget) {
          const text = cursorTarget.getAttribute("data-cursor") || "";
          if (text !== currentLabel) {
            currentLabel = text;
            label.textContent = text;
          }
          gsap.to(ring, { opacity: 0, duration: 0.2 });
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
        } else {
          currentLabel = "";
          gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 });
          gsap.to(ring, {
            width: interactive ? 52 : 32,
            height: interactive ? 52 : 32,
            opacity: interactive ? 0.85 : 0.4,
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(dot, { opacity: 1, width: interactive ? 12 : 8, height: interactive ? 12 : 8, duration: 0.2 });
        }
      };

      const handleLeave = () => {
        gsap.to([dot, ring, label], { opacity: 0, duration: 0.2 });
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseover", handleOver);
      document.addEventListener("mouseleave", handleLeave);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseover", handleOver);
        document.removeEventListener("mouseleave", handleLeave);
      };
    },
    { dependencies: [enabled] }
  );

  if (!enabled) return null;

  return (
    <>
      <div
        id="cc-dot"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] w-2 h-2 rounded-full bg-primary opacity-0 mix-blend-difference"
      />
      <div
        id="cc-ring"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] w-8 h-8 rounded-full border border-primary/50 opacity-0"
      />
      <div
        id="cc-label"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[201] flex items-center justify-center text-center w-24 h-24 rounded-full bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-wide leading-tight opacity-0 scale-[0.6] p-2"
      />
    </>
  );
};

export default CustomCursor;
