from flask import Blueprint, jsonify , request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.employee_service import (get_dashboard , apply_leave, get_leave_history)

employee_bp = Blueprint(
    "employee",
    __name__
)


@employee_bp.route(
    "/api/employee/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    user_id = int(get_jwt_identity())

    response, status = get_dashboard(user_id)

    return jsonify(response), status

@employee_bp.route(
    "/api/employee/apply-leave",
    methods=["POST"]
)
@jwt_required()
def apply_leave_route():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    response, status = apply_leave(
        user_id,
        data
    )

    return jsonify(response), status

@employee_bp.route(
    "/api/employee/leaves",
    methods=["GET"]
)
@jwt_required()
def leave_history():

    user_id = int(get_jwt_identity())

    response, status = get_leave_history(user_id)

    return jsonify(response), status