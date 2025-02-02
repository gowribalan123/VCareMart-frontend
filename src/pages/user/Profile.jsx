import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom"; 

export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");
    const [showOrders, setShowOrders] = useState(false);

    return (
        <div>
            <h2>Profile page</h2>

            <button onClick={() => setShowOrders(!showOrders)} className="btn btn-secondary">
                Orders
            </button>
            {showOrders && <Orders/>}
        </div>
    );
};