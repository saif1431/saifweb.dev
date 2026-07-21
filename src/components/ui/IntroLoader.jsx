import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const IntroLoader = () => {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 1400);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex items-center gap-1 font-mono text-3xl font-bold tracking-tighter text-foreground"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="text-primary"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              &lt;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Saif
            </motion.span>
            <motion.span
              className="text-primary"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              /&gt;
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
