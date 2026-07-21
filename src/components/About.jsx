import { motion } from "motion/react";
import Section from "./ui/Section";
import RevealText from "./ui/RevealText";
import { SITE, ABOUT } from "../content/site";

const About = () => {
  const [leadParagraph, ...restParagraphs] = ABOUT.paragraphs;

  return (
    <Section id="about" ariaLabelledby="about-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-sm text-primary">01</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            About
          </span>
        </motion.div>

        <RevealText
          id="about-heading"
          text="Building digital products with purpose"
          className="mb-12 max-w-3xl text-foreground"
        />

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7"
          >
            <p className="text-xl sm:text-2xl font-light leading-snug text-foreground mb-6">
              {leadParagraph}
            </p>
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
                    <span className="hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                    {i < ABOUT.techStack.length - 1 && (
                      <span className="text-border ml-2" aria-hidden="true">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <dl className="grid grid-cols-3 md:grid-cols-1 divide-x md:divide-x-0 md:divide-y divide-border border border-border rounded-lg overflow-hidden mb-8">
              {SITE.stats.map((stat) => (
                <div key={stat.label} className="p-5 md:flex md:items-baseline md:justify-between">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground order-2 md:order-1 mt-1 md:mt-0">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-bold text-primary font-mono order-1 md:order-2">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ol className="space-y-0">
              {ABOUT.highlights.map((item, index) => (
                <li
                  key={item.title}
                  className="flex gap-4 py-4 border-t border-border last:border-b"
                >
                  <span className="font-mono text-xs text-primary pt-0.5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
