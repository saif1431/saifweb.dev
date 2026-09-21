import { SITE, HERO } from "../../content/site";

const IMAGE_MASK = "radial-gradient(ellipse 100% 100% at 50% 42%, #000 72%, transparent 100%)";

// Directional fade rather than an all-round vignette: the source photo's plain backdrop sits
// mostly on its left side (facing the text column), so darkening fades in from the left and top
// specifically — hiding that backdrop while leaving the subject on the right untouched. Built
// from the live --bg-rgb custom property so it fades into whichever theme (light or dark) is
// currently active instead of being hardcoded to one.
const IMAGE_SCRIM = [
  "linear-gradient(to right, rgb(var(--bg-rgb) / 0.98) 0%, rgb(var(--bg-rgb) / 0.9) 20%, rgb(var(--bg-rgb) / 0.62) 40%, rgb(var(--bg-rgb) / 0.22) 58%, transparent 74%)",
  "linear-gradient(to bottom, rgb(var(--bg-rgb) / 0.55) 0%, transparent 16%)",
  "linear-gradient(to top, rgb(var(--bg-rgb) / 0.6) 0%, transparent 20%)",
].join(", ");

const HeroImage = ({ tiltRef, frameRef, badgeRef, reducedMotion }) => (
  <div ref={tiltRef} className="relative h-full w-full">
    {/* Ambient orange glow sitting behind the portrait, not clipped by its mask */}
    <div className="absolute -inset-6 -z-10" aria-hidden="true">
      <div
        data-hero-blob-a
        className="absolute right-[6%] top-[10%] h-[65%] w-[70%] rounded-full bg-primary/25 blur-[100px] will-change-transform"
      />
      <div
        data-hero-blob-b
        className="absolute bottom-[4%] left-[2%] h-[45%] w-[55%] rounded-full bg-primary-soft/15 blur-[90px] will-change-transform"
      />
    </div>

    {/* Masked portrait — no rectangular card, the mask feathers it into the background */}
    <div
      ref={frameRef}
      className="relative h-full w-full"
      style={{ maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK }}
    >
      <img
        src={SITE.profileImage}
        alt={`${SITE.name}, ${SITE.title}`}
        width={1956}
        height={804}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full scale-[1.35] object-cover object-[50%_30%] grayscale-[20%] contrast-[1.3] brightness-[0.82] saturate-[0.8]"
      />
      <div
        className="absolute inset-0 mix-blend-color bg-gradient-to-t from-primary/50 via-primary/8 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0" aria-hidden="true" style={{ backgroundImage: IMAGE_SCRIM }} />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(var(--bg-rgb) / 0.1) 0%, transparent 40%, rgb(var(--bg-rgb) / 0.55) 100%)",
        }}
      />
    </div>

    {/* Floating identity badge — small rotating chip echoing the reference's top-corner card */}
    {!reducedMotion && (
      <div
        ref={badgeRef}
        data-hero-badge
        aria-hidden="true"
        className="absolute -top-4 right-2 flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm sm:-top-6 sm:right-4 sm:h-24 sm:w-24"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" data-hero-badge-spin>
          <path
            id="heroCirclePath"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            fill="none"
          />
          <text className="uppercase font-mono" fontSize="11" letterSpacing="1.5" fill="var(--color-primary)">
            <textPath href="#heroCirclePath">{HERO.badgeText} • </textPath>
          </text>
        </svg>
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>
    )}
  </div>
);

export default HeroImage;
