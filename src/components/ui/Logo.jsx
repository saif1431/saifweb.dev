import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

const Logo = ({ className = "" }) => {
  const pathRef = useRef(null);

  useGSAP(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", delay: 0.3 });
  }, []);

  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-primary/50">
        <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            ref={pathRef}
            d="M22 10.5c0-2.2-2.2-4-6-4s-6 1.6-6 3.6c0 2.3 2.3 3 6 3.9 4 1 6.4 1.9 6.4 4.4 0 2.2-2.5 3.9-6.4 3.9-3.6 0-6-1.4-6.4-3.9"
            stroke="var(--color-primary)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -inset-px rounded-xl opacity-0 shadow-[0_0_20px_rgba(215,255,63,0.35)] transition-opacity duration-300 group-hover:opacity-100" />
      </span>

      <span className="hidden font-mono text-lg leading-none tracking-tight sm:flex sm:items-center">
        <span
          className="max-w-0 overflow-hidden text-primary opacity-0 transition-all duration-300 ease-out group-hover:max-w-[1ch] group-hover:opacity-100"
          aria-hidden="true"
        >
          &lt;
        </span>
        <span className="font-semibold text-foreground">saif</span>
        <span className="text-primary">.dev</span>
        <span
          className="max-w-0 overflow-hidden text-primary opacity-0 transition-all duration-300 ease-out group-hover:max-w-[2ch] group-hover:opacity-100"
          aria-hidden="true"
        >
          /&gt;
        </span>
      </span>
    </div>
  );
};

export default Logo;
