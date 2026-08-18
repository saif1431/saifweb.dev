import Marquee from "./ui/Marquee";

const KEYWORDS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "AI Agents",
  "LangChain",
  "PostgreSQL",
  "Tailwind CSS",
];

const items = KEYWORDS.map((word) => (
  <span key={word} className="inline-flex items-center">
    {word}
    <span className="text-primary/50 ml-8" aria-hidden="true">
      ✦
    </span>
  </span>
));

const TickerStrip = () => {
  return (
    <div className="w-full border-y border-border py-5 bg-surface/50">
      <Marquee
        items={items}
        speed={45}
        className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        itemClassName="font-display text-2xl sm:text-3xl font-medium text-muted-foreground/70 mr-8 shrink-0"
      />
    </div>
  );
};

export default TickerStrip;
