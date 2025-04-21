import React, { useEffect, useState } from "react";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation,useNavigate  } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/user/Header";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
//import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const AdminLayout = () => {
   //const {isAdminAuth }= useSelector((state) =>  state.admin );
   //const admin = useSelector((state) => state.admin) || { isAdminAuth: false };
     
    // const admin = useSelector((state) => state.admin) ;

    const {isUserAuth }= useSelector((state) =>  state.user );

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const response = await axiosInstance.get("/user/check-user", {
                headers: { 
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                },
                withCredentials: true,
            });

            console.log(response, "========checkAdmin response");
            dispatch(saveUser(response.data));
        } catch (error) {
            dispatch(clearUser());
            console.error("Error checking admin authentication:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // Set loading to false after the check
        }
    };
    
    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking admin
    }
 
    return (
        <div>
             
           
             {isUserAuth?< AdminHeader/>:<Header/>} 
           
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
