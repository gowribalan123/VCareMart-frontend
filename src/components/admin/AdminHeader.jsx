import React ,{useState,useEffect} from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminHeader = () => {
   
       const navigate = useNavigate();
      
         const [adminDetails, setAdminDetails] = useState(null);
           const [isLoading, setIsLoading] = useState(true);
           const [error, setError] = useState(null);
       
           useEffect(() => {
               const fetchAdminDetails = async () => {
                   try {
                       const response = await axiosInstance.get("/user/profile", {
                          //withCredentials: true,
                       });
                       setAdminDetails(response.data);
                   } catch (err) {
                       console.error("Error fetching admin details:", err);
                       setError(err.message);
                   } finally {
                       setIsLoading(false);
                   }
               };
               fetchAdminDetails();
           }, []);
       

    return (
        <div className="flex justify-between items-center w-full p-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg">
            <Link to="/admin/Admin_profile" className="flex items-center">
                <div className="text-4xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">VCare</div>
            </Link>
            <Link to="/admin/Admin_profile" className="text-xl font-bold text-blue-600 dark:text-white">
                Welcome {isLoading ? <span className="loader" /> : error ? "Admin" : adminDetails?.name || "Admin"}
            </Link>
            
            <nav className="flex gap-8 items-center font-semibold text-gray-800 dark:text-gray-400">

                <Link to="/admin/Admin_profile" className="hover:text-blue-500 transition duration-300">View Profile</Link>
                <Link to="/admin/Home" className="hover:text-blue-500 transition duration-300">Home</Link>
                <Link to="/admin/category" className="hover:text-blue-500 transition duration-300">View Category</Link>
 
                <Link to="/admin/subcategory" className="hover:text-blue-500 transition duration-300">View SubCategory</Link>
               
                <Link to="/admin/products" className="hover:text-blue-500 transition duration-300">View Products</Link>
              
                <Link to="/admin/sellers" className="hover:text-blue-500 transition duration-300">View Sellers</Link>
                <Link to="/admin/users" className="hover:text-blue-500 transition duration-300">View Users</Link>
                <Link to="/admin/create-category" className="hover:text-blue-500 transition duration-300">Add Category</Link>
 
                <Link to="/admin/create-subcategory" className="hover:text-blue-500 transition duration-300">Add SubCategory</Link>
             
     
            </nav>
        </div>
    );
};
