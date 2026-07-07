from flask import Blueprint

interview_bp = Blueprint("interview", __name__)

@interview_bp.route("/interview")
def interview():
    return {"message":"Interview"}