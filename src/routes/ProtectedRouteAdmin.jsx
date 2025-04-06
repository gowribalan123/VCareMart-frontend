import React, { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearAdmin } from "../redux/features/adminSlice";

export const ProtectedRouteAdmin = () => {
 
     
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
   
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Check if the admin is authenticated
        const isAdminAuth = admin.isAdminAuth; // Ensure you get the auth state here
        if (!isAdminAuth) {
           dispatch(clearAdmin()); // Correctly dispatch the clearUser action
            navigate("/Admin_Login"); // Redirect to login if not authenticated
        }
    }, [admin.isAdminAuth, navigate, dispatch]); // Dependencies

    // Render child routes if authenticated
     // {isAdminAuth ?<Outlet/> : null} 
    return admin.isAdminAuth ?<Outlet />:null // Only render Outlet if authenticated
};
