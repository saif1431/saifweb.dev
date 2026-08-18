import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "./ui/Section";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
import Marquee from "./ui/Marquee";
import { HiLightningBolt } from "react-icons/hi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiGit,
  SiDocker,
  SiFigma,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGraphql,
  SiVite,
  SiPostman,
  SiGreensock,
} from "react-icons/si";
import { SKILL_CATEGORIES, LEARNING_SKILLS } from "../content/skills";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SKILL_ICONS = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "HTML/CSS": SiHtml5,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  "REST APIs": SiNodedotjs,
  GraphQL: SiGraphql,
  Git: SiGit,
  Docker: SiDocker,
  Figma: SiFigma,
  GSAP: SiGreensock,
  Vite: SiVite,
  Postman: SiPostman,
};

const ROW_TEXT_SIZE = ["text-3xl sm:text-5xl", "text-2xl sm:text-4xl", "text-xl sm:text-3xl"];

const buildRowItems = (skills) =>
  skills.map((skill) => {
    const Icon = SKILL_ICONS[skill.name] || SiCss3;
    return (
      <span key={skill.name} className="inline-flex items-center gap-4 mr-10 sm:mr-14">
        <Icon style={{ color: skill.color }} aria-hidden="true" />
        <span className="text-foreground/85">{skill.name}</span>
      </span>
    );
  });

const learningItems = LEARNING_SKILLS.map((tech) => (
  <span key={tech} className="inline-flex items-center gap-10">
    {tech}
    <span className="text-primary/40" aria-hidden="true">
      ◆
    </span>
  </span>
));

const Skills = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        "[data-skill-row]",
        reducedMotion ? {} : { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="skills" className="relative overflow-hidden" ariaLabelledby="skills-heading">
      <div ref={sectionRef}>
        <div className="text-center mb-14">
          <Badge variant="solid" className="mb-4">
            <HiLightningBolt className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Capabilities
          </Badge>
          <RevealText id="skills-heading" text="What I Bring to the Table" className="mb-4 text-foreground" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I use to build modern, scalable applications
          </p>
        </div>

        <div className="border-y border-border divide-y divide-border">
          {SKILL_CATEGORIES.map((category, i) => (
            <div key={category.title} data-skill-row className="relative py-6 sm:py-8">
              <span className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 lg:left-12 z-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border hidden sm:block">
                {category.title}
              </span>
              <div className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
                <Marquee
                  items={buildRowItems(category.skills)}
                  reverse={i % 2 === 1}
                  speed={30 + i * 6}
                  itemClassName={`font-display font-medium ${ROW_TEXT_SIZE[i] || ROW_TEXT_SIZE[2]}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              On the radar right now
            </span>
          </div>

          <span className="sr-only">{LEARNING_SKILLS.join(", ")}</span>
          <div className="relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <Marquee
              items={learningItems}
              speed={40}
              itemClassName="flex items-center gap-10 font-mono text-lg font-semibold text-muted-foreground hover:text-primary transition-colors px-5"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
