import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GeneratorForm from "../components/GeneratorForm";
import Loading from "../components/Loading";
import BlueprintSectionList from "../components/BlueprintSectionList";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { generateBlueprint as apiGenerate } from "../services/api";
import { generateBlueprint as localGenerate } from "../utils/blueprintContent";

const FEATURE_ITEMS = [
  { icon: "🤖", title: "AI Project Planning", description: "Transforms raw ideas into comprehensive development blueprints with architecture, database, API, and roadmap." },
  { icon: "🧠", title: "Smart Roadmap Generator", description: "Creates phased development roadmaps with clear objectives, deliverables, and duration estimates for each phase." },
  { icon: "🧩", title: "Database Designer", description: "Generates normalized database schemas with tables, relationships, indexes, and foreign key constraints." },
  { icon: "🛠️", title: "Tech Stack Recommendation", description: "Analyzes project requirements to recommend optimal frontend, backend, database, and DevOps technologies." },
  { icon: "🚀", title: "Sprint Planner", description: "Breaks down development into weekly sprints with specific goals, tasks, and deliverables for agile execution." },
  { icon: "✅", title: "Task Breakdown", description: "Generates categorized task checklists covering frontend, backend, database, AI, testing, and deployment." },
  { icon: "🗓️", title: "Timeline Generator", description: "Produces realistic development timelines with milestones and estimated completion dates for each phase." },
  { icon: "🔌", title: "API Generator", description: "Designs complete REST API endpoints with methods, routes, request bodies, and response schemas." },
  { icon: "🏗️", title: "Architecture Generator", description: "Designs system architecture with client, server, AI service, and data layer communication." },
  { icon: "📤", title: "Blueprint Export", description: "Export complete project blueprints as structured documentation for sharing with teams and stakeholders." },
];

export default function Home() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [blueprint, setBlueprint] = useState(null);

  const revealClass = useMemo(() => {
    if (!generated) return "";
    return "pp-reveal isReady";
  }, [generated]);

  const scrollToGenerator = () => {
    const el = document.getElementById("generator");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onGenerate = async ({ idea, requirements }) => {
    setGenerating(true);
    setGenerated(false);
    setBlueprint(null);

    try {
      await new Promise((r) => setTimeout(r, 2800));

      // Try backend API first, fall back to local generation
      let newBlueprint;
      try {
        newBlueprint = await apiGenerate(idea, requirements);
      } catch {
        console.warn("Backend unavailable, using local blueprint generator");
        newBlueprint = localGenerate(idea, requirements);
      }

      setBlueprint(newBlueprint);
      setGenerated(true);
    } catch (err) {
      console.error("Blueprint generation failed:", err);
      alert("Failed to generate blueprint. Please try again.");
    } finally {
      setGenerating(false);
    }

    requestAnimationFrame(() => {
      const el = document.getElementById("blueprint");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />

        {/* Generator Section */}
        <section id="generator" style={{ padding: "0 22px 28px" }}>
          <div className="pp-container">
            <div className="pp-heroCard" style={{ padding: 18 }}>
              <GeneratorForm onGenerate={onGenerate} disabled={generating} />
            </div>
          </div>
        </section>

        {/* Loading Animation */}
        {generating ? (
          <Loading active={generating} />
        ) : null}

        {/* Blueprint Section — Only shown after generation */}
        {generated && blueprint ? (
          <section id="blueprint" className="pp-blueprintWrap">
            <div className={`pp-container ${revealClass}`}>
              <div style={{ marginBottom: 14 }}>
                <div className="pp-sectionTitle">Project Blueprint</div>
                <div className="pp-sectionLead" style={{ marginBottom: 14 }}>
                  Expand each section to review architecture, database schema, API endpoints, roadmap, tasks, and more.
                </div>
              </div>
              <BlueprintSectionList blueprint={blueprint} />
            </div>
          </section>
        ) : null}

        {/* Placeholder when no blueprint has been generated */}
        {!generated && !generating ? (
          <section id="blueprint" className="pp-blueprintWrap">
            <div className="pp-container">
              <div className="pp-placeholderCard">
                <div className="pp-placeholderIcon">📋</div>
                <h3 className="pp-placeholderTitle">No Project Blueprint Yet</h3>
                <p className="pp-placeholderText">
                  Please enter your project idea and click "Generate Project" to create your complete AI-powered project blueprint.
                </p>
                <button className="pp-btn pp-placeholderBtn" onClick={scrollToGenerator}>
                  Go to Generator
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {/* Features Section — always visible */}
        <section id="features" style={{ padding: "30px 22px 90px" }}>
          <div className="pp-container">
            <div className="pp-sectionTitle" style={{ textAlign: "center" }}>Features</div>
            <div className="pp-sectionLead" style={{ marginBottom: 14, textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
              Everything you need for fast, structured planning—right from a simple idea.
            </div>
            <div className="pp-featuresGrid">
              {FEATURE_ITEMS.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ padding: "30px 22px 90px" }}>
          <div className="pp-container">
            <div className="pp-sectionTitle">About</div>
            <div className="pp-aboutCard">
              <div className="pp-aboutGrid">
                <div className="pp-aboutContent">
                  <p className="pp-aboutLead">
                    ProjectPilot AI is an AI-powered project planning assistant that transforms a simple idea into a complete software development blueprint.
                  </p>
                  <p className="pp-aboutText">
                    Built for developers, startup founders, and hackathon teams, ProjectPilot AI leverages advanced language models to automatically generate comprehensive project documentation including system architecture, database schemas, API endpoints, technology recommendations, development roadmaps, sprint plans, and implementation tasks.
                  </p>
                  <p className="pp-aboutText">
                    Whether you're planning a weekend hackathon project or a production-grade SaaS platform, ProjectPilot AI eliminates the overhead of manual planning and documentation, letting you focus on what matters most — building great software.
                  </p>
                  <div className="pp-aboutStats">
                    <div className="pp-aboutStat">
                      <span className="pp-aboutStatNum">15</span>
                      <span className="pp-aboutStatLabel">Blueprint Sections</span>
                    </div>
                    <div className="pp-aboutStat">
                      <span className="pp-aboutStatNum">10+</span>
                      <span className="pp-aboutStatLabel">Features</span>
                    </div>
                    <div className="pp-aboutStat">
                      <span className="pp-aboutStatNum">2.8s</span>
                      <span className="pp-aboutStatLabel">Generation Time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
