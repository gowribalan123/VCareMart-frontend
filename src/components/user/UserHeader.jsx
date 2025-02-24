import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
//import { itemCount} from "../../redux/features/cartSlice";
export const UserHeader = () => {
    const cartItemCount = useSelector(state => state.cart.itemCount);
    
    const [userDetails, isLoading, error] = useFetch("/user/profile");

    return (
        <div className="flex justify-between items-center w-full p-4 shadow-lg bg-white rounded-lg">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Welcome {isLoading ? <span className="loader" /> : error ? "User" : userDetails?.name || "User"}
            </Link>
            
            <div className="flex items-center gap-6">
                <Link to="/user/Home" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Home</Link>
               <Link to="/user/men" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Men</Link>
                <Link to="/user/women" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Women</Link>
                <Link to="/user/boys" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Boys</Link>
                <Link to="/user/girls" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Girls</Link>
                <Link to="/user/product" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">Products</Link>
               <Link to="/user/order" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300">My Orders</Link>
                
                <Link to="/user/cart" className="relative" aria-label="View Cart">
                    <ShoppingBag className="text-gray-700" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {/**  {cartItemCount || 0} */}   
                    </span>
                </Link>
                
                <Link to="/user/profile" aria-label="View Profile">
                    <CircleUser className="text-gray-700" />
                </Link>
            </div>
        </div>
    );
};
