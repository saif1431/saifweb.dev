import { motion } from "motion/react";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
      const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 font-sans tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

      const variants = {
            primary: "bg-primary text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95",
            outline: "border border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 text-sm",
            ghost: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
      };

      return (
            <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -1 }}
                  className={`${baseStyles} ${variants[variant]} ${className}`}
                  {...props}
            >
                  {children}
            </motion.button>
      );
};

export default Button;
