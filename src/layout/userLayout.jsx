import React, { useEffect, useState  } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";


export const UserLayout = () => {
  
    const { isUserAuth,userData  } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const location = useLocation(); // Use useLocation to get current pathname

    console.log("isUserAuth====", isUserAuth);

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
            });
            dispatch(saveUser())
        } catch (error) {
            dispatch(clearUser())
            console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]); // React to changes in the pathname

    return (
        <div>
                   

            {/* User Header or Regular Header */}
            {isUserAuth ? <UserHeader /> : <Header />}

            <div>
                {/* Main Content Area */}
                <main className="min-h-96">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};
