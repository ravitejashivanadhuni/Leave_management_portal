import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CircleCheckBig,
  CircleX,
  ArrowRight,
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
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      icon: Users,
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaves,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: Clock3,
    },
    {
      title: "Approved Leaves",
      value: stats.approvedLeaves,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: CircleCheckBig,
    },
    {
      title: "Rejected Leaves",
      value: stats.rejectedLeaves,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: CircleX,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-80 bg-slate-100 rounded mt-3 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                  <div className="h-7 w-12 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 animate-pulse" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1.5">
          Welcome back! Here's an overview of your leave management system.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="p-6 border border-slate-200 hover:border-slate-300 transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-semibold mt-2 text-slate-900 tracking-tight">
                    {card.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-xl ${card.bg}`}>
                  <Icon className={card.color} size={22} strokeWidth={2} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1">
          Quick Actions
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Jump straight into the tools you use most.
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="group flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Manage Employees
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>

          <button className="group flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200">
            View Leave Requests
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;