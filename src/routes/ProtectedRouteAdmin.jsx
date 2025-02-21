import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const { isAdminAuth, userData } = useSelector((state) => state.user);
  
     // // loading
 
     //const isAdminAuth = true;
 
     const navigate = useNavigate();
 
      useEffect(() => {
     if (!isAdminAuth) {
        navigate("/login");
        return;
     }
      }, []);
 
     return <Outlet />;
}
