from models.user import User
from models.leave import Leave
from models import db


def get_dashboard():

    employees = User.query.filter_by(role="EMPLOYEE").count()

    pending = Leave.query.filter_by(status="PENDING").count()

    approved = Leave.query.filter_by(status="APPROVED").count()

    rejected = Leave.query.filter_by(status="REJECTED").count()

    return {
        "success": True,
        "data": {
            "employees": employees,
            "pendingLeaves": pending,
            "approvedLeaves": approved,
            "rejectedLeaves": rejected
        }
    }, 200


def get_all_leaves():

    leaves = Leave.query.order_by(
        Leave.created_at.desc()
    ).all()

    result = []

    for leave in leaves:

        result.append({

            "id": leave.id,

            "employee": leave.user.name,

            "department": leave.user.department,

            "designation": leave.user.designation,

            "leaveType": leave.leave_type.name,

            "fromDate": str(leave.from_date),

            "toDate": str(leave.to_date),

            "days": leave.number_of_days,

            "reason": leave.reason,

            "status": leave.status,

            "adminRemark": leave.admin_remark

        })

    return {
        "success": True,
        "data": result
    }, 200

def approve_leave(leave_id, data):

    leave = Leave.query.get(leave_id)

    if not leave:
        return {
            "success": False,
            "message": "Leave request not found"
        }, 404

    leave.status = "APPROVED"
    leave.admin_remark = data.get("adminRemark", "")

    db.session.commit()

    return {
        "success": True,
        "message": "Leave Approved Successfully"
    }, 200


def reject_leave(leave_id, data):

    leave = Leave.query.get(leave_id)

    if not leave:
        return {
            "success": False,
            "message": "Leave request not found"
        }, 404

    leave.status = "REJECTED"
    leave.admin_remark = data.get("adminRemark", "")

    db.session.commit()

    return {
        "success": True,
        "message": "Leave Rejected Successfully"
    }, 200

def get_all_employees():

    employees = User.query.filter_by(
        role="EMPLOYEE"
    ).all()

    data = []

    for employee in employees:

        data.append({

            "id": employee.id,

            "name": employee.name,

            "email": employee.email,

            "department": employee.department,

            "designation": employee.designation,

            "joinedOn": employee.created_at.strftime("%Y-%m-%d")

        })

    return {
        "success": True,
        "data": data
    }, 200