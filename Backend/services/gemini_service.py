import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

GENERATION_PROMPT = """You are a senior software architect. Generate a complete project blueprint as valid JSON only (no markdown, no code fences).

Project Idea: {idea}
{req_text}

Return a JSON object with these 15 keys, each containing an array of block objects:

1. "project_overview": blocks about overview, purpose, goals, expected outcome
2. "problem_statement": blocks about problem, limitations, proposed solution
3. "target_users": user persona cards (type:"user" with who, painPoints, help, benefits)
4. "core_features": feature detail blocks (type:"feature" with name, description, howItWorks, benefit, example)
5. "tech_stack": technology stacks (type:"tech" with category and stacks array)
6. "architecture": blocks about client layer, server layer, data flow (use type:"numbered" for data flow steps)
7. "db_schema": table design with type:"table" (headers + rows arrays)
8. "folder_structure": project folder layout with type:"code" block
9. "api_endpoints": API endpoints with type:"table"
10. "roadmap": phases with type:"heading" and type:"list" blocks
11. "sprint_plan": sprints with heading and list blocks
12. "timeline": milestone table
13. "task_checklist": checklist items grouped by category heading with type:"checklist" blocks
14. "risk_analysis": risk blocks with heading + text
15. "future_scope": future enhancements with heading + text

Block types available:
- {{"type":"text","text":"..."}}
- {{"type":"heading","text":"..."}}
- {{"type":"list","items":["...","..."]}}
- {{"type":"numbered","items":["...","..."]}}
- {{"type":"code","language":"...","code":"..."}}
- {{"type":"table","headers":["..."],"rows":[["...","..."]]}}
- {{"type":"user","who":"...","painPoints":"...","help":"...","benefits":"..."}}
- {{"type":"feature","name":"...","description":"...","howItWorks":"...","benefit":"...","example":"..."}}
- {{"type":"tech","category":"...","stacks":[{{"name":"...","why":"..."}}]}}
- {{"type":"checklist","items":[{{"label":"...","checked":false}}]}}

Return ONLY the JSON object, no other text."""


def _extract_json(text: str) -> dict:
    """Extract JSON from LLM response, handling markdown fences and stray text."""
    # Try to find JSON block inside triple backticks
    m = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if m:
        text = m.group(1)
    # Try parsing directly
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Attempt to find outermost { ... }
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end+1])
            except json.JSONDecodeError:
                pass
    raise ValueError("Could not parse blueprint JSON from AI response")


def generate_blueprint(project_idea: str, requirements: str = "") -> dict:
    """Generate a complete project blueprint using the Gemini API."""
    
    req_text = f"Additional requirements: {requirements}" if requirements else ""
    prompt = GENERATION_PROMPT.format(idea=project_idea, req_text=req_text)

    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Create a .env file with your key, "
            "or use the local blueprint generator as fallback."
        )

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    if not response.text:
        raise RuntimeError("Gemini API returned an empty response")

    return _extract_json(response.text)
