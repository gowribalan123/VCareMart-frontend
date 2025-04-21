import React, { useEffect, useState } from "react";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
//import { UserHeader } from "../components/user/UserHeader";
import { Header } from "../components/user/Header";
import { SellerHeader } from "../components/seller/SellerHeader"; // Import SellerHeader if needed
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const SellerLayout = () => {
    const { isUserAuth, data: user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
   
       const checkUser = async () => {
           try {
               const response = await axiosInstance.get("/user/check-user");
               dispatch(saveUser(response.data.user)); // Save user data
           } catch (error) {
               dispatch(clearUser());
               console.error("Error checking user:", error);
           } finally {
               setLoading(false); // Set loading to false after checking
           }
       };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            {isUserAuth?<SellerHeader/>:<Header/>} 
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};