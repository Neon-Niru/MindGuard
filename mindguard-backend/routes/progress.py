from flask import Blueprint

progress_bp = Blueprint("progress", __name__)

@progress_bp.route("/progress")
def progress():
    return {"message":"Progress"}