import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

import Card from "../../components/ui/Card";
import { getDashboard } from "../../services/adminService";
import AdminLayout from "../../layouts/AdminLayout";

function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await getDashboard();

      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Employees",
      value: stats.employees,
      color: "text-blue-600",
      bg: "bg-blue-100",
      icon: Users,
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaves,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: Clock3,
    },
    {
      title: "Approved Leaves",
      value: stats.approvedLeaves,
      color: "text-green-600",
      bg: "bg-green-100",
      icon: CircleCheckBig,
    },
    {
      title: "Rejected Leaves",
      value: stats.rejectedLeaves,
      color: "text-red-600",
      bg: "bg-red-100",
      icon: CircleX,
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your leave management system.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`p-4 rounded-full ${card.bg}`}
                >
                  <Icon
                    className={`${card.color}`}
                    size={30}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Manage Employees
          </button>

          <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Leave Requests
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;