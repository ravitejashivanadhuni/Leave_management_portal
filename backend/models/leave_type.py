from models import db


class LeaveType(db.Model):

    __tablename__ = "leave_types"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(50), nullable=False)

    days_allowed = db.Column(db.Integer, nullable=False)