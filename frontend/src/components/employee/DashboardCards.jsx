import {
  Clock3,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

function Card({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="text-white" />
      </div>

    </div>
  );
}

export default function DashboardCards({ stats }) {

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      <Card
        title="Pending"
        value={stats.pending}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <Card
        title="Approved"
        value={stats.approved}
        icon={CheckCircle}
        color="bg-green-500"
      />

      <Card
        title="Rejected"
        value={stats.rejected}
        icon={XCircle}
        color="bg-red-500"
      />

      <Card
        title="Total Leaves"
        value={stats.totalLeaves}
        icon={CalendarDays}
        color="bg-blue-500"
      />

    </div>

  );

}