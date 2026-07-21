import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Dialog from "./ui/Dialog";
import Button from "./ui/Button";
import RevealText from "./ui/RevealText";
import TiltCard from "./ui/TiltCard";
import { HiExternalLink, HiCode, HiSparkles, HiEye } from "react-icons/hi";
import { PROJECTS, PROJECT_CATEGORIES } from "../content/projects";

const ProjectImage = ({ project }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title} project`}
        loading="lazy"
        width={800}
        height={450}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    );
  }

  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
      aria-hidden="true"
    >
      <span className="text-4xl font-bold text-foreground/30 font-mono">{initials}</span>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <Section id="projects" className="relative overflow-hidden bg-muted/20" ariaLabelledby="projects-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-success/5 rounded-full blur-3xl" />
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
            <HiSparkles className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Portfolio
          </Badge>
          <RevealText
            id="projects-heading"
            text="Featured Projects"
            className="mb-4 text-foreground"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Real projects showcasing my work across frontend, full-stack, and data visualization
          </p>

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 min-h-10 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  filter === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-surface text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <TiltCard key={project.id} delay={index * 0.1}>
                <Card className="group h-full p-0 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
                    <ProjectImage project={project} />

                    {project.featured && (
                      <div className="absolute top-4 left-4 z-20">
                        <Badge variant="solid" className="bg-primary/90 border-primary text-white">
                          <HiSparkles className="inline w-3 h-3 mr-1" aria-hidden="true" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="muted">{project.category}</Badge>
                    </div>

                    <div className="absolute inset-0 z-20 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-3 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 min-h-12 min-w-12 flex items-center justify-center"
                        aria-label={`View case study for ${project.title}`}
                      >
                        <HiEye className="text-xl" />
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 min-h-12 min-w-12 flex items-center justify-center"
                          aria-label={`View ${project.title} source code`}
                        >
                          <HiCode className="text-xl" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 min-h-12 min-w-12 flex items-center justify-center"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <HiExternalLink className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="!min-h-10 !px-0 text-primary hover:text-blue-400"
                      onClick={() => setSelectedProject(project)}
                    >
                      Read case study →
                    </Button>
                  </div>
                </Card>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <Dialog
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
              <ProjectImage project={selectedProject} />
            </div>
            <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">
                    <HiExternalLink className="mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <HiCode className="mr-2" />
                    Source Code
                  </Button>
                </a>
              )}
              {!selectedProject.demo && !selectedProject.github && (
                <p className="text-sm text-muted-foreground italic">
                  Demo and repository links available on request.
                </p>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </Section>
  );
};

export default Projects;
