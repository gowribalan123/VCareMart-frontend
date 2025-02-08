import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";

export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");

    const handleLogOut = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/logout",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <section>
                <button className="btn btn-primary">Orders</button>
                <button className="btn btn-secondary">Edit Profile</button>
                <button className="btn btn-accent" onClick={handleLogOut}>Logout</button>
            </section>
            <section>
                <h1>{profileData?.name}</h1>
                <img src={profileData?.profilepic} className="w-40 h-40" alt="profileImage" />
                <h1>{profileData?.email}</h1>
                <h1>{profileData?.phone}</h1>
            </section>
        </div>
    );
};