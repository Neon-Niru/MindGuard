from flask import Blueprint

settings_bp = Blueprint("settings", __name__)

@settings_bp.route("/settings")
def settings():
    return {"message":"Settings"}