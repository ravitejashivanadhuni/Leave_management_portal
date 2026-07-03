import { useEffect, useState } from "react";
import {
  getLeaveRequests,
  approveLeave,
  rejectLeave,
} from "../../services/adminService";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      const res = await getLeaveRequests();
      setLeaves(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    try {
      await approveLeave(id, {
        adminRemark: "Approved",
      });

      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleReject(id) {
    try {
      await rejectLeave(id, {
        adminRemark: "Rejected",
      });

      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Leave Requests
        </h1>

        <p className="text-gray-500">
          Manage employee leave requests.
        </p>
      </div>

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Employee</th>

              <th className="p-3 text-left">Department</th>

              <th className="p-3 text-left">Leave Type</th>

              <th className="p-3 text-left">From</th>

              <th className="p-3 text-left">To</th>

              <th className="p-3 text-left">Days</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr
                key={leave.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {leave.employee}
                </td>

                <td className="p-3">
                  {leave.department}
                </td>

                <td className="p-3">
                  {leave.leaveType}
                </td>

                <td className="p-3">
                  {leave.fromDate}
                </td>

                <td className="p-3">
                  {leave.toDate}
                </td>

                <td className="p-3">
                  {leave.days}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      leave.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {leave.status}
                  </span>

                </td>

                <td className="p-3">

                  {leave.status === "PENDING" ? (

                    <div className="flex gap-2">

                      <Button
                        variant="success"
                        onClick={() =>
                          handleApprove(leave.id)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          handleReject(leave.id)
                        }
                      >
                        Reject
                      </Button>

                    </div>

                  ) : (

                    <span className="text-gray-500">
                      Completed
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </Card>

    </div>
  );
}

export default LeaveRequests;