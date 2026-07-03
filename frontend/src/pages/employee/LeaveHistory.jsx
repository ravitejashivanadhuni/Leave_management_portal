import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import LeaveHistoryTable from "../../components/employee/LeaveHistoryTable";

import api from "../../services/api";

function LeaveHistory() {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {

    fetchLeaves();

  }, []);

  async function fetchLeaves() {

    const res = await api.get(
      "/employee/leaves"
    );

    setLeaves(res.data.data);

  }

  async function cancelLeave(id) {

    try {

      await api.delete(
        `/employee/cancel/${id}`
      );

      fetchLeaves();

    }

    catch (err) {

      console.log(err);

    }

  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">

        Leave History

      </h1>

      <LeaveHistoryTable

        leaves={leaves}

        cancelLeave={cancelLeave}

      />

    </DashboardLayout>

  );

}

export default LeaveHistory;