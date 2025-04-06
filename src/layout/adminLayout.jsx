import React, { useEffect, useState } from "react";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation,useNavigate  } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/admin/Header";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";

export const AdminLayout = () => {
   const {isAdminAuth }= useSelector((state) =>  state.admin );
   //const admin = useSelector((state) => state.admin) || { isAdminAuth: false };
     
    // const admin = useSelector((state) => state.admin) ;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const checkAdmin = async () => {
        try {
            const response = await axiosInstance.get("/admin/check-admin", {
                headers: { 
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                },
                withCredentials: true,
            });

            console.log(response, "========checkAdmin response");
            dispatch(saveAdmin(response.data));
        } catch (error) {
            dispatch(clearAdmin());
            console.error("Error checking admin authentication:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // Set loading to false after the check
        }
    };
    
    useEffect(() => {
        checkAdmin();
    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking admin
    }
 
    return (
        <div>
             
           
             {isAdminAuth?<AdminHeader/>:<Header/>} 
           
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
