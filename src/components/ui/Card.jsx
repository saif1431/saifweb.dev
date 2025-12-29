import { motion } from "motion/react";

const Card = ({ children, className = "", delay = 0 }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay }}
                  className={`bg-muted/30 border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${className}`}
            >
                  {children}
            </motion.div>
      );
};

export default Card;
