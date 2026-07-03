import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import RoleProtectedRoute from "../components/layout/RoleProtectedRoute";
import Dashboard from "../pages/Employee/Dashboard";
import LeaveHistory from "../pages/Employee/LeaveHistory";
import ApplyLeave from "../pages/employee/ApplyLeave";
import AdminLayout from "../layouts/AdminLayout";
import LeaveRequests from "../pages/admin/Leaves";
import Employees from "../pages/admin/Employees";
import AdminDashboard from "../pages/admin/Dashboard";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/employee/dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="EMPLOYEE">
                                <Dashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/history"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="EMPLOYEE">
                                <LeaveHistory />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/employee/apply-leave"
    element={
        <ProtectedRoute>
            <RoleProtectedRoute role="EMPLOYEE">
                <ApplyLeave/>
            </RoleProtectedRoute>
        </ProtectedRoute>
    }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute role="ADMIN">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/leaves"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute role="ADMIN">
        <AdminLayout>
          <LeaveRequests />
        </AdminLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/employees"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute role="ADMIN">
        <AdminLayout>
          <Employees />
        </AdminLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>
            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;