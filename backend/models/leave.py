from datetime import datetime
from models import db


class Leave(db.Model):

    __tablename__ = "leave_requests"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    leave_type_id = db.Column(
        db.Integer,
        db.ForeignKey("leave_types.id"),
        nullable=False
    )

    from_date = db.Column(db.Date, nullable=False)

    to_date = db.Column(db.Date, nullable=False)

    number_of_days = db.Column(db.Integer, nullable=False)

    reason = db.Column(db.Text, nullable=False)

    status = db.Column(
        db.String(20),
        default="PENDING"
    )

    admin_remark = db.Column(db.Text)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user = db.relationship(
    "User",
    backref="leaves"
    )

    leave_type = db.relationship(
        "LeaveType"
    )