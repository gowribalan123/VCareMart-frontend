import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useFetch } from "../../hooks/useFetch";
export const AdminHeader = () => {
    const navigate = useNavigate();
    const [adminDetails, isLoading, error] = useFetch("/admin/profile");

    return (
        <div className="flex justify-between items-center w-full px-10 h-24 bg-gray-800 shadow-lg border-b border-gray-700">
            <Link to="/" className="flex items-center">
                <div className="text-4xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">VCare</div>
            </Link>
             <Link to="/" className="text-xl font-bold text-blue-600">
                            Welcome {isLoading ? <span className="loader" /> : error ? "Admin" : adminDetails?.name || "Admin"}
                        </Link>
            
            <nav className="flex gap-8 items-center font-semibold text-gray-300">
                <Link to="/admin/home" className="hover:text-blue-500 transition duration-300">Home</Link>
                <Link to="/admin/about" className="hover:text-blue-500 transition duration-300">About</Link>
                <Link to="/admin/create-category" className="hover:text-blue-500 transition duration-300">Create Category</Link>
                <Link to="/admin/category" className="hover:text-blue-500 transition duration-300">View Category</Link>
                <Link to="/admin/create-subcategpory" className="hover:text-blue-500 transition duration-300">create SubCategory</Link>
                <Link to="/admin/sub category" className="hover:text-blue-500 transition duration-300">View SubCategory</Link>
                <Link to="/admin/sellers" className="hover:text-blue-500 transition duration-300">View Sellers</Link>
                <Link to="/admin/users" className="hover:text-blue-500 transition duration-300">View Users</Link>
                <Link to="/admin/Admin_profile" className="hover:text-blue-500 transition duration-300">View Profile</Link>
            </nav>
            
            
            
         
        </div>
    );
};
