import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export const SellerHeader = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex justify-between items-center w-full px-10 h-24 bg-gray-800 shadow-lg border-b border-gray-700">
            <Link to="/" className="flex items-center">
                <div className="text-4xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">VCare</div>
            </Link>
            
            <nav className="flex gap-8 items-center font-semibold text-gray-300">
                <Link to="/seller/home" className="hover:text-blue-500 transition duration-300">Home</Link>
                <Link to="/seller/about" className="hover:text-blue-500 transition duration-300">About</Link>
                <Link to="/seller/create-product" className="hover:text-blue-500 transition duration-300">Create Products</Link>
                <Link to="/seller/view-product" className="hover:text-blue-500 transition duration-300">View Products</Link>
            </nav>
            
            <div className="flex items-center gap-6">
                <Button className="btn btn-ghost btn-circle hover:bg-gray-700 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </Button>
            {/*   <Button className="btn btn-ghost btn-circle hover:bg-gray-700 transition duration-300" onClick={() => navigate('/seller/notifications')}>
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Button> */} 
                <div className="flex items-center gap-4">
                    <DarkMode />
 
                    <Link to="/seller/profile" className="hover:text-blue-500 transition duration-300">
                        <CircleUser className="h-6 w-6 text-gray-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
