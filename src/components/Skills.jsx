import { motion } from "motion/react";
import Section from "./ui/Section";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
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

const SkillCard = ({ skill, index }) => {
  const reducedMotion = useReducedMotion();
  const Icon = SKILL_ICONS[skill.name] || SiCss3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={reducedMotion ? undefined : { y: -8, scale: 1.05 }}
      className="group flex flex-col items-center justify-center gap-3 p-6 min-h-[120px] bg-surface border border-border rounded-lg hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
    >
      <Icon
        className="text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ color: skill.color }}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-foreground text-center">{skill.name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="skills" className="relative overflow-hidden" ariaLabelledby="skills-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="text-center mb-12">
          <Badge variant="solid" className="mb-4">
            <HiLightningBolt className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Expertise
          </Badge>
          <RevealText
            id="skills-heading"
            text="Skills & Technologies"
            className="mb-4 text-foreground"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I use to build modern, scalable applications
          </p>
        </div>

        <div className="space-y-12">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={catIndex * 6 + index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulse-dot" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              On the radar right now
            </span>
          </div>

          <div className="relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            {reducedMotion ? (
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                {LEARNING_SKILLS.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-lg font-semibold text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex w-max animate-marquee gap-10">
                {[...LEARNING_SKILLS, ...LEARNING_SKILLS, ...LEARNING_SKILLS, ...LEARNING_SKILLS].map(
                  (tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="flex items-center gap-10 font-mono text-lg font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      {tech}
                      <span className="text-primary/40" aria-hidden="true">
                        ◆
                      </span>
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Skills;
