from flask import Blueprint, jsonify , request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.employee_service import (get_dashboard , apply_leave, get_leave_history,cancel_leave,get_leave_types)

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

@employee_bp.route(
    "/api/employee/cancel/<int:leave_id>",
    methods=["DELETE"]
)
@jwt_required()
def cancel(leave_id):

    user_id = int(get_jwt_identity())

    response, status = cancel_leave(
        user_id,
        leave_id
    )

    return jsonify(response), status

@employee_bp.route(
    "/api/employee/leave-types",
    methods=["GET"]
)
@jwt_required()
def leave_types():

    response, status = get_leave_types()

    return jsonify(response), status