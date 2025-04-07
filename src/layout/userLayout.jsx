import React, { useEffect, useState } from "react";

import { Footer } from "../components/user/Footer";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { Header } from "../components/user/Header";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch} from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
    const { isUserAuth ,userData} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
   
       // Retrieve the token from local storage or your authentication logic
    //const token = localStorage.getItem('authToken'); 
    


    const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  
  
    const checkUser = async () => {
        try {
            const response = await axiosInstance.get("/user/check-user",
             {headers: { 
                //Authorization: `Bearer ${token}`,
           Authorization: `Bearer ${
                getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
              }`,
                 'Content-Type': 'application/json',
              Accept: "application/json",
                 
           },


               // body: JSON.stringify({ status }),
                withCredentials:true,
                //  credentials: "include"
          }



            );
            dispatch(saveUser(response.data));
        } catch (error) {
            dispatch(clearUser());
            console.error("Error checking user authentication:", error.response ? error.response.data : error.message);
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
            {isUserAuth ? <UserHeader/> : <Header/>} 
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
