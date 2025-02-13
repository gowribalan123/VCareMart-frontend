import React , { useEffect }from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isUserAuth, userData  } = useSelector((state) => state.user);// Access authentication state from Redux
    

    const navigate = useNavigate();// Hook for navigation

     // Check if the user is authenticated
    if (!isUserAuth) {
        navigate("/login");// Redirect to login if not authenticated
        return ;// Prevent rendering the Outlet
    }
    // }, []);

    return <Outlet />;// Render child routes if authenticated
};