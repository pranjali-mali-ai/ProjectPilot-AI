import { useEffect, useMemo, useState } from "react";

const AI_STEPS = [
  "🤖 AI is analyzing your project...",
  "✓ Understanding requirements",
  "✓ Identifying target users",
  "✓ Selecting the best technology stack",
  "✓ Designing database schema",
  "✓ Planning system architecture",
  "✓ Creating roadmap",
  "✓ Breaking down tasks",
  "✓ Finalizing project blueprint",
];

export default function Loading({ active, onDone, durationMs = 2800 }) {
  const [stepIndex, setStepIndex] = useState(0);

  const stepMs = useMemo(() => {
    if (!AI_STEPS?.length) return durationMs;
    return Math.max(200, Math.floor(durationMs / (AI_STEPS.length - 1)));
  }, [durationMs]);

  useEffect(() => {
    if (!active) {
      setStepIndex(0);
      return;
    }

    let cancelled = false;
    let t = null;

    const tick = (i) => {
      if (cancelled) return;
      setStepIndex(i);
      if (i >= AI_STEPS.length - 1) {
        onDone?.();
        return;
      }
      t = window.setTimeout(() => tick(i + 1), stepMs);
    };

    t = window.setTimeout(() => tick(1), stepMs);

    return () => {
      cancelled = true;
      if (t) window.clearTimeout(t);
    };
  }, [active, onDone, stepMs]);

  if (!active) return null;

  return (
    <div className="pp-loadWrap" aria-live="polite">
      <div className="pp-loadCard pp-reveal isReady">
        <div className="pp-loadRow">
          <div className="pp-spinner" aria-hidden="true" />
          <div style={{ flex: 1 }}>
            <div className="pp-loadTitle">🤖 AI is analyzing your project...</div>

            <div className="pp-loadSteps">
              {AI_STEPS.slice(1).map((step, idx) => {
                const isDone = idx < stepIndex - 1;
                const isCurrent = idx === stepIndex - 1;
                return (
                  <div
                    className={`pp-loadStep ${isDone ? "isDone" : ""} ${isCurrent ? "isCurrent" : ""}`}
                    key={step}
                  >
                    <div className="pp-check" aria-hidden="true">
                      {isDone ? "✓" : isCurrent ? "→" : "○"}
                    </div>
                    <div>{step.replace("✓ ", "")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
