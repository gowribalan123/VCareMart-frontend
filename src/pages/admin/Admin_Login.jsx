import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { saveAdmin,clearAdmin } from "../../redux/features/adminSlice";

export const Admin_Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

   {/** const admin = {
        role  :  "admin"    ,
        login_api :  "/admin/login"  ,
        profile_route :  "/admin/profile" ,
        home_route :  "/admin/home",
        signup_route :  "/admin/signup" ,
    }; */}

    const onSubmit = async (data) => {
        try {
             
            const response = await axiosInstance.post("/admin/login",data,{  
               // credentials : 'include',
              headers: {
                   'Content-Type': 'application/json',
            },
             withCredentials: true, // Include credentials if necessary
             //body : JSON.stringify(data)
             });
            
            dispatch(saveAdmin(response?.data?.data));
            toast.success("Log-in success");
            navigate("/admin/Admin_profile");
            navigate(location.state?.from || "/admin/Admin_profile");
           // navigate(admin.profile_route);
             //Redirect to the previous location or default to home
            //const from = location.state?.from || "/";
             //navigate(from);
        } catch (error) {
            dispatch(clearAdmin());
            const errorMessage = error.response?.data?.message || "Log-in failed. Please try again.";
        toast.error(errorMessage);
        console.error(error);
        }
    };

    return (
        <div className="relative flex flex-col rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse shadow-lg rounded-lg p-8">
                <div className="text-center mb-6:text-left mb-8">
                    <h1 className="text-5xl font-bold text-blue-600">Login now! {role}</h1>
                </div>
                <div className="w-full max-w-sm">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Email"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                            className="input input-bordered"
                            required
                        />
                                  
                                            {/* Radio Buttons for User Role  
                                            <div className="flex flex-col gap-2">
                                                <label className="label">Select Role:</label>
                                            {/*     <div>
                                                    <label className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="user"
                                                            {...register("role", { required: true })}
                                                            className="mr-2"
                                                        />
                                                        User
                                                    </label>
                                                </div>
                                               
                                                <div>
                                                    <label className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="seller"
                                                            {...register("role", { required: true })}
                                                            className="mr-2"
                                                        />
                                                        Seller
                                                    </label>
                                                </div>
                                                {/**
                                                <div>
                                                    <label className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            value="admin"
                                                            {...register("role", { required: true })}
                                                            className="mr-2"
                                                        />
                                                        Admin
                                                    </label>
                                                </div>

                                                 
                                            </div>
                        
                        

                        
                        <label className="label">
                            <Link to="/Admin_SignUp" className="text-sm text-blue-500 underline">
                                New Admin?
                            </Link>
                        </label>
                        */}
                        <Button type="submit" className="btn btn-primary mt-4">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};