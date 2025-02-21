import React, { useEffect } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { CreateProductForm } from "../components/seller/CreateProductForm";
import { EditProfileForm } from "../components/user/EditProfileForm";

export const UserLayout = () => {
    const { isUserAuth ,userData} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const checkUser = async () => {
        try {
            const response = await axiosInstance.get("/user/check-user", {
                   });
           dispatch(saveUser()); // Save user data from response
        } catch (error) {
         dispatch(clearUser());
            console.error("Error checking user authentication:", error);
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]); // Check user on every route change

    return (
        <div>
            
         {isUserAuth ? <UserHeader /> : <Header />} 
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};