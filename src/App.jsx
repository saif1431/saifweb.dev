import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "./content/site";
import { PROJECTS } from "./content/projects";
import { EXPERIENCES } from "./content/experience";
import ProjectCard from "./components/portfolio/ProjectCard";
import { Link } from "react-router-dom";
import ContactForm from "./components/portfolio/ContactForm";

gsap.registerPlugin(ScrollTrigger);
const featuredIds = ["stock-analyzer", "pakjoblive", "graph-charts", "the-huddle"];
const featuredProjects = featuredIds.map((id) => PROJECTS.find((project) => project.id === id)).filter(Boolean);

function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pointerMove;
    const scope = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-overline", { y: 22, autoAlpha: 0, duration: 0.7 })
        .from(
          ".hero-line",
          { yPercent: 85, autoAlpha: 0, duration: 1.15, stagger: 0.13 },
          "-=.4",
        )
        .from(".hero-bottom", { y: 35, duration: 0.8 }, "-=.65")
        .from(
          ".portrait-frame",
          { y: 28, scale: 0.975, duration: 1.05 },
          "-=1.55",
        )
        .from(
          ".portrait-outline, .portrait-stamp, .portrait-caption",
          { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 },
          "-=.6",
        )
        .from(".hero-foot", { y: 18, autoAlpha: 0, duration: 0.7 }, "-=.45");
      gsap.fromTo(
        ".portrait-frame img",
        { scale: 1.2 },
        { scale: 1.1, duration: 2.1, ease: "power2.out" },
      );
      gsap.to(".portrait-frame img", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".portrait-outline", {
        rotate: 7,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      const reveal = (selector, trigger, distance = 45) =>
        gsap.from(selector, {
          y: distance,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger, start: "top 84%", once: true },
        });
      reveal(
        ".work-intro .section-index, .intro-grid h2, .intro-grid p",
        ".work-intro",
      );
      root.querySelectorAll(".project").forEach((card) => {
        gsap.from(card.querySelector(".project-stage"), {
          y: 28,
          scale: 0.975,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
        gsap.from(card.querySelectorAll(".project-ident, .project-summary"), {
          y: 22,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 55%", once: true },
        });
      });
      reveal(
        ".about-content .section-index, .about-lead h2, .about-lead p",
        ".about-content",
      );
      reveal(".expertise-card", ".expertise-grid", 55);
      reveal(".experience-strip", ".experience-strip");
      reveal(
        ".contact-section .section-index, .contact-overline, .contact-section h2, .contact-bottom",
        ".contact-section",
      );
      gsap.to(".marquee>div", {
        xPercent: -17,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cursor = root.querySelector("#cursor-orbit");
        const moveX = gsap.quickTo(cursor, "x", {
          duration: 0.24,
          ease: "power2.out",
        });
        const moveY = gsap.quickTo(cursor, "y", {
          duration: 0.24,
          ease: "power2.out",
        });
        pointerMove = (event) => {
          moveX(event.clientX);
          moveY(event.clientY);
        };
        window.addEventListener("pointermove", pointerMove, { passive: true });
        root.querySelectorAll(".project").forEach((card) => {
          card.addEventListener("pointerenter", () =>
            gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.28 }),
          );
          card.addEventListener("pointerleave", () =>
            gsap.to(cursor, { autoAlpha: 0, scale: 0.7, duration: 0.22 }),
          );
        });
      }
    }, root);
    document.fonts?.ready.then(() => {
      if (root.isConnected) ScrollTrigger.refresh();
    });
    return () => {
      if (pointerMove) window.removeEventListener("pointermove", pointerMove);
      scope.revert();
    };
  }, [rootRef]);
}

export default function App() {
  const rootRef = useRef(null);
  const dialogRef = useRef(null);
  const focusedCard = useRef(null);
  const [selected, setSelected] = useState(null);
  usePortfolioMotion(rootRef);

  useEffect(() => {
    const header = rootRef.current.querySelector("#site-header");
    const progress = rootRef.current.querySelector("#progress-bar");
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 32);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useLayoutEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.querySelector("#dialog-close")?.focus();
  }, [selected]);
  function openRealProject(project, trigger) {
    focusedCard.current = trigger;
    setSelected({
      title: project.title,
      kind: `${project.category.toUpperCase()} / SELECTED PROJECT`,
      description: project.longDescription || project.description,
      facts: [
        ["Category", project.category],
        ["Technologies", project.tech.join(" · ")],
      ],
      tags: project.tech,
      href: project.demo || project.github,
    });
  }
  function closeProject() {
    dialogRef.current?.close();
  }
  function onDialogClose() {
    document.body.classList.remove("dialog-open");
    setSelected(null);
    focusedCard.current?.focus?.();
  }
  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span id="progress-bar"></span>
      </div>
      <div className="cursor-orbit" id="cursor-orbit" aria-hidden="true">
        <span>
          VIEW
          <br />
          PROJECT ↗
        </span>
      </div>
      <header className="site-header" id="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Saif, back to top">
            {/* SAIF<span>®</span> */}
          <img src="/public/logo2.png" alt="" />
          </a>
          <div className="nav-center">
            <span className="availability-dot" aria-hidden="true"></span>{" "}
            Available for select projects
          </div>
          <div className="nav-links">
            <a href="#work">
              Work <sup>04</sup>
            </a>
            <a href="#about">About</a>
            <a className="nav-cta" href="#contact">
              Let's talk <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true"></div>
          <div className="hero-ambient" aria-hidden="true"></div>
          <div className="shell hero-layout">
            <div className="hero-copy">
              <div className="hero-overline intro-item">
                <span className="tiny-cross">✳</span> FRONT-END × FULL-STACK
                DEVELOPER <span className="overline-index">01 / 03</span>
              </div>
              <h1 id="hero-title">
                <span className="hero-line">Code with</span>
                <span className="hero-line serif-line">
                  <em>character.</em>
                </span>
              </h1>
              <div className="hero-bottom intro-item">
                <p>
                  Hi, I'm Saif. I shape distinct digital interfaces and engineer
                  the systems that make them work.
                </p>
                <a
                  className="round-link"
                  href="#work"
                  aria-label="Explore selected work"
                >
                  <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
            <div className="portrait-composition">
              <div className="portrait-outline" aria-hidden="true"></div>
              <div className="portrait-frame">
                <img
                  src="/portfolioImg2.jpg"
                  alt="Portrait from Saif’s portfolio"
                  fetchPriority="high"
                />
                <span className="portrait-image-label">SAIF / PORTFOLIO</span>
              </div>
              <div className="portrait-stamp" aria-hidden="true">
                <span>✳</span>
                <small>
                  DESIGN
                  <br />
                  MEETS CODE
                </small>
              </div>
              <div className="portrait-caption">
                <span>FULL-STACK DEVELOPER</span>
                <span>BUILDING WORLDWIDE ↗</span>
              </div>
            </div>
            <div className="hero-foot intro-item">
              <span>INDEPENDENT / PAKISTAN / WORLDWIDE</span>
              <span className="hero-foot-right">
                SCROLL TO EXPLORE{" "}
                <span className="scroll-line" aria-hidden="true"></span>
              </span>
            </div>
          </div>
        </section>

        <section
          className="work-section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="shell">
            <div className="section-intro work-intro">
              <div className="section-index">
                <span>01</span> / SELECTED WORK
              </div>
              <div className="intro-grid">
                <h2 id="work-title">
                  Work that
                  <br />
                  <em>speaks for itself.</em>
                </h2>
                <p>
                  Each project is a different problem, a different system, and a
                  chance to make the complex feel effortless.
                </p>
              </div>
            </div>
            <div className="project-list" id="project-list">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={featuredProjects.length}
                  onOpen={openRealProject}
                />
              ))}
            </div>
            <div className="explore-more">
              <p>There is more to explore — product work, web experiences, dashboards, and concepts.</p>
              <Link to="/work" className="explore-more-link">EXPLORE ALL PROJECTS <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="marquee" aria-hidden="true">
            <div>
              DESIGN <span>✳</span> DEVELOPMENT <span>✳</span> SYSTEMS{" "}
              <span>✳</span> DESIGN <span>✳</span> DEVELOPMENT <span>✳</span>{" "}
              SYSTEMS <span>✳</span>
            </div>
          </div>
          <div className="shell about-content">
            <div className="section-index">
              <span>02</span> / THE APPROACH
            </div>
            <div className="about-lead">
              <h2 id="about-title">
                More than code.
                <br />
                <em>Built to connect.</em>
              </h2>
              <p>
                I'm a front-end and full-stack developer with three years of
                experience creating web interfaces and delivering client work. I
                care about the details that make a product feel right—and the
                engineering that keeps it working.
              </p>
            </div>
            <div className="expertise-grid">
              <div className="expertise-card">
                <span className="expertise-num">01 / WHAT I BUILD</span>
                <h3>Interface & motion</h3>
                <p>
                  Responsive experiences, polished interactions, and UI systems
                  that bring an idea into focus.
                </p>
                <div className="expertise-tags">
                  <span>React</span>
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>GSAP</span>
                </div>
              </div>
              <div className="expertise-card">
                <span className="expertise-num">02 / HOW IT WORKS</span>
                <h3>Systems & data</h3>
                <p>
                  Full-stack applications, APIs, and dashboards designed around
                  real workflows.
                </p>
                <div className="expertise-tags">
                  <span>FastAPI</span>
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>Data UI</span>
                </div>
              </div>
              <div className="expertise-card">
                <span className="expertise-num">03 / WHAT'S NEXT</span>
                <h3>AI in practice</h3>
                <p>
                  Thoughtful AI features that solve a specific problem and stay
                  simple to use.
                </p>
                <div className="expertise-tags">
                  <span>Gemini API</span>
                  <span>Product thinking</span>
                  <span>Prototyping</span>
                </div>
              </div>
            </div>
            <div className="experience-list" aria-label="Experience">
              {EXPERIENCES.map((experience, index) => (
                <div className="experience-item" key={experience.role}>
                  <span>
                    0{index + 1} / {experience.period}
                  </span>
                  <strong>{experience.role}</strong>
                  <p>{experience.company}</p>
                </div>
              ))}
            </div>
            <div className="experience-strip">
              <span>EXPERIENCE</span>
              <strong>03+ YEARS</strong>
              <p>
                Front-end work, freelance client projects, and full-stack
                product delivery.
              </p>
            </div>
          </div>
          <div className="contact-section" id="contact">
            <div className="shell">
              <div className="section-index">
                <span>03</span> / START A CONVERSATION
              </div>
              <p className="contact-overline">HAVE A PROJECT IN MIND?</p>
              <h2>
                Let's make it
                <br />
                <em>impossible to ignore.</em>
              </h2>
              <div className="contact-bottom">
                <p>
                  Good work starts with a conversation. Tell me what you have in
                  mind. I’m open to thoughtful collaborations and ambitious
                  products.
                </p>
                <a
                  className="contact-button"
                  href={`mailto:${SITE.email}?subject=Portfolio%20Inquiry`}
                >
                  GET IN TOUCH <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ContactForm email={SITE.email} social={SITE.social} />
            </div>
            <div className="contact-glow" aria-hidden="true"></div>
          </div>
          <footer className="footer shell">
            <a className="wordmark" href="#top">
              SAIF<span>®</span>
            </a>
            <p>INDEPENDENT DEVELOPER · PAKISTAN</p>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
            <a href="#top">BACK TO TOP ↑</a>
            <small>
              © <span id="year">{new Date().getFullYear()}</span> SAIF
            </small>
          </footer>
        </section>
      </main>
      <dialog
        id="project-dialog"
        ref={dialogRef}
        onClose={onDialogClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeProject();
        }}
        className="project-dialog"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-inner">
          <button
            type="button"
            className="dialog-close"
            id="dialog-close"
            onClick={closeProject}
            aria-label="Close project details"
          >
            ×
          </button>
          <p className="dialog-eyebrow" id="dialog-kind">
            {selected?.kind}
          </p>
          <h2 id="dialog-title">{selected?.title}</h2>
          <p className="dialog-description" id="dialog-description">
            {selected?.description}
          </p>
          <div className="dialog-facts" id="dialog-facts">
            {selected?.facts.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="dialog-tags" id="dialog-tags">
            {selected?.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {selected?.href && (
            <a
              className="dialog-project-link"
              href={selected.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              VISIT PROJECT ↗
            </a>
          )}
          <button
            type="button"
            className="dialog-back"
            id="dialog-back"
            onClick={closeProject}
          >
            BACK TO WORK <span aria-hidden="true">↗</span>
          </button>
        </div>
      </dialog>{" "}
    </div>
  );
}
