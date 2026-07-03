from flask import Flask
from flask_cors import CORS

from config import Config
from models import db

from models.user import User
from models.leave import Leave
from models.leave_type import LeaveType

from flask_jwt_extended import JWTManager
from routes.auth_routes import auth_bp

from routes.employee_routes import employee_bp

app = Flask(__name__)

app.config.from_object(Config)
jwt = JWTManager(app)

CORS(app)

db.init_app(app)
app.register_blueprint(auth_bp)
app.register_blueprint(employee_bp)
@app.route("/")
def home():
    return {
        "success": True,
        "message": "LeaveFlow API Running"
    }


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)