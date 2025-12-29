import { motion } from "motion/react";
import Section from "./ui/Section";
import Card from "./ui/Card";
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
      SiPython
} from "react-icons/si";

const Skills = () => {
      const skills = [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "Express", icon: SiExpress, color: "#ffffff" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
            { name: "Python", icon: SiPython, color: "#3776AB" },
      ];

      return (
            <Section id="skills">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                  >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-center">
                              Skills & Technologies
                        </h2>
                        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                              Technologies I've been working with to build modern, scalable applications
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                              {skills.map((skill, index) => (
                                    <Card key={skill.name} delay={index * 0.05}>
                                          <div className="flex flex-col items-center justify-center p-4 group">
                                                <skill.icon
                                                      className="text-5xl mb-3 transition-all duration-300 group-hover:scale-110"
                                                      style={{ color: skill.color }}
                                                />
                                                <span className="text-foreground font-medium text-sm">{skill.name}</span>
                                          </div>
                                    </Card>
                              ))}
                        </div>
                  </motion.div>
            </Section>
      );
};

export default Skills;
