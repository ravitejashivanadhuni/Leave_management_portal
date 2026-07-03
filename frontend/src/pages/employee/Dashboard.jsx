import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import DashboardCards from "../../components/employee/DashboardCards";

import api from "../../services/api";

function Dashboard() {

    const [stats, setStats] = useState({

        pending:0,

        approved:0,

        rejected:0,

        cancelled:0,

        totalLeaves:0

    });

    useEffect(()=>{

        fetchDashboard();

    },[]);

    async function fetchDashboard(){

        try{

            const res = await api.get(
                "/employee/dashboard"
            );

            setStats(
                res.data.data
            );

        }

        catch(err){

            console.log(err);

        }

    }

    return(

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Employee Dashboard

            </h1>

            <DashboardCards
                stats={stats}
            />

        </DashboardLayout>

    );

}

export default Dashboard;