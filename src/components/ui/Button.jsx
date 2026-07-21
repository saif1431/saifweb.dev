import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Button = ({ children, variant = "primary", className = "", magnetic = false, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center min-h-12 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 font-sans tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]",
    outline:
      "border border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.98]",
    ghost:
      "text-muted-foreground hover:text-foreground hover:bg-accent/50 min-h-10",
  };

  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMouseMove = (e) => {
    if (!magnetic || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magnetic && !reducedMotion ? { x: springX, y: springY } : undefined}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
