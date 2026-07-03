from flask import Blueprint, jsonify, request

from flask_jwt_extended import (
    jwt_required
)

from utils.auth import admin_required

from services.admin_service import (
    get_dashboard,
    get_all_leaves,
    approve_leave,
    reject_leave,
    get_all_employees
)

admin_bp = Blueprint(
    "admin",
    __name__
)


@admin_bp.route(
    "/api/admin/dashboard",
    methods=["GET"]
)
@jwt_required()
@admin_required
def dashboard():

    response, status = get_dashboard()

    return jsonify(response), status


@admin_bp.route(
    "/api/admin/leaves",
    methods=["GET"]
)
@jwt_required()
@admin_required
def all_leaves():

    response, status = get_all_leaves()

    return jsonify(response), status

@admin_bp.route(
    "/api/admin/approve/<int:leave_id>",
    methods=["PUT"]
)
@jwt_required()
@admin_required
def approve(leave_id):

    data = request.get_json()

    response, status = approve_leave(
        leave_id,
        data
    )

    return jsonify(response), status

@admin_bp.route(
    "/api/admin/reject/<int:leave_id>",
    methods=["PUT"]
)
@jwt_required()
@admin_required
def reject(leave_id):

    data = request.get_json()

    response, status = reject_leave(
        leave_id,
        data
    )

    return jsonify(response), status

@admin_bp.route(
    "/api/admin/employees",
    methods=["GET"]
)
@jwt_required()
@admin_required
def employees():

    response, status = get_all_employees()

    return jsonify(response), status