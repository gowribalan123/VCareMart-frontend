import React, { useEffect, useState } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
    const { isUserAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const response = await axiosInstance.get("/user/check-user", {  
                headers: {
                     'Content-Type': 'application/json',
                 },
                 withCredentials: true,
            });
            dispatch(saveUser(response.data));
        } catch (error) {
            dispatch(clearUser());
            console.error("Error checking user authentication:", error);
        } finally {
            setLoading(false); // Set loading to false after the check
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking user
    }

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
