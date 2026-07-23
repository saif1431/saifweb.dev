import { motion } from "motion/react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
import TiltCard from "./ui/TiltCard";
import { HiDesktopComputer, HiServer, HiChip, HiBriefcase } from "react-icons/hi";
import { EXPERIENCES } from "../content/experience";

const ROLE_ICONS = {
  frontend: HiDesktopComputer,
  backend: HiServer,
  ai: HiChip,
};

const Experience = () => {
  return (
    <Section id="experience" className="relative overflow-hidden" ariaLabelledby="experience-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-success/5 rounded-full blur-3xl" />
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
            <HiBriefcase className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Career
          </Badge>
          <RevealText
            id="experience-heading"
            text="Work Experience"
            className="mb-4 text-foreground"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Freelance project work across frontend, backend, and AI engineering
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {EXPERIENCES.map((exp, index) => {
            const Icon = ROLE_ICONS[exp.icon] || HiBriefcase;
            return (
              <TiltCard key={`${exp.role}-${exp.company}`} delay={index * 0.1}>
                <Card className="group h-full p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-2xl text-primary" aria-hidden="true" />
                    </div>
                    <time className="text-xs font-mono text-muted-foreground whitespace-nowrap pt-1">
                      {exp.period}
                    </time>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>

                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary font-medium mb-4 inline-block hover:underline w-fit"
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground font-medium mb-4">{exp.company}</p>
                  )}

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {exp.description.map((item) => (
                      <li key={item.slice(0, 50)} className="flex items-start text-muted-foreground text-sm leading-relaxed">
                        <span className="text-primary mr-2 mt-0.5 shrink-0" aria-hidden="true">
                          ▹
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TiltCard>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;
