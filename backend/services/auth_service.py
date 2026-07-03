import bcrypt
from models import db
from models.user import User
from flask_jwt_extended import create_access_token


def register_user(data):

    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }, 400

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        department=data["department"],
        designation=data["designation"],
        role="EMPLOYEE"
    )

    db.session.add(user)
    db.session.commit()

    return {
        "success": True,
        "message": "Registration Successful"
    }, 201


def login_user(data):

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {
            "success": False,
            "message": "Invalid Email or Password"
        }, 401

    if not bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return {
            "success": False,
            "message": "Invalid Email or Password"
        }, 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role
        }
    )

    return {
        "success": True,
        "token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }, 200