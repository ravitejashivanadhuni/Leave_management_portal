import StatusBadge from "../common/StatusBadge";

function LeaveHistoryTable({ leaves, cancelLeave }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">Leave Type</th>

            <th className="p-4 text-left">From</th>

            <th className="p-4 text-left">To</th>

            <th className="p-4 text-left">Days</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr
              key={leave.id}
              className="border-t"
            >

              <td className="p-4">
                {leave.leaveType}
              </td>

              <td className="p-4">
                {leave.fromDate}
              </td>

              <td className="p-4">
                {leave.toDate}
              </td>

              <td className="p-4">
                {leave.days}
              </td>

              <td className="p-4">

                <StatusBadge
                  status={leave.status}
                />

              </td>

              <td className="p-4">

                {leave.status === "PENDING" && (

                  <button
                    onClick={() =>
                      cancelLeave(leave.id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeaveHistoryTable;