export default function ConceptProjects({ visibleConceptKeys, onOpen }) {
  function onCardKeyDown(event, key) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(key, event.currentTarget);
    }
  }
  return (
    <>
              <article
                className="project"
                data-type="ai"
                data-tech="react ai"
                data-key="synapse"
                onClick={(event) => onOpen("synapse", event.currentTarget)}
                onKeyDown={(event) => onCardKeyDown(event, "synapse")}
                hidden={!visibleConceptKeys.includes("synapse")}
                role="button"
                aria-haspopup="dialog"
                aria-label="Explore Synapse Chat"
                tabIndex="0"
              >
                <div className="project-stage stage-synapse">
                  <div className="stage-top">
                    <span>13 / CONCEPT STUDY</span>
                    <span>AI / PRODUCT</span>
                  </div>
                  <div className="stage-watermark">SYNAPSE</div>
                  <div className="synapse-visual">
                    <div className="synapse-sidebar">
                      <span>✳</span>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="synapse-ui">
                      <div className="ui-top">
                        synapse<span>✳ &nbsp; chat</span>
                        <b>•••</b>
                      </div>
                      <div className="synapse-question">
                        How can we make this idea clearer?
                      </div>
                      <div className="synapse-answer">
                        <span>✳</span>
                        <div>
                          <b>Let's find the shape of it.</b>
                          <small>
                            Start with the problem, then build a thoughtful
                            solution around the people using it.
                          </small>
                        </div>
                      </div>
                      <div className="synapse-input">
                        Ask something interesting <span>↗</span>
                      </div>
                    </div>
                  </div>
                  <div className="stage-corner">
                    VISUAL CONCEPT / 2026 <span>↗</span>
                  </div>
                </div>
                <div className="project-meta">
                  <div className="project-ident">
                    <span className="project-number">13 — 16</span>
                    <h3>
                      Synapse <em>Chat</em>
                    </h3>
                  </div>
                  <div className="project-summary">
                    <p>
                      An AI chat experience that makes powerful tools feel
                      approachable and useful.
                    </p>
                    <div className="project-tags">
                      <span>Gemini API</span>
                      <span>AI product</span>
                      <span>Frontend</span>
                    </div>
                    <span className="project-action">
                      EXPLORE PROJECT <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </article>

              <article
                className="project"
                data-type="dashboard"
                data-tech="react data"
                data-key="uptime"
                onClick={(event) => onOpen("uptime", event.currentTarget)}
                onKeyDown={(event) => onCardKeyDown(event, "uptime")}
                hidden={!visibleConceptKeys.includes("uptime")}
                role="button"
                aria-haspopup="dialog"
                aria-label="Explore Uptime Monitoring"
                tabIndex="0"
              >
                <div className="project-stage stage-uptime">
                  <div className="stage-top">
                    <span>14 / CONCEPT STUDY</span>
                    <span>SAAS / ANALYTICS</span>
                  </div>
                  <div className="uptime-ring" aria-hidden="true"></div>
                  <div className="uptime-visual">
                    <div className="uptime-visual-top">
                      <span className="uptime-mark">◉</span> SYSTEM HEALTH{" "}
                      <span className="online">● LIVE STATUS</span>
                    </div>
                    <div className="uptime-visual-body">
                      <div className="uptime-label">
                        ALL SYSTEMS OPERATIONAL
                      </div>
                      <strong>
                        99<span>.98</span>
                        <sup>%</sup>
                      </strong>
                      <div className="uptime-sublabel">UPTIME THIS MONTH</div>
                      <div className="uptime-graph" aria-hidden="true"></div>
                      <div className="uptime-metrics">
                        <span>
                          API <b>142 MS</b>
                        </span>
                        <span>
                          INCIDENTS <b>00</b>
                        </span>
                        <span>
                          MONITORS <b>24</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="stage-corner">
                    VISUAL CONCEPT / 2026 <span>↗</span>
                  </div>
                </div>
                <div className="project-meta">
                  <div className="project-ident">
                    <span className="project-number">14 — 16</span>
                    <h3>
                      Uptime <em>Monitoring</em>
                    </h3>
                  </div>
                  <div className="project-summary">
                    <p>
                      Service health, availability, and incidents brought into
                      one clear operational view.
                    </p>
                    <div className="project-tags">
                      <span>SaaS</span>
                      <span>Monitoring</span>
                      <span>Data</span>
                    </div>
                    <span className="project-action">
                      EXPLORE PROJECT <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </article>

              <article
                className="project"
                data-type="dashboard"
                data-tech="react data"
                data-key="pharma"
                onClick={(event) => onOpen("pharma", event.currentTarget)}
                onKeyDown={(event) => onCardKeyDown(event, "pharma")}
                hidden={!visibleConceptKeys.includes("pharma")}
                role="button"
                aria-haspopup="dialog"
                aria-label="Explore Pharma Operations"
                tabIndex="0"
              >
                <div className="project-stage stage-pharma">
                  <div className="stage-top">
                    <span>15 / CONCEPT STUDY</span>
                    <span>OPERATIONS / SYSTEMS</span>
                  </div>
                  <div className="pharma-orbit" aria-hidden="true"></div>
                  <div className="pharma-visual">
                    <div className="pharma-ui-top">
                      <span>✣ &nbsp; PHARMA / OPS</span>
                      <span>OVERVIEW &nbsp; ANALYTICS &nbsp; REPORTS</span>
                      <span>◯</span>
                    </div>
                    <div className="pharma-ui-body">
                      <small>MONDAY, SEPTEMBER 23</small>
                      <h4>
                        Operations overview<span>↗</span>
                      </h4>
                      <div className="pharma-grid">
                        <div className="pharma-kpi">
                          <small>PRODUCTION EFFICIENCY</small>
                          <strong>
                            84.2<sup>%</sup>
                          </strong>
                          <span>↑ 4.8% THIS MONTH</span>
                        </div>
                        <div className="pharma-kpi">
                          <small>ACTIVE BATCHES</small>
                          <strong>128</strong>
                          <span>ACROSS 04 FACILITIES</span>
                        </div>
                        <div className="pharma-kpi">
                          <small>QUALITY SCORE</small>
                          <strong>96.4</strong>
                          <span>WITHIN TARGET RANGE</span>
                        </div>
                      </div>
                      <div className="pharma-chart">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="stage-corner">
                    VISUAL CONCEPT / 2026 <span>↗</span>
                  </div>
                </div>
                <div className="project-meta">
                  <div className="project-ident">
                    <span className="project-number">15 — 16</span>
                    <h3>
                      Pharma <em>Operations</em>
                    </h3>
                  </div>
                  <div className="project-summary">
                    <p>
                      A control center designed to make dense operational data
                      easier to read and act on.
                    </p>
                    <div className="project-tags">
                      <span>Dashboard</span>
                      <span>Data visualization</span>
                      <span>UI systems</span>
                    </div>
                    <span className="project-action">
                      EXPLORE PROJECT <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </article>

              <article
                className="project"
                data-type="platform"
                data-tech="react python ai"
                data-key="tanit"
                onClick={(event) => onOpen("tanit", event.currentTarget)}
                onKeyDown={(event) => onCardKeyDown(event, "tanit")}
                hidden={!visibleConceptKeys.includes("tanit")}
                role="button"
                aria-haspopup="dialog"
                aria-label="Explore Tanit"
                tabIndex="0"
              >
                <div className="project-stage stage-tanit">
                  <div className="stage-top">
                    <span>16 / CONCEPT STUDY</span>
                    <span>AGRICULTURE / PLATFORM</span>
                  </div>
                  <div className="tanit-sun" aria-hidden="true"></div>
                  <div className="tanit-visual">
                    <div className="tanit-top">
                      <span className="tanit-flower">✳</span> tanit{" "}
                      <span>MAZRATI &nbsp; NAMRAI &nbsp; ◯</span>
                    </div>
                    <div className="tanit-main">
                      <small>ONE PLACE FOR WHAT MATTERS</small>
                      <h4>
                        Grow with
                        <br />
                        <em>clarity.</em>
                      </h4>
                      <p>Every field. Every herd. One connected view.</p>
                      <div className="tanit-pills">
                        <span>↗ &nbsp; Mazrati / Farming</span>
                        <span>◇ &nbsp; Namrai / Livestock</span>
                      </div>
                    </div>
                    <div className="tanit-illustration" aria-hidden="true">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="stage-corner">
                    VISUAL CONCEPT / 2026 <span>↗</span>
                  </div>
                </div>
                <div className="project-meta">
                  <div className="project-ident">
                    <span className="project-number">16 — 16</span>
                    <h3>
                      Tanit <em>Platform</em>
                    </h3>
                  </div>
                  <div className="project-summary">
                    <p>
                      A connected product direction for agriculture, livestock,
                      and multilingual workflows.
                    </p>
                    <div className="project-tags">
                      <span>Product</span>
                      <span>Agriculture</span>
                      <span>AI concept</span>
                    </div>
                    <span className="project-action">
                      EXPLORE PROJECT <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </article>
    </>
  );
}
