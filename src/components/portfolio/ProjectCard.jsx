const visuals = {
  "stock-analyzer": { bg: "#20334d", accent: "#9edac2", ink: "#f2fff9" },
  kraftell: { bg: "#b8aa96", accent: "#f5e8d4", ink: "#1c2721" },
  pakjoblive: { bg: "#77a9bd", accent: "#e4f5ef", ink: "#18323e" },
  "ai-chatbot-langchain": { bg: "#55449c", accent: "#c5baff", ink: "#ffffff" },
  "medicine-recommendation-agent": { bg: "#1f645f", accent: "#b5ead5", ink: "#f7fff9" },
  "ericsson-5g-quest-map": { bg: "#30356d", accent: "#a8c7ff", ink: "#ffffff" },
  leadnite: { bg: "#8abfc7", accent: "#e6f9f3", ink: "#173f45" },
  "wedding-aisle": { bg: "#a5787e", accent: "#ffdece", ink: "#fffaf8" },
  verocta: { bg: "#4559a1", accent: "#bdcbff", ink: "#ffffff" },
  "chat-application": { bg: "#64465c", accent: "#f3c8e7", ink: "#fff9fd" },
  "the-huddle": { bg: "#6953a1", accent: "#d8c8ff", ink: "#ffffff" },
  "graph-charts": { bg: "#b7d4ca", accent: "#e7faf3", ink: "#183a35" },
};

const videoPosters = {
  "medicine-recommendation-agent": "/projects/medicine-recommendation-agent-poster.webp",
  "chat-application": "/projects/chat-application-poster.webp",
  "graph-charts": "/projects/graph-charts-poster.webp",
};

function splitTitle(title) {
  const firstSpace = title.indexOf(" ");
  return firstSpace < 0 ? [title, ""] : [title.slice(0, firstSpace), title.slice(firstSpace + 1)];
}

export default function ProjectCard({ project, index, total, hidden, onOpen }) {
  const [first, rest] = splitTitle(project.title);
  const visual = visuals[project.id] || visuals["stock-analyzer"];
  const screenshot = project.image || videoPosters[project.id];
  const number = String(index + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project, event.currentTarget);
    }
  }

  return (
    <article
      className="project project-from-archive"
      data-key={project.id}
      data-type={project.category}
      hidden={hidden}
      role="button"
      tabIndex={hidden ? -1 : 0}
      aria-haspopup="dialog"
      aria-label={`Explore ${project.title}`}
      onClick={(event) => onOpen(project, event.currentTarget)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="project-stage stage-real"
        style={{
          "--project-bg": visual.bg,
          "--project-accent": visual.accent,
          "--project-ink": visual.ink,
        }}
      >
        <div className="stage-top">
          <span>{number} / SELECTED PROJECT</span>
          <span>{project.category.toUpperCase()} / PRODUCT</span>
        </div>
        <span className="real-stage-wordmark" aria-hidden="true">
          {first.toUpperCase()}
        </span>
        <div className="real-stage-orbit" aria-hidden="true" />
        <div className="real-stage-caption" aria-hidden="true">
          <span>DESIGNED &amp; DEVELOPED</span>
          <span>SAIF / PORTFOLIO</span>
        </div>
        <div className="real-device" aria-hidden="true">
          <div className="real-device-topbar">
            <span className="real-device-dots"><i /><i /><i /></span>
            <span>{project.title}</span>
            <span className="real-device-symbol">✳</span>
          </div>
          {screenshot ? (
            <img src={screenshot} alt="" loading="lazy" decoding="async" />
          ) : (
            <div className="real-device-placeholder">
              <span>✳ &nbsp; MULTI-MODEL / AI CHAT</span>
              <p>One conversation.<br /><em>More perspective.</em></p>
              <div><span>CONTEXT-AWARE REASONING</span><b>↗</b></div>
            </div>
          )}
        </div>
        <div className="stage-corner">
          PROJECT SHOWCASE <span aria-hidden="true">↗</span>
        </div>
      </div>
      <div className="project-meta">
        <div className="project-ident">
          <span className="project-number">{number} — {totalNumber}</span>
          <h3>{first}{rest && <> <em>{rest}</em></>}</h3>
        </div>
        <div className="project-summary">
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
          </div>
          <span className="project-action">EXPLORE PROJECT <span aria-hidden="true">↗</span></span>
        </div>
      </div>
    </article>
  );
}
