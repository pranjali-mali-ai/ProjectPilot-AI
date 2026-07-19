const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function generateBlueprint(idea, requirements = "") {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, requirements }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to generate blueprint");
  }

  return data.blueprint;
}
