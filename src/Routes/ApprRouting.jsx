import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../Homepage";
import Login from "../login/Login";
import ProtectedRoute from "./../login/ProtectedRoute";
import SignUp from "../login/SignUp";

const AppRouting = () => {
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Homepage />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouting;