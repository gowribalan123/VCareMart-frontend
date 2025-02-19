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
                method: "POST",
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
                        {...register("confirmpassword", { 
                            required: "Please confirm your password",
                            validate: (value) => value === watch('password') || "Passwords do not match"
                        })}
                        error={!!errors.confirmpassword}
                        helperText={errors.confirmpassword?.message}
                    />
                    {/* Shipping address Fields */}
                    <h5 className="text-lg font-semibold mt-6">Shipping Address</h5>
                    <Input
                        label="Street Address"
                        {...register("shippingaddress.street", { required: "Street address is required" })}
                        error={!!errors.shippingaddress?.street}
                        helperText={errors.shippingaddress?.street?.message}
                    />
                    <Input
                        label="City"
                        {...register("shippingaddress.city", { required: "City is required" })}
                        error={!!errors.shippingaddress?.city}
                        helperText={errors.shippingaddress?.city?.message}
                    />
                    <Input
                        label="State"
                        {...register("shippingaddress.state", { required: "State is required" })}
                        error={!!errors.shippingaddress?.state}
                        helperText={errors.shippingaddress?.state?.message}
                    />
                    <Input
                        label="Postal Code"
                        {...register("shippingaddress.postalcode", { required: "Postal code is required" })}
                        error={!!errors.shippingaddress?.postalcode}
                        helperText={errors.shippingaddress?.postalcode?.message}
                    />
                    {/* Billing address Fields */}
                    <h5 className="text-lg font-semibold mt-6">Billing address</h5>
                    <Input
                        label="Street address"
                        {...register("billingaddress.street", { required: "Street address is required" })}
                        error={!!errors.billingaddress?.street}
                        helperText={errors.billingaddress?.street?.message}
                    />
                    <Input
                        label="City"
                        {...register("billingaddress.city", { required: "City is required" })}
                        error={!!errors.billingaddress?.city}
                        helperText={errors.billingaddress?.city?.message}
                    />
                    <Input
                        label="State"
                        {...register("billingaddress.state", { required: "State is required" })}
                        error={!!errors.billingaddress?.state}
                        helperText={errors.billingaddress?.state?.message}
                    />
                    <Input
                        label="Postal Code"
                        {...register("billingaddress.postalcode", { required: "Postal code is required" })}
                        error={!!errors.billingaddress?.postalcode}
                        helperText={errors.billingaddress?.postalcode?.message}
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
