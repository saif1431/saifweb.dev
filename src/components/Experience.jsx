import { motion } from "motion/react";
import Section from "./ui/Section";
import Badge from "./ui/Badge";
import RevealText from "./ui/RevealText";
import { EXPERIENCES } from "../content/experience";

const Experience = () => {
  return (
    <Section id="experience" ariaLabelledby="experience-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <Badge variant="solid" className="mb-4">
            Career
          </Badge>
          <RevealText
            id="experience-heading"
            text="Work Experience"
            className="mb-4 text-foreground"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey building web applications for startups and clients
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {EXPERIENCES.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
            >
              <div
                className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"
                aria-hidden="true"
              />

              <div className="pb-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <time className="text-sm font-mono text-primary whitespace-nowrap">{exp.period}</time>
                </div>

                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground font-medium mb-3 inline-block hover:text-primary transition-colors"
                  >
                    {exp.company} ↗
                  </a>
                ) : (
                  <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>
                )}

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item) => (
                    <li key={item.slice(0, 50)} className="flex items-start text-muted-foreground text-sm">
                      <span className="text-primary mr-2 mt-0.5 shrink-0" aria-hidden="true">
                        ▹
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="muted">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;
