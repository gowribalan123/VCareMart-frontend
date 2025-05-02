import React,{useState,useEffect} from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
export const SellerHeader = () => {

    const navigate = useNavigate();
   
      const [sellerDetails, setSellerDetails] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchSellerDetails = async () => {
                try {
                    const response = await axiosInstance.get("/user/profile", {
                       //withCredentials: true,
                    });
                    setSellerDetails(response.data);
                } catch (err) {
                    console.error("Error fetching seller details:", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSellerDetails();
        }, []);
    
    return (
        <div className="flex justify-between items-center w-full px-10 h-24 bg-gray-800 shadow-lg border-b border-gray-700">
            <Link to="/seller/Seller_profile" className="flex items-center">
                <div className="text-4xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">VCare</div>
            </Link>
             <Link to="/seller/Seller_profile" className="text-xl font-bold text-blue-600">
                            Welcome {isLoading ? <span className="loader" /> : error ? "Seller" : sellerDetails?.name || "Seller"}
                        </Link>
            
            <nav className="flex gap-8 items-center font-semibold text-gray-300">
             
                 <Link to="/seller/create-product" className="hover:text-blue-500 transition duration-300">Create Products</Link>
                 <Link to="/seller/products" className="hover:text-blue-500 transition duration-300">View Products</Link>
                 <Link to="/seller/Seller_profile" className="hover:text-blue-500 transition duration-300">View Profile</Link>
            </nav>
            
            
            
         
        </div>
    );
};
