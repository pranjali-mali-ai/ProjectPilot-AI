import { useMemo, useState } from "react";
import BlueprintCard from "./BlueprintCard";

const BLUEPRINT_SECTIONS = [
  { icon: "📌", title: "Executive Summary", key: "project_overview" },
  { icon: "🎯", title: "Problem Statement", key: "problem_statement" },
  { icon: "👥", title: "Target Users", key: "target_users" },
  { icon: "✨", title: "Core Features", key: "core_features" },
  { icon: "🧠", title: "Recommended Tech Stack", key: "tech_stack" },
  { icon: "🏗️", title: "System Architecture", key: "architecture" },
  { icon: "🗄️", title: "Database Design", key: "db_schema" },
  { icon: "📁", title: "Folder Structure", key: "folder_structure" },
  { icon: "🔌", title: "API Design", key: "api_endpoints" },
  { icon: "🗓️", title: "Development Roadmap", key: "roadmap" },
  { icon: "🚀", title: "Sprint Plan", key: "sprint_plan" },
  { icon: "⏱️", title: "Timeline", key: "timeline" },
  { icon: "✅", title: "Task Checklist", key: "task_checklist" },
  { icon: "⚠️", title: "Risk Analysis", key: "risk_analysis" },
  { icon: "🌱", title: "Future Scope", key: "future_scope" },
];

export default function BlueprintSectionList({ blueprint }) {
  const [openMap, setOpenMap] = useState({});

  const onToggle = (key) =>
    setOpenMap((m) => ({
      ...m,
      [key]: !m?.[key],
    }));

  const contentByKey = useMemo(() => {
    const b = blueprint ?? {};
    return {
      project_overview: b.project_overview ?? [],
      problem_statement: b.problem_statement ?? [],
      target_users: b.target_users ?? [],
      core_features: b.core_features ?? [],
      tech_stack: b.tech_stack ?? [],
      architecture: b.architecture ?? [],
      db_schema: b.db_schema ?? [],
      folder_structure: b.folder_structure ?? [],
      api_endpoints: b.api_endpoints ?? [],
      roadmap: b.roadmap ?? [],
      sprint_plan: b.sprint_plan ?? [],
      timeline: b.timeline ?? [],
      task_checklist: b.task_checklist ?? [],
      risk_analysis: b.risk_analysis ?? [],
      future_scope: b.future_scope ?? [],
    };
  }, [blueprint]);

  return (
    <div className="pp-blueprintGrid" aria-label="Project blueprint sections">
      {BLUEPRINT_SECTIONS.map((s) => (
        <BlueprintCard
          key={s.key}
          icon={s.icon}
          title={s.title}
          open={!!openMap?.[s.key]}
          onToggle={() => onToggle(s.key)}
          body={contentByKey[s.key]}
        />
      ))}
    </div>
  );
}
