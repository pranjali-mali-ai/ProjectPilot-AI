const TRUST_BADGES = [
  { strong: "99.9%", small: "Uptime guarantee" },
  { strong: "SOC2", small: "Security-first" },
  { strong: "1 min", small: "Blueprint delivery" },
  { strong: "No credit", small: "Cancel anytime" },
];

function TrustBadge({ strong, small, icon }) {
  return (
    <div className="pp-badge">
      <div className="pp-badgeIcon" aria-hidden="true">
        {icon}
      </div>
      <div className="pp-badgeText">
        <span className="pp-badgeStrong">{strong}</span>
        <span className="pp-badgeSmall">{small}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <div className="pp-ambient" aria-hidden="true">
        <div className="pp-blob b1" />
        <div className="pp-blob b2" />
        <div className="pp-blob b3" />
      </div>

      <section className="pp-hero" aria-label="Hero">
        <div className="pp-container">
          <div className="pp-heroCard">
            <div className="pp-kicker">
              <span aria-hidden="true">✨</span>
              SaaS-grade AI project planning, instantly
            </div>

            <h1 className="pp-h1">
              Transform Your Project Idea into a Complete Development Blueprint
            </h1>

            <p className="pp-subtitle">
              Enter your project idea and let AI generate a complete software development plan including architecture, features, roadmap, tasks, timeline, and technology recommendations.
            </p>




            <div className="pp-grid2">
              <div>
                {/* Generator moved to dedicated section to avoid duplicate input boxes */}
              </div>


              <aside className="pp-sideCard" aria-label="What you get">
                <div className="pp-sideTitle">What you’ll receive</div>
                <div className="pp-sideText">
                  • Feature breakdown
                  <br />
                  • User journeys + requirements
                  <br />
                  • MVP scope + phased roadmap
                  <br />
                  • Success metrics + launch checklist
                </div>
              </aside>
            </div>

            <div className="pp-trustRow" aria-label="Trust badges">
              <TrustBadge strong={TRUST_BADGES[0].strong} small={TRUST_BADGES[0].small} icon="🛡️" />
              <TrustBadge strong={TRUST_BADGES[1].strong} small={TRUST_BADGES[1].small} icon="🔒" />
              <TrustBadge strong={TRUST_BADGES[2].strong} small={TRUST_BADGES[2].small} icon="⚡" />
              <TrustBadge strong={TRUST_BADGES[3].strong} small={TRUST_BADGES[3].small} icon="✅" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

