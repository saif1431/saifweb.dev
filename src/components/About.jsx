import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "./ui/Section";
import RevealText from "./ui/RevealText";
import StatCounter from "./ui/StatCounter";
import { SITE, ABOUT } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const About = () => {
  const [leadParagraph, ...restParagraphs] = ABOUT.paragraphs;
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        "[data-about-fade]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll("[data-stat]"),
          reducedMotion ? {} : { opacity: 0, scale: 0.7, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="about" ariaLabelledby="about-heading" className="scroll-mt-20">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-sm text-primary">01</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</span>
        </div>

        <RevealText
          id="about-heading"
          text="Building digital products with purpose"
          className="mb-16 max-w-3xl text-foreground"
        />

        <div
          ref={statsRef}
          className="grid grid-cols-3 divide-x divide-border border-y border-border mb-16 md:mb-20"
        >
          {SITE.stats.map((stat) => (
            <div key={stat.label} data-stat className="py-8 sm:py-12 px-3 sm:px-6 text-center">
              <StatCounter
                value={stat.value}
                className="block font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-primary leading-none mb-3"
              />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12">
          <div data-about-fade className="md:col-span-7">
            <p className="text-xl sm:text-2xl font-light leading-snug text-foreground mb-6">{leadParagraph}</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {restParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Works comfortably with
              </p>
              <p className="flex flex-wrap gap-x-2 gap-y-2 font-mono text-sm text-muted-foreground">
                {ABOUT.techStack.map((tech, i) => (
                  <span key={tech}>
                    <span className="hover:text-primary transition-colors cursor-default">{tech}</span>
                    {i < ABOUT.techStack.length - 1 && (
                      <span className="text-border ml-2" aria-hidden="true">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div data-about-fade className="md:col-span-5">
            <ol className="space-y-0">
              {ABOUT.highlights.map((item, index) => (
                <li key={item.title} className="flex gap-4 py-4 border-t border-border last:border-b">
                  <span className="font-mono text-xs text-primary pt-0.5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
