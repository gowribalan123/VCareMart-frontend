import React from "react";
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
        role: role === "seller" ? "seller" : "user",
        login_api: role === "seller" ? "/seller/login" : "/user/login",
        profile_route: role === "seller" ? "/seller/profile" : "/user/profile",
        home_route: "/user/home",
        signup_route: role === "seller" ? "/seller/signup" : "/signup",
    };

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(user.login_api,data,{  
                headers: {
                     'Content-Type': 'application/json',
                 },
                 withCredentials: true, // Include credentials if necessary
             });
            
            dispatch(saveUser(response?.data?.data));
            toast.success("Log-in success");
            navigate(user.profile_route);
             //Redirect to the previous location or default to home
            const from = location.state?.from || "/";
             navigate(from);
        } catch (error) {
            dispatch(clearUser());
            toast.error("Log-in failed");
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
                            <Link to={user.signup_route} className="text-sm text-blue-500 underline">
                                New User?
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