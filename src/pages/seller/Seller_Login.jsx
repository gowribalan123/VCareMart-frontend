import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { clearSeller, saveSeller } from "../../redux/features/sellerSlice";

export const Seller_Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

   {/** const seller = {
        role  :  "seller"    ,
        login_api :  "/seller/login"  ,
        profile_route :  "/seller/profile" ,
        home_route :  "/user/home",
        signup_route :  "/seller/signup" ,
    }; */}

    const onSubmit = async (data) => {
        try {
             
            const response = await axiosInstance.post("/seller/login",data,{  
              //  credentials : 'include',
                headers: {
                     'Content-Type': 'application/json',
              },
               withCredentials: true, // Include credentials if necessary
               body : JSON.stringify(data)
               });
            
            dispatch(saveSeller(response?.data?.data));
            toast.success("Log-in success");
            navigate("/seller/Seller_profile");
            navigate(location.state?.from || "/seller/Seller_profile");
           // navigate(seller.profile_route);
             //Redirect to the previous location or default to home
            //const from = location.state?.from || "/";
             //navigate(from);
        } catch (error) {
            dispatch(clearSeller());
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
                                  
                                            {/* Radio Buttons for User Role */}
                                      {/*       <div className="flex flex-col gap-2">
                                                <label className="label">Select Role:</label>
                                              <div>
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
                        
                           */}

                        
                        <label className="label">
                            <Link to="/Seller_SignUp" className="text-sm text-blue-500 underline">
                                New Seller?
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