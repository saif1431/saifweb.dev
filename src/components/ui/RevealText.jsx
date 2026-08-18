import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const RevealText = ({ as, text, className = "", id, once = true }) => {
  const Tag = as || "h2";
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;
      const wordEls = containerRef.current.querySelectorAll("[data-reveal-word]");

      gsap.fromTo(
        wordEls,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text, reducedMotion] }
  );

  if (reducedMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <span data-reveal-word className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
