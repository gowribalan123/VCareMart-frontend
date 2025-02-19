import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Checkbox } from "@material-tailwind/react";

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
     
    const [loading, setLoading] = React.useState(false);
    
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance({
                method: "PUT",
                url: "/signup",
                data: data,
            });
            navigate("/user/profile");
        } catch (error) {
            console.log(error);
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
                        {...register("confirmPassword", { 
                            required: "Please confirm your password",
                            validate: (value) => value === watch('password') || "Passwords do not match"
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    {/* Shipping Address Fields */}
                    <h5 className="text-lg font-semibold mt-6">Shipping Address</h5>
                    <Input
                        label="Street Address"
                        {...register("shippingAddress.street", { required: "Street address is required" })}
                        error={!!errors.shippingAddress?.street}
                        helperText={errors.shippingAddress?.street?.message}
                    />
                    <Input
                        label="City"
                        {...register("shippingAddress.city", { required: "City is required" })}
                        error={!!errors.shippingAddress?.city}
                        helperText={errors.shippingAddress?.city?.message}
                    />
                    <Input
                        label="State"
                        {...register("shippingAddress.state", { required: "State is required" })}
                        error={!!errors.shippingAddress?.state}
                        helperText={errors.shippingAddress?.state?.message}
                    />
                    <Input
                        label="Postal Code"
                        {...register("shippingAddress.postalCode", { required: "Postal code is required" })}
                        error={!!errors.shippingAddress?.postalCode}
                        helperText={errors.shippingAddress?.postalCode?.message}
                    />
                    {/* Billing Address Fields */}
                    <h5 className="text-lg font-semibold mt-6">Billing Address</h5>
                    <Input
                        label="Street Address"
                        {...register("billingAddress.street", { required: "Street address is required" })}
                        error={!!errors.billingAddress?.street}
                        helperText={errors.billingAddress?.street?.message}
                    />
                    <Input
                        label="City"
                        {...register("billingAddress.city", { required: "City is required" })}
                        error={!!errors.billingAddress?.city}
                        helperText={errors.billingAddress?.city?.message}
                    />
                    <Input
                        label="State"
                        {...register("billingAddress.state", { required: "State is required" })}
                        error={!!errors.billingAddress?.state}
                        helperText={errors.billingAddress?.state?.message}
                    />
                    <Input
                        label="Postal Code"
                        {...register("billingAddress.postalCode", { required: "Postal code is required" })}
                        error={!!errors.billingAddress?.postalCode}
                        helperText={errors.billingAddress?.postalCode?.message}
                    />
                </div>
                <div className="flex items-center mt-4">
                    <Checkbox
                        id="remember-me"
                        {...register("remember")}
                        label="Remember Me"
                        className="mr-2"
                    />
                </div>
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
            </form>
        </div>
    );
};
