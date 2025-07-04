import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";

export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
        role: "user",
        loginAPI: "/user/login",
        profileRoute: "/user/profile",
        signupRoute: "/signup",
    };
    if (role === "seller" || role === "admin") {
        // Prevent login for roles other than user
        toast.error("Only users can log in.");
        return null; // or navigate to an appropriate page
    }
  

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(`/user/login?role=${user.role}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response?.data?.role !== "user") {
                            toast.error("Login failed: Not a user");
                            return;
                        }
            
            localStorage.setItem("token", response?.data?.token);
            dispatch(saveUser(response?.data?.data));

            toast.success("Log-in success");
            const from = location.state?.from || user.profileRoute;
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
                    <h1 className="text-5xl font-bold text-blue-600">Login now! {user.role}</h1>
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
                        <label className="label">
                            <Link to={user.signupRoute} className="text-sm text-blue-500 underline">
                                New User?
                            </Link>
<br />
                            <Link to="/forgot-password" className="text-sm text-blue-500 underline">
                                Forgot Password?
                            </Link>
                      
                        </label>
                       
                           
                        <Button type="submit" className="btn btn-primary mt-4">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
