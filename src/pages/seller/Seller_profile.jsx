import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
 
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


export const Seller_profile = () => {
      const [refreshState, setRefreshState] = useState(false);
    const [profileData, isLoading, error] = useFetch("/seller/profile",{  headers: { 
       //  Authorization: `Bearer ${token}`,
        //'Access-Control-Allow-Credentials':true,
          //   'Content-Type': 'application/json',
        },
        withCredentials:true}
        ,refreshState);
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const navigate = useNavigate(); // Initialize navigate
 
    const handleLogOut = async () => {
        try {
            await axiosInstance.get('/seller/logout', {
                headers: { 
                //    Authorization: `Bearer ${token}`,
          
                     'Content-Type': 'application/json',
                },
                withCredentials:true,
            });
            navigate('/Seller_Login'); // Redirect to login page after logout
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }
//    const formattedDob = profileData?.dob ? format(new Date(profileData.dob), 'MMMM dd, yyyy') : 'N/A';

    return (
        <div className="container mx-auto p-5">
            <section className="flex justify-center gap-10 mb-4">
             
                 
                <button 
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </section>

            <section>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
                    <div className="flex flex-col items-center mb-6">
                        
                        <h2 className="text-xl font-semibold mt-2">Name: {profileData?.name}</h2>
                        <p className="text-gray-600">Email: {profileData?.email}</p>
                         
                       
                         
                    </div>
                    
                </div>
            </section>
        </div>
    );
};
