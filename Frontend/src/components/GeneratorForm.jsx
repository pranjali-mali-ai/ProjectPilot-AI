import { useMemo, useState } from "react";

export default function GeneratorForm({ onGenerate, disabled: externalDisabled }) {
  const [idea, setIdea] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(
    () => externalDisabled || loading || idea.trim().length < 10,
    [externalDisabled, loading, idea]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    setLoading(true);
    try {
      await onGenerate?.({ idea: idea.trim(), requirements: requirements.trim() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} aria-label="AI project idea input">
      <div className="pp-formRow" style={{ marginTop: 18 }}>
        <textarea
          className="pp-textarea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your project idea..."
          aria-label="Project idea"
          maxLength={800}
          rows={5}
        />
      </div>

      <div className="pp-formRow" style={{ marginTop: 12 }}>
        <textarea
          className="pp-textarea pp-textareaSecondary"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Additional requirements (Optional)"
          aria-label="Additional requirements"
          maxLength={800}
          rows={4}
        />
      </div>

      <div className="pp-formRow" style={{ marginTop: 14, justifyContent: "flex-end" }}>
        <button className="pp-btn" type="submit" disabled={disabled}>
          {loading ? "Generating…" : "Generate Project"}
        </button>
      </div>

      <div
        style={{
          marginTop: 10,
          color: "rgba(15,23,42,0.65)",
          fontWeight: 650,
          fontSize: 13,
        }}
      >
        {idea.trim().length >= 10 ? (
          <span>
            AI will create a complete blueprint: architecture, features, roadmap, tasks and timeline.
          </span>
        ) : (
          <span>Tip: include target users + key workflow for better outputs.</span>
        )}
      </div>
    </form>
  );
}

