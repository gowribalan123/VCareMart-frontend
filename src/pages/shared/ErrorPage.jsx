import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = ({ role = "user" }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (role == "user") {
            navigate("/");
            return;
        }
        if(role=='seller'){
            navigate('/seller');
            return;
        }
        if(role=='admin'){
            navigate('/admin');
            return;
        }
        
    };

    return (
        <div className="flex flex-col w-full items-center justify-center h-dvh">
            <h2>404 Page Not Found !</h2>
            <br />
            <button className="btn btn-error" onClick={handleNavigation}>
                Return to Home
            </button>
        </div>
    );
};