import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
//import { saveAdmin,clearAdmin } from "../../redux/features/adminSlice";
import { saveUser,clearUser } from "../../redux/features/userSlice";


export const Admin_Login = ({ role }) => {
   
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = {
        role: "admin",
        loginAPI: "/user/login",
        profileRoute: "/user/profile",
        signupRoute: "/user/signup",
    };


    const onSubmit = async (data,role) => {
        try {    
          const response = await axiosInstance.post(`/user/login?role=${user.role}`,data,role
            
               ,{   
             //   credentials : 'include',
             headers: {
                  'Content-Type': 'application/json',
           },
             withCredentials: true, // Include credentials if necessary
            // body : JSON.stringify(data)
             }
           
             );
             if (response?.data?.role !== "admin") {
                toast.error("Login failed: Not an admin");
                return;
            }

              
             localStorage.setItem("token", response?.data?.token);
            dispatch(saveUser(response?.data?.data));
         
            toast.success("Log-in success");
            //navigate(user.profile_route);
             //Redirect to the previous location or default to home
            const from = location.state?.from || "/admin/Admin_profile";
             navigate(from);
        } catch (error) {
            dispatch(clearUser());
            toast.error(error.response?.data?.message || "Log-in failed");
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