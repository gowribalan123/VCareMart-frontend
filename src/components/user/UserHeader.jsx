import React from "react";
import { CircleUser } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
  
//import { DarkMode } from "../shared/DarkMode";

export const UserHeader = () => {
    return (
        <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            
           <Link to="/" className="flex items-center">
                <img
                    src="./logo1.png"
                    width="40"
                    height="50"
                    alt="Logo"
                    className="mr-2"
                />
                <div className="text-3xl font-bold text-blue-600">VCare</div>
            </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/category"}>Categories</Link>
                <Link to={"/user/cart"}>My Products</Link>

             
                
            </nav>

            <div className="flex gap-14 items-center ">
                   {/* <DarkMode /> */}
                <Link to={'/user/cart'}>
                    <ShoppingBag />
                </Link>
                <Link to={"/user/profile"}>
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};