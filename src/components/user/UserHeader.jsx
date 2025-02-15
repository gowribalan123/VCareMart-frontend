import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";

export const UserHeader = () => {
    const cartItemCount = useSelector(state => state.cart.itemCount);
    
    const [userDetails, isLoading, error] = useFetch(`/user/profile/`);

    return (
        <div className="flex justify-between items-center w-full px-20 h-15 shadow-2xl">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Welcome {isLoading ? <span className="loader" /> : error ? "User" : userDetails?.name || "User"}
            </Link>
            
            <div className="flex items-center gap-4">
                <Link to={"/"} aria-label="Home">Home</Link>
                <Link to={"/product"} aria-label="Products">Products</Link>
                <Link to={"/orders"} aria-label="My Orders">My Orders</Link>
                <Link to={'/user/cart'} className="relative" aria-label="View Cart">
                    <ShoppingBag />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                        {cartItemCount || 0}
                    </span>
                </Link>
                <Link to={"/user/profile"} aria-label="View Profile">
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};
