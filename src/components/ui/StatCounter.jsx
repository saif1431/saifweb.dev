import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const StatCounter = ({ value, className = "" }) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useGSAP(
    () => {
      if (reducedMotion || !ref.current || !target) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${counter.val}${suffix}`;
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {reducedMotion || !target ? value : `0${suffix}`}
    </span>
  );
};

export default StatCounter;
