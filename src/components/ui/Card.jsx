import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Card = ({ children, className = "", delay = 0, hover = true }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover && !reducedMotion
          ? { y: -8, transition: { duration: 0.3 } }
          : undefined
      }
      className={`bg-surface border border-border rounded-lg transition-shadow duration-300 ${
        hover ? "hover:shadow-xl hover:shadow-black/20 hover:border-primary/30" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
