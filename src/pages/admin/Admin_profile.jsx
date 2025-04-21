import React, { useState,useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
 
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


export const Admin_profile = () => {
     const [profileData, setProfileData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [isProfileEdit, setIsProfileEdit] = useState(false);
        const navigate = useNavigate();
    
        useEffect(() => {
            const fetchProfileData = async () => {
                try {
                    const response = await axiosInstance.get("/user/profile", {
                        withCredentials: true,
                    });
                    setProfileData(response.data);
                } catch (err) {
                    console.error("Error fetching profile data:", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchProfileData();
        }, []);

  const handleLogOut = async () => {
        try {
            const response = await axiosInstance.get('/user/logout', {
                headers: { 
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/Admin_Login');
            }
        } catch (error) {
            console.error("Logout error:", error);
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
                    {isProfileEdit && <EditProfileForm profileData={profileData} />}

                </div>
            </section>
        </div>
    );
};
