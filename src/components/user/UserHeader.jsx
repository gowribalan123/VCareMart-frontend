import React, { useState, useEffect } from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux"; // Assuming you're using Redux for auth and cart

export const UserHeader = ({ user }) => {
    const dispatch = useDispatch();
    const cartItemCount = useSelector(state => state.cart.itemCount); // Assuming you have a cart slice
    const [userDetails, isLoading, error] = useFetch(`/user/profile/`);

    return (
        <div className="flex justify-between items-center w-full px-20 h-15 shadow-2xl">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Welcome {isLoading ? "Loading..." : error ? "User" : userDetails?.name || "User"}
            </Link>
            
            <div className="flex items-center gap-4">
                <Link to={"/"}>Home</Link>
                <Link to={"/product"}>Products</Link>
                <Link to={"/user/orders"}>My Orders</Link>
                <Link to={'/user/cart'} className="relative" aria-label="View Cart">
                    <ShoppingBag />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                        {cartItemCount || 0} {/* Display cart item count */}
                    </span>
                </Link>
                <Link to={"/user/profile"} aria-label="View Profile">
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};
