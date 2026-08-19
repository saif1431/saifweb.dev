import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const ScrollProgress = () => {
  const reducedMotion = useReducedMotion();
  const barRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion || !barRef.current) return;
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[170] h-[3px] w-full origin-left scale-x-0 bg-primary"
    />
  );
};

export default ScrollProgress;
