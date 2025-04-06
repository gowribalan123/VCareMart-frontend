import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearUser } from "../redux/features/userSlice";

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const { isUserAuth} = useSelector((state) => state.user); // Access authentication state from Redux
    
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Check if the user is authenticated
        if (!isUserAuth) {
           dispatch(clearUser()); // Correctly dispatch the clearUser action
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [isUserAuth, navigate, dispatch]); // Dependencies

    // Render child routes if authenticated
    return isUserAuth ? <Outlet /> : null; // Only render Outlet if authenticated
};
