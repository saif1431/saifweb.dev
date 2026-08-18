import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "./ui/Section";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
import { HiBriefcase, HiDesktopComputer, HiServer, HiChip } from "react-icons/hi";
import { EXPERIENCES } from "../content/experience";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ROLE_ICONS = {
  frontend: HiDesktopComputer,
  backend: HiServer,
  ai: HiChip,
};

const Experience = () => {
  const reducedMotion = useReducedMotion();
  const listRef = useRef(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const rows = listRef.current.querySelectorAll("[data-exp-row]");

      gsap.fromTo(
        rows,
        reducedMotion ? {} : { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: listRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="experience" className="relative overflow-hidden" ariaLabelledby="experience-heading">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <Badge variant="solid" className="mb-4">
            <HiBriefcase className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Career
          </Badge>
          <RevealText id="experience-heading" text="The Journey So Far" className="text-foreground max-w-xl" />
        </div>
        <p className="text-muted-foreground max-w-sm text-base sm:text-lg">
          Freelance project work across frontend, backend, and AI engineering.
        </p>
      </div>

      <div ref={listRef} className="max-w-6xl mx-auto border-t border-border">
        {EXPERIENCES.map((exp, index) => {
          const Icon = ROLE_ICONS[exp.icon] || HiBriefcase;
          return (
            <div key={`${exp.role}-${exp.company}`} data-exp-row className="relative border-b border-border">
              <div className="group relative overflow-hidden py-8 md:py-12">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                />

                <div className="relative grid md:grid-cols-12 gap-6 md:gap-8 items-center px-1 sm:px-2">
                  <div className="md:col-span-1 flex md:block items-center gap-4">
                    <span className="font-display text-6xl sm:text-7xl font-semibold text-stroke select-none leading-none group-hover:[--stroke-color:var(--color-primary-foreground)] transition-[--stroke-color] duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-1 hidden md:flex justify-center">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full border border-border group-hover:border-primary-foreground/40 transition-colors">
                      <Icon className="text-2xl text-primary group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary group-hover:text-primary-foreground/80 font-medium mb-4 transition-colors">
                      {exp.company}
                    </p>
                    <ul className="space-y-2">
                      {exp.description.map((item) => (
                        <li
                          key={item.slice(0, 50)}
                          className="flex items-start text-muted-foreground group-hover:text-primary-foreground/70 text-sm leading-relaxed transition-colors"
                        >
                          <span className="mr-2 mt-0.5 shrink-0" aria-hidden="true">
                            ▹
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-4 md:text-right">
                    <time className="block font-mono text-xs text-muted-foreground group-hover:text-primary-foreground/60 mb-4 transition-colors">
                      {exp.period}
                    </time>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 text-xs font-mono rounded-full border border-border group-hover:border-primary-foreground/30 text-muted-foreground group-hover:text-primary-foreground/80 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Experience;
