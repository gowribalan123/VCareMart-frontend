import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom"; 
import { EditProfileForm } from "../../components/user/EditProfileForm";
import { format } from 'date-fns';

export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/user/logout");
            navigate("/"); 
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><div className="loader">Loading...</div></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error.message || "Something went wrong!"}</div>;
    }

    const formattedDob = profileData?.dob ? format(new Date(profileData.dob), 'MMMM dd, yyyy') : 'N/A';

    return (
        <div>
        <section className="flex justify-center gap-10 mb-4">
    <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
        Orders
    </button>
    <button 
        className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300" 
        onClick={() => setIsProfileEdit(!isProfileEdit)}
    >
        {isProfileEdit ? "Cancel Edit" : "Edit Profile"}
    </button>
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
                        <img 
                            src={profileData?.profilepic || "placeholder-image-url.jpg"} 
                            className="w-40 h-40 rounded-full border-4 border-gray-300" 
                            alt="Profile" 
                        />
                        <h2 className="text-xl font-semibold mt-2">Name: {profileData?.name}</h2>
                        <p className="text-gray-600">Email: {profileData?.email}</p>
                    {/*   <p className="text-gray-600">Mobile: {profileData?.phone}</p>
                        <p className="text-gray-600">Date of Birth: {formattedDob}</p>
                        <p className="text-gray-600">Address: {profileData?.shippingaddress}</p>*/}  
                    </div>
                    {isProfileEdit && <EditProfileForm profileData={profileData} />}
                </div>
            </section>
        </div>
    );
};
