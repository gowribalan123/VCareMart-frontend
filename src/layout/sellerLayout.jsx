import React, { useEffect, useState } from "react";

import { Footer } from "../components/user/Footer";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import { SellerHeader } from "../components/seller/SellerHeader";
import { Header } from "../components/seller/Header";
 
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch} from "react-redux";
import { clearSeller, saveSeller} from "../redux/features/sellerSlice";
import toast from "react-hot-toast";

export const SellerLayout = () => {
//const  { isSellerAuth ,sellerData} = useSelector((state) => state.seller);
const { isSellerAuth } = useSelector((state) => state.seller ) ;
  
   const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

   //const getTokenFromLocalStorage = localStorage.getItem("seller")
    //? JSON.parse(localStorage.getItem("seller"))
    //: null;
  
  
   const checkSeller = async () => {
 //const token = localStorage.getItem("seller"); // Assuming you store the token in local storage
    try {
        const response = await axiosInstance.get("/seller/check-seller", {
            headers: {
             //  Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
               // 'Accept': "application/json",
            },  withCredentials:true,
        });
        dispatch(saveSeller(response.data));
    } catch (error) {
       dispatch(clearSeller());
        const errorMessage = error.response ? error.response.data.message : "Error checking authentication";
        toast.error(errorMessage);
       console.error("Error checking seller authentication:", errorMessage);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        checkSeller();
    }, [location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking seller
    }

    return (
        <div>
            {isSellerAuth ? <SellerHeader /> : <Header/>} 
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
