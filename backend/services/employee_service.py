from datetime import datetime
from models import db
from models.leave import Leave


def get_dashboard(user_id):

    leaves = Leave.query.filter_by(user_id=user_id).all()

    pending = approved = rejected = cancelled = 0

    for leave in leaves:

        if leave.status == "PENDING":
            pending += 1

        elif leave.status == "APPROVED":
            approved += 1

        elif leave.status == "REJECTED":
            rejected += 1

        elif leave.status == "CANCELLED":
            cancelled += 1

    return {
        "success": True,
        "data": {
            "pending": pending,
            "approved": approved,
            "rejected": rejected,
            "cancelled": cancelled,
            "totalLeaves": len(leaves)
        }
    }, 200


def apply_leave(user_id, data):

    from_date = datetime.strptime(
        data["from_date"],
        "%Y-%m-%d"
    ).date()

    to_date = datetime.strptime(
        data["to_date"],
        "%Y-%m-%d"
    ).date()

    number_of_days = (to_date - from_date).days + 1

    leave = Leave(
        user_id=user_id,
        leave_type_id=data["leave_type_id"],
        from_date=from_date,
        to_date=to_date,
        number_of_days=number_of_days,
        reason=data["reason"],
        status="PENDING"
    )

    db.session.add(leave)
    db.session.commit()

    return {
        "success": True,
        "message": "Leave Applied Successfully"
    }, 201

def get_leave_history(user_id):

    leaves = Leave.query.filter_by(
        user_id=user_id
    ).order_by(
        Leave.created_at.desc()
    ).all()

    history = []

    for leave in leaves:

        history.append({

            "id": leave.id,

            "leaveType": leave.leave_type.name,

            "fromDate": str(leave.from_date),

            "toDate": str(leave.to_date),

            "days": leave.number_of_days,

            "reason": leave.reason,

            "status": leave.status,

            "adminRemark": leave.admin_remark,

            "createdAt": leave.created_at.strftime("%Y-%m-%d")

        })

    return {
        "success": True,
        "data": history
    }, 200