import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isUserAuth } = useSelector((state) => state.user); // Access authentication state from Redux
     console.log("isuserAuth=====", isUserAuth);
    const navigate = useNavigate(); // Hook for navigation

   // useEffect(() => {
        // Check if the user is authenticated
        if (!isUserAuth) {
            navigate("/login"); // Redirect to login if not authenticated
       return;
     }
     // Dependencies include isUserAuth and navigate

    // If the user is not authenticated, the Outlet won't render
    return <Outlet /> ;// Render child routes if authenticated
};