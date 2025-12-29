import { motion } from "motion/react";
import Section from "./ui/Section";
import { HiCode, HiLightningBolt, HiCube } from "react-icons/hi";

const About = () => {
      const highlights = [
            {
                  icon: HiCode,
                  title: "Clean Code",
                  description: "Writing maintainable, scalable code following best practices"
            },
            {
                  icon: HiLightningBolt,
                  title: "Fast Performance",
                  description: "Optimizing applications for speed and efficiency"
            },
            {
                  icon: HiCube,
                  title: "Modern Stack",
                  description: "Using cutting-edge technologies and frameworks"
            }
      ];

      return (
            <Section id="about" className="bg-muted/20">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left: Image */}
                        <motion.div
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                              className="relative order-2 lg:order-1"
                        >
                              <div className="relative">
                                    {/* Decorative Background */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-indigo-400/20 rounded-2xl blur-2xl opacity-50" />

                                    {/* Image */}
                                    <div className="relative w-full max-w-md mx-auto lg:mx-0">
                                          <div className="aspect-square rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                                                <img
                                                      src="/portfolioImg2.jpg"
                                                      alt="About Saif Ahmed"
                                                      className="w-full h-full object-cover"
                                                />
                                          </div>

                                          {/* Accent Border */}
                                          <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
                                    </div>
                              </div>
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                              initial={{ opacity: 0, x: 30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                              className="order-1 lg:order-2"
                        >
                              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                                    About Me
                              </h2>

                              <div className="space-y-4 text-muted-foreground text-base leading-relaxed mb-8">
                                    <p>
                                          I'm a passionate full-stack developer with a strong focus on creating
                                          exceptional digital experiences. With expertise in modern web technologies,
                                          I transform ideas into elegant, functional applications.
                                    </p>

                                    <p>
                                          My journey in web development began with a curiosity for how things work
                                          on the internet. Since then, I've worked on diverse projects ranging from
                                          e-commerce platforms to enterprise applications, always striving to deliver
                                          high-quality, user-centered solutions.
                                    </p>

                                    <p>
                                          I believe in writing clean, maintainable code and staying updated with
                                          the latest industry trends. When I'm not coding, you'll find me exploring
                                          new technologies, contributing to open-source projects, or sharing knowledge
                                          with the developer community.
                                    </p>
                              </div>

                              {/* Highlights */}
                              <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    {highlights.map((item, index) => (
                                          <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="bg-muted/30 border border-white/5 rounded-lg p-4 hover:border-primary/30 transition-colors"
                                          >
                                                <item.icon className="text-primary text-3xl mb-2" />
                                                <h3 className="text-foreground font-semibold text-sm mb-1">{item.title}</h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                                          </motion.div>
                                    ))}
                              </div>

                              {/* Tech Stack */}
                              <div>
                                    <h3 className="text-foreground font-semibold mb-3">Technologies I work with:</h3>
                                    <div className="flex flex-wrap gap-2">
                                          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Express'].map((tech) => (
                                                <span
                                                      key={tech}
                                                      className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors"
                                                >
                                                      {tech}
                                                </span>
                                          ))}
                                    </div>
                              </div>
                        </motion.div>
                  </div>
            </Section>
      );
};

export default About;
