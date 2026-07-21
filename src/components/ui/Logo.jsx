import { motion } from "motion/react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-primary/50">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <motion.path
            d="M22 10.5c0-2.2-2.2-4-6-4s-6 1.6-6 3.6c0 2.3 2.3 3 6 3.9 4 1 6.4 1.9 6.4 4.4 0 2.2-2.5 3.9-6.4 3.9-3.6 0-6-1.4-6.4-3.9"
            stroke="url(#logoGradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="logoGradient" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -inset-px rounded-xl opacity-0 shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-opacity duration-300 group-hover:opacity-100" />
      </span>

      <span className="hidden font-mono text-lg leading-none tracking-tight sm:flex sm:items-center">
        <span
          className="max-w-0 overflow-hidden text-primary opacity-0 transition-all duration-300 ease-out group-hover:max-w-[1ch] group-hover:opacity-100"
          aria-hidden="true"
        >
          &lt;
        </span>
        <span className="font-bold text-foreground">saif</span>
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
