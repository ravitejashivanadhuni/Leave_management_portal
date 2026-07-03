import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;