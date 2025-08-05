import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
// Import other pages as they are created
import Students from "./pages/Students";
import Disciplines from "./pages/Disciplines";
import Enrollments from "./pages/Enrollments";

export default function RoutesApp() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/disciplines" element={<Disciplines />} />
                    <Route path="/enrollments" element={<Enrollments />} />
                </Route>
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}
