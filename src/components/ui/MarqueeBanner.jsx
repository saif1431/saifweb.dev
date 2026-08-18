import Marquee from "./Marquee";

const MarqueeBanner = ({ text, filled = false, className = "" }) => {
  const items = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="inline-flex items-center gap-10">
      <span className={filled ? "text-primary" : "text-stroke"}>{text}</span>
      <span className="text-primary" aria-hidden="true">
        ✦
      </span>
    </span>
  ));

  return (
    <div className={`w-full overflow-hidden py-6 sm:py-10 border-y border-border bg-background ${className}`}>
      <Marquee
        items={items}
        speed={90}
        scrollReactive
        itemClassName="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold uppercase px-6 shrink-0"
      />
    </div>
  );
};

export default MarqueeBanner;
