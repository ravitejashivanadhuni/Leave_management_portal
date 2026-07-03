import DashboardLayout from "../../components/layout/DashboardLayout";
import ApplyLeaveForm from "../../components/employee/ApplyLeaveForm";

function ApplyLeave() {

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Apply Leave

            </h1>

            <ApplyLeaveForm/>

        </DashboardLayout>

    );

}

export default ApplyLeave;