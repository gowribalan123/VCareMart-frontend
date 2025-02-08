import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteSeller = () => {
    const { isSellerAuth, userData } = useSelector((state) => state.user);
     console.log("isSellerAuth=====", isSellerAuth);
    // // loading

    const isSellerAUth = true;

    const navigate = useNavigate();

     useEffect(() => {
    if (!isSellerAuth) {
       navigate("/login");
       return;
    }
     }, []);

    return <Outlet />;
};