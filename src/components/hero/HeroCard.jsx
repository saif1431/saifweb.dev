const HeroCard = ({ title, items, className = "", style }) => (
  <div
    data-hero-card
    style={style}
    className={`animate-float rounded-2xl border border-border bg-surface/70 px-4 py-3.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${className}`}
  >
    <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
      {title}
    </span>
    <span className="block text-xs sm:text-sm font-medium text-foreground/90 whitespace-nowrap">
      {items.join(" · ")}
    </span>
  </div>
);

export default HeroCard;
