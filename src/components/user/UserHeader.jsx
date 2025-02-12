import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const UserHeader = ({ user }) => {
    return (
        <div className="flex justify-between items-center w-full px-20 h-15 shadow-2xl">
         {/*   <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/user/cart"}>My Cart</Link>
                <Link to={"/user/orders"}>My Orders</Link>
                <Link to={"/user/profile"}>My Profile</Link>
            </nav>
            */}


            <Link to="/" className="text-xl font-bold text-blue-600">
                Welcome, {user || "User"} {/* Display user's name */}
            </Link>
            
            <div className="flex items-center gap-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/product"}>Products</Link>
            <Link to={"/user/orders"}>My Orders</Link>
                <Link to={'/user/cart'} className="relative">
                    <ShoppingBag />
                    {/* Optional: Add cart item count */}
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                         {/* Replace with dynamic item count */}
                    </span>
                </Link>
                <Link to={"/user/profile"}>
                    <CircleUser />
                </Link>
               
            </div>
        </div>
    );
};
