import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const RevealText = ({ as, text, className = "", id, once = true }) => {
  const Tag = as || "h2";
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-80px" }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default RevealText;
