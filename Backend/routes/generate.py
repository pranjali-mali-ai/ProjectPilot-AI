from flask import Blueprint, request, jsonify
from services.gemini_service import generate_blueprint

generate_bp = Blueprint("generate", __name__)

@generate_bp.route("/generate", methods=["POST"])
def generate():

    data = request.get_json()

    project_idea = data.get("idea", "")
    requirements = data.get("requirements", "")

    try:
        blueprint = generate_blueprint(project_idea, requirements)

        return jsonify({
            "success": True,
            "blueprint": blueprint
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500