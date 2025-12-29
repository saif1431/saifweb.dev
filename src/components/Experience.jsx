import { motion } from "motion/react";
import Section from "./ui/Section";

const Experience = () => {
      const experiences = [
            {
                  role: "Full Stack Developer",
                  company: "Nizron Tech & Solution Software House",
                  period: "2025 - Present",
                  description: [
                        "Developing full-stack web applications using modern technologies",
                        "Building scalable and maintainable software solutions for clients",
                        "Collaborating with cross-functional teams to deliver high-quality products",
                  ],
            },
            {
                  role: "Frontend Developer",
                  company: "LeadsNite Startup",
                  period: "2024 - 2025",
                  description: [
                        "Built responsive and interactive user interfaces using React",
                        "Implemented modern UI/UX designs with attention to detail",
                        "Optimized application performance and user experience",
                  ],
            },
            {
                  role: "Frontend Developer",
                  company: "Freelance Projects",
                  period: "2023 - 2024",
                  description: [
                        "Developed custom websites and web applications for various clients",
                        "Worked with React, JavaScript, and modern CSS frameworks",
                        "Delivered projects on time while maintaining code quality",
                  ],
            },
      ];

      return (
            <Section id="experience">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                  >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-center">
                              Work Experience
                        </h2>
                        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                              My professional journey
                        </p>

                        <div className="max-w-3xl mx-auto space-y-8">
                              {experiences.map((exp, index) => (
                                    <motion.div
                                          key={exp.company}
                                          initial={{ opacity: 0, x: -20 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 0.5, delay: index * 0.1 }}
                                          className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                                    >
                                          {/* Timeline dot */}
                                          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background" />

                                          <div className="pb-8">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                                      <span className="text-sm font-mono text-primary">{exp.period}</span>
                                                </div>

                                                <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>

                                                <ul className="space-y-2">
                                                      {exp.description.map((item, i) => (
                                                            <li key={i} className="flex items-start text-muted-foreground text-sm">
                                                                  <span className="text-primary mr-2 mt-1">▹</span>
                                                                  <span>{item}</span>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    </motion.div>
                              ))}
                        </div>
                  </motion.div>
            </Section>
      );
};

export default Experience;
