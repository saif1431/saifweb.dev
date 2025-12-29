import { motion } from "motion/react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import { HiExternalLink, HiCode } from "react-icons/hi";

const Projects = () => {
      const projects = [
            {
                  title: "E-Commerce Platform",
                  description: "A full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard.",
                  tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
                  image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
                  github: "#",
                  demo: "#",
            },
            {
                  title: "Task Management App",
                  description: "Collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
                  tech: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
                  github: "#",
                  demo: "#",
            },
            {
                  title: "AI Content Generator",
                  description: "AI-powered content generation platform using GPT-4 API for creating blog posts, social media content, and more.",
                  tech: ["React", "Python", "FastAPI", "OpenAI"],
                  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
                  github: "#",
                  demo: "#",
            },
            {
                  title: "Analytics Dashboard",
                  description: "Real-time analytics dashboard with interactive charts, data visualization, and customizable reports.",
                  tech: ["Vue.js", "D3.js", "Express", "Redis"],
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
                  github: "#",
                  demo: "#",
            },
      ];

      return (
            <Section id="projects" className="bg-muted/20">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                  >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-center">
                              Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                              Some things I've built recently
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                              {projects.map((project, index) => (
                                    <Card key={project.title} delay={index * 0.1}>
                                          <div className="group relative overflow-hidden rounded-lg mb-4">
                                                <img
                                                      src={project.image}
                                                      alt={project.title}
                                                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-4">
                                                      <a
                                                            href={project.github}
                                                            className="p-2 bg-primary rounded-full hover:bg-indigo-600 transition-colors"
                                                            aria-label="View code"
                                                      >
                                                            <HiCode className="text-white text-xl" />
                                                      </a>
                                                      <a
                                                            href={project.demo}
                                                            className="p-2 bg-primary rounded-full hover:bg-indigo-600 transition-colors"
                                                            aria-label="View demo"
                                                      >
                                                            <HiExternalLink className="text-white text-xl" />
                                                      </a>
                                                </div>
                                          </div>

                                          <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                                {project.description}
                                          </p>

                                          <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech) => (
                                                      <span
                                                            key={tech}
                                                            className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full"
                                                      >
                                                            {tech}
                                                      </span>
                                                ))}
                                          </div>
                                    </Card>
                              ))}
                        </div>
                  </motion.div>
            </Section>
      );
};

export default Projects;
