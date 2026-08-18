import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Button = ({ children, variant = "primary", className = "", magnetic = false, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center min-h-12 px-6 py-2.5 rounded-full font-medium transition-colors duration-300 font-sans tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-foreground active:scale-[0.98]",
    outline:
      "border border-border text-foreground hover:border-primary hover:text-primary active:scale-[0.98]",
    ghost: "text-muted-foreground hover:text-foreground min-h-10",
  };

  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      if (!magnetic || reducedMotion || !ref.current) return;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const handleMove = contextSafe((e) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
      });
      const handleLeave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: ref, dependencies: [magnetic, reducedMotion] }
  );

  return (
    <button ref={ref} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
