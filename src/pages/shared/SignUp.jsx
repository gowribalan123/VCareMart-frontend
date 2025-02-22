import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Checkbox } from "@material-tailwind/react";

export const SignUp = ({role='user'}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/user/signup", data);
            
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h4 className="block text-3xl font-bold text-slate-800 text-center mb-2">Sign Up</h4>
            <p className="text-slate-500 font-light text-center mb-6">
                Nice to meet you! Enter your details to register.
            </p>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        {...register("confirmpassword", { 
                            required: "Please confirm your password",
                            validate: (value) => value === watch('password') || "Passwords do not match"
                        })}
                        error={!!errors.confirmpassword}
                        helperText={errors.confirmpassword?.message}
                    />
  {/* Role Selection 
  <div className="flex flex-col mt-4">
                        <label className="font-semibold">Select Role:</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                value="seller"
                                {...register("role", { required: "Role is required" })}
                                className="mr-2"
                            />
                            <label className="mr-4">Seller</label>
                            <input
                                type="radio"
                                value="admin"
                                {...register("role", { required: "Role is required" })}
                                className="mr-2"
                            />
                            <label>Admin</label>
                        </div>
                        {errors.role && <span className="text-red-500">{errors.role.message}</span>}
                    </div>

                  */}
                    <Button
                        type="submit"
                        className={`mt-4 w-full ${loading ? 'bg-gray-400' : 'bg-slate-800 hover:bg-slate-700'} text-white`}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <p className="flex justify-center mt-6 text-sm text-slate-600">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-sm font-semibold text-slate-700 underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
