import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Marquee = ({
  items,
  speed = 60,
  reverse = false,
  scrollReactive = false,
  className = "",
  itemClassName = "",
}) => {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current) return;
      const track = trackRef.current;
      const distance = track.scrollWidth / 2;
      if (!distance) return;

      gsap.set(track, { x: reverse ? -distance : 0 });
      const tween = gsap.to(track, {
        x: reverse ? 0 : -distance,
        duration: distance / speed,
        ease: "none",
        repeat: -1,
      });

      if (!scrollReactive) return;

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(0.6, 5, 1 + Math.abs(velocity) / 2500);
          tween.timeScale(velocity < 0 ? -boost : boost);
        },
        onLeaveBack: () => tween.timeScale(1),
        onLeave: () => tween.timeScale(1),
      });

      return () => st.kill();
    },
    { scope: trackRef, dependencies: [items, speed, scrollReactive, reducedMotion], revertOnUpdate: true }
  );

  if (reducedMotion) {
    return (
      <div className={`flex flex-wrap ${className}`}>
        {items.map((item, i) => (
          <span key={i} className={itemClassName}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={itemClassName}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
