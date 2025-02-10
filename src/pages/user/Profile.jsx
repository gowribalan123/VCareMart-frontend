import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");
    const navigate = useNavigate(); // Initialize navigate

    const handleLogOut = async () => {
        try {
            await axiosInstance({
                method: "GET",
                url: "/user/logout",
            });
            navigate("/"); // Navigate to home page after logout
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>; // Error state
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
            <div className="flex flex-col items-center mb-6">
                <img 
                    src={profileData?.profilepic} 
                    className="w-40 h-40 rounded-full border-4 border-gray-300" 
                    alt="Profile" 
                />
                <h2 className="text-xl font-semibold mt-2">{profileData?.name}</h2>
                <p className="text-gray-600">{profileData?.email}</p>
                <p className="text-gray-600">{profileData?.phone}</p>
            </div>
            <section className="flex justify-around">
                <button className="btn btn-primary hover:bg-blue-700 transition duration-200 ease-in-out">
                    Orders
                </button>
                <button className="btn btn-secondary hover:bg-gray-700 transition duration-200 ease-in-out">
                    Edit Profile
                </button>
                <button 
                    className="btn btn-accent bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </section>
        </div>
    );
};
