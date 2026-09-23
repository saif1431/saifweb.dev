import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./content/projects";
import { CONCEPTS, CONCEPT_TECH } from "./content/concepts";
import { SITE } from "./content/site";
import ProjectCard from "./components/portfolio/ProjectCard";
import ConceptProjects from "./components/portfolio/ConceptProjects";

gsap.registerPlugin(ScrollTrigger);

const FIELDS = [
  { id: "ai", label: "AI & ML", title: "Intelligent systems.", note: "Products that turn complex models and data into useful tools.", category: "AI/ML" },
  { id: "full-stack", label: "Full Stack", title: "Connected platforms.", note: "End-to-end applications built around real workflows.", category: "Full Stack" },
  { id: "web", label: "Web Experiences", title: "Digital experiences.", note: "Distinct interfaces for brands, teams, and communities.", category: "Web App" },
  { id: "dashboard", label: "Dashboards", title: "Data in focus.", note: "Clear interfaces for information that matters.", category: "Dashboard" },
  { id: "concepts", label: "Concept Studies", title: "Ideas in motion.", note: "Visual directions for emerging products and systems.", category: null },
];
const ALL_COUNT = PROJECTS.length + Object.keys(CONCEPTS).length;
const TECHNOLOGIES = [...new Set([...PROJECTS.flatMap((project) => project.tech), ...Object.values(CONCEPT_TECH).flat()])].sort();

function useArchiveMotion(rootRef, field, technology) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      root.querySelectorAll(".project-family").forEach((group) => {
        gsap.from(group.querySelectorAll(".family-index, .family-heading, .family-note"), {
          y: 28, duration: .75, stagger: .08, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
        group.querySelectorAll(".project:not([hidden])").forEach((card) => {
          gsap.from(card.querySelector(".project-stage"), {
            y: 32, scale: .975, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
          gsap.from(card.querySelectorAll(".project-ident, .project-summary"), {
            y: 20, duration: .75, stagger: .08, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 65%", once: true },
          });
        });
      });
    }, root);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, [rootRef, field, technology]);
}

export default function ProjectsPage() {
  const rootRef = useRef(null);
  const dialogRef = useRef(null);
  const focusedCard = useRef(null);
  const [field, setField] = useState("all");
  const [technology, setTechnology] = useState("all");
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => FIELDS.map((section) => {
    const projects = section.category ? PROJECTS.filter((project) =>
      project.category === section.category && (technology === "all" || project.tech.includes(technology))) : [];
    const conceptKeys = section.id === "concepts" ? Object.keys(CONCEPTS).filter((key) =>
      technology === "all" || CONCEPT_TECH[key].includes(technology)) : [];
    return { ...section, projects, conceptKeys, count: projects.length + conceptKeys.length };
  }).filter((section) => section.count && (field === "all" || field === section.id)), [field, technology]);
  const count = groups.reduce((total, group) => total + group.count, 0);
  useArchiveMotion(rootRef, field, technology);

  useLayoutEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.querySelector(".dialog-close")?.focus();
  }, [selected]);
  useEffect(() => () => document.body.classList.remove("dialog-open"), []);
  useEffect(() => {
    const progress = rootRef.current.querySelector("#progress-bar");
    const header = rootRef.current.querySelector("#site-header");
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 32);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${scrollable ? window.scrollY / scrollable * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  function openRealProject(project, trigger) {
    focusedCard.current = trigger;
    setSelected({
      title: project.title,
      kind: `${project.category.toUpperCase()} / SELECTED PROJECT`,
      description: project.longDescription || project.description,
      facts: [["Category", project.category], ["Technologies", project.tech.join(" · ")]],
      tags: project.tech,
      href: project.demo || project.github,
    });
  }
  function openConcept(key, trigger) {
    focusedCard.current = trigger;
    setSelected(CONCEPTS[key]);
  }
  function closeDialog() { dialogRef.current?.close(); }
  function onDialogClose() {
    document.body.classList.remove("dialog-open");
    setSelected(null);
    focusedCard.current?.focus?.();
  }

  return <div className="archive-page" ref={rootRef}>
    <a className="skip-link" href="#archive-main">Skip to projects</a>
    <div className="scroll-progress" aria-hidden="true"><span id="progress-bar" /></div>
    <header className="site-header" id="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="wordmark" to="/" aria-label="Saif, home">SAIF<span>®</span></Link>
        <div className="nav-center"><span className="availability-dot" aria-hidden="true" /> SELECTED WORK / {ALL_COUNT} PROJECTS</div>
        <div className="nav-links"><Link to="/">Home</Link><Link to="/#about">About</Link><Link className="nav-cta" to="/#contact">Let's talk <span aria-hidden="true">↗</span></Link></div>
      </nav>
    </header>
    <main id="archive-main">
      <section className="archive-hero" aria-labelledby="archive-title">
        <div className="shell archive-hero-inner">
          <div className="section-index"><span>01</span> / PROJECT ARCHIVE</div>
          <div className="archive-hero-grid"><h1 id="archive-title">Explore<br /><em>the work.</em></h1><div className="archive-hero-aside"><span>BUILDING ACROSS DISCIPLINES</span><p>From AI systems and full-stack products to expressive web experiences. Find the work by field or technology.</p><a href="#projects-list">SCROLL TO EXPLORE ↓</a></div></div>
          <span className="archive-hero-mark" aria-hidden="true">✳</span>
          <div className="archive-hero-foot"><span>16 PROJECTS / 05 FIELDS</span><span>DESIGN × ENGINEERING</span></div>
        </div>
      </section>
      <div className="archive-filters" id="projects-list">
        <div className="shell archive-filters-inner">
          <div className="archive-field-list" role="group" aria-label="Filter projects by field">
            <button className={field === "all" ? "active" : ""} type="button" aria-pressed={field === "all"} onClick={() => setField("all")}>All work <span>{ALL_COUNT}</span></button>
            {FIELDS.map((item) => <button key={item.id} className={field === item.id ? "active" : ""} type="button" aria-pressed={field === item.id} onClick={() => setField(item.id)}>{item.label}</button>)}
          </div>
          <label className="archive-tech-select">TECH <select value={technology} onChange={(event) => setTechnology(event.target.value)}><option value="all">All technologies</option>{TECHNOLOGIES.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </div>
      </div>
      <div className="shell archive-content">
        <p className="result-status" role="status" aria-live="polite">Showing {count} project{count === 1 ? "" : "s"}</p>
        {groups.length ? groups.map((group, groupIndex) => <section className={`project-family family-${group.id}`} key={group.id} aria-labelledby={`field-${group.id}`}>
          <div className="family-intro"><span className="family-index">{String(groupIndex + 1).padStart(2, "0")} / {group.label.toUpperCase()}</span><h2 className="family-heading" id={`field-${group.id}`}>{group.title.split(" ").slice(0, -1).join(" ")} <em>{group.title.split(" ").at(-1)}</em></h2><p className="family-note">{group.note}</p><span className="family-count">{String(group.count).padStart(2, "0")} PROJECT{group.count === 1 ? "" : "S"}</span></div>
          <div className="project-list">{group.id === "concepts" ? <ConceptProjects visibleConceptKeys={group.conceptKeys} onOpen={openConcept} /> : group.projects.map((project) => <ProjectCard key={project.id} project={project} index={PROJECTS.indexOf(project)} total={ALL_COUNT} onOpen={openRealProject} />)}</div>
        </section>) : <div className="archive-empty"><h2>No projects in this combination.</h2><p>Try another field or technology.</p><button type="button" onClick={() => { setField("all"); setTechnology("all"); }}>SHOW ALL PROJECTS ↗</button></div>}
      </div>
      <div className="archive-end"><div className="shell"><span className="section-index">WHAT'S NEXT?</span><h2>Have something<br /><em>worth building?</em></h2><div className="archive-end-links"><Link to="/#contact">LET'S TALK ↗</Link><Link to="/">BACK TO HOME ↑</Link></div></div></div>
    </main>
    <footer className="footer shell archive-footer"><Link className="wordmark" to="/">SAIF<span>®</span></Link><p>INDEPENDENT DEVELOPER · PAKISTAN</p><a href={SITE.social.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><Link to="/">HOME ↑</Link><small>© {new Date().getFullYear()} SAIF</small></footer>
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="dialog-title" onClose={onDialogClose} onClick={(event) => { if (event.target === dialogRef.current) closeDialog(); }}>
      <div className="dialog-inner"><button type="button" className="dialog-close" onClick={closeDialog} aria-label="Close project details">×</button><p className="dialog-eyebrow">{selected?.kind}</p><h2 id="dialog-title">{selected?.title}</h2><p className="dialog-description">{selected?.description}</p><div className="dialog-facts">{selected?.facts.map(([label,value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="dialog-tags">{selected?.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{selected?.href && <a className="dialog-project-link" href={selected.href} target="_blank" rel="noopener noreferrer">VISIT PROJECT ↗</a>}<button type="button" className="dialog-back" onClick={closeDialog}>BACK TO WORK <span aria-hidden="true">↗</span></button></div>
    </dialog>
  </div>;
}
