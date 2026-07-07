from flask import Blueprint

planner_bp = Blueprint("planner", __name__)

@planner_bp.route("/planner")
def planner():
    return {"message":"Planner"}