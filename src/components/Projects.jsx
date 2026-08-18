import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "./ui/Section";
import Badge from "./ui/Badge";
import Dialog from "./ui/Dialog";
import Button from "./ui/Button";
import RevealText from "./ui/RevealText";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { HiSparkles, HiArrowUpRight } from "react-icons/hi2";
import { PROJECTS, PROJECT_CATEGORIES } from "../content/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ProjectInitials = ({ project }) => {
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
      <span className="text-2xl font-display font-semibold text-foreground/40">{initials}</span>
    </div>
  );
};

const ProjectMediaLarge = ({ project }) => {
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.image || undefined}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-contain bg-black"
      >
        Sorry, your browser doesn&apos;t support embedded videos.
      </video>
    );
  }

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title} project`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    );
  }

  return <ProjectInitials project={project} />;
};

const ProjectRow = ({ project, index, onSelect, onHover }) => (
  <li className="border-b border-border first:border-t">
    <button
      onClick={() => onSelect(project)}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(project)}
      onBlur={() => onHover(null)}
      className="group w-full text-left flex items-center gap-4 sm:gap-6 py-5 sm:py-7 px-1 sm:px-2 cursor-pointer"
    >
      <span className="font-mono text-xs sm:text-sm text-primary w-6 sm:w-8 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 md:hidden bg-surface border border-border">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <ProjectInitials project={project} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-muted-foreground">
              {tech}
              {project.tech.indexOf(tech) < Math.min(project.tech.length, 3) - 1 && (
                <span className="text-border ml-1.5">/</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {project.featured && (
        <Badge variant="solid" className="hidden sm:inline-flex shrink-0">
          <HiSparkles className="inline w-3 h-3 mr-1" aria-hidden="true" />
          Featured
        </Badge>
      )}

      <span className="hidden sm:block font-mono text-xs uppercase tracking-wide text-muted-foreground shrink-0 w-28 text-right">
        {project.category}
      </span>

      <HiArrowUpRight
        className="text-2xl sm:text-3xl text-primary shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        aria-hidden="true"
      />
    </button>
  </li>
);

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const reducedMotion = useReducedMotion();
  const listRef = useRef(null);
  const previewRef = useRef(null);

  const filteredProjects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    setCanHoverPreview(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useGSAP(
    () => {
      if (!listRef.current) return;
      gsap.fromTo(
        listRef.current.querySelectorAll("li"),
        reducedMotion ? {} : { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out", overwrite: "auto" }
      );
    },
    { dependencies: [filter, reducedMotion] }
  );

  useGSAP(
    () => {
      if (!canHoverPreview || reducedMotion || !previewRef.current) return;
      const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" });
      const handleMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    },
    { dependencies: [canHoverPreview, reducedMotion] }
  );

  useGSAP(
    () => {
      if (!canHoverPreview || reducedMotion || !previewRef.current) return;
      gsap.to(previewRef.current, {
        opacity: hoveredProject ? 1 : 0,
        scale: hoveredProject ? 1 : 0.85,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { dependencies: [hoveredProject, canHoverPreview, reducedMotion] }
  );

  return (
    <Section id="projects" className="relative overflow-hidden bg-surface/30" ariaLabelledby="projects-heading">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <Badge variant="solid" className="mb-4">
            <HiSparkles className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" aria-hidden="true" />
            Full Archive
          </Badge>
          <RevealText id="projects-heading" text="Everything I've Shipped" className="text-foreground max-w-xl" />
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 min-h-10 rounded-full text-sm font-medium transition-colors duration-300 capitalize ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ul ref={listRef}>
        {filteredProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
            onHover={setHoveredProject}
          />
        ))}
      </ul>

      {canHoverPreview && !reducedMotion && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[190] w-64 h-40 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden border border-border shadow-2xl opacity-0 scale-[0.85]"
        >
          {hoveredProject?.image ? (
            <img src={hoveredProject.image} alt="" className="w-full h-full object-cover" />
          ) : hoveredProject ? (
            <ProjectInitials project={hoveredProject} />
          ) : null}
        </div>
      )}

      <Dialog open={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title}>
        {selectedProject && (
          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
              <ProjectMediaLarge project={selectedProject} />
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
