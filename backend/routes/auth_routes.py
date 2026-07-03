from flask import Blueprint, request, jsonify

from services.auth_service import (
    register_user,
    login_user
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/auth/register", methods=["POST"])
def register():

    data = request.get_json()

    response, status = register_user(data)

    return jsonify(response), status


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    response, status = login_user(data)

    return jsonify(response), status