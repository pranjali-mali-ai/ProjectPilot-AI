import { useEffect, useState } from "react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.2, 0.3] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="pp-navWrap">
      <nav className="pp-nav" aria-label="Primary">
        <a className="pp-brand" href="#top" aria-label="ProjectPilot AI">
          <span className="pp-logo" aria-hidden="true">
            🚀
          </span>
          <span className="pp-brandText">ProjectPilot AI</span>
        </a>

        <div className="pp-links" role="navigation" aria-label="Section links">
          {LINKS.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                className={`pp-link ${isActive ? "isActive" : ""}`}
                href={l.href}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="pp-actions">
          <a
            className="pp-githubBtn"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="pp-githubIcon" aria-hidden="true">
              ⟠
            </span>
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

