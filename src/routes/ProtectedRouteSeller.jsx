import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearSeller } from "../redux/features/sellerSlice";

export const ProtectedRouteSeller = () => {
    const dispatch = useDispatch();
 const seller= useSelector((state) => state.seller)  ;
    
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Check if the seller is authenticated
        const isSellerAuth = seller.isSellerAuth; // Ensure you get the auth state here
        if (!isSellerAuth) {
           dispatch(clearSeller()); // Correctly dispatch the clearUser action
            navigate("/Seller_Login"); // Redirect to login if not authenticated
        }
    }, [seller.isSellerAuth, navigate, dispatch]); // Dependencies

    // Render child routes if authenticated
    return seller.isSellerAuth ? <Outlet /> : null; // Only render Outlet if authenticated
};
