import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { CartCards } from "../../components/user/Cards";

import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js"; // Uncommented to use Stripe

export const Cart = () => {
    const { userId } = useParams();
    
    
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart/${userId}");

    
    

    const handleRemoveProduct = async (productId) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { productId },
            });
            toast.success("Product removed successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove product");
        }
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartDetails?.products },
            });

            const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId, // Ensure this line is uncommented
            });

            if (result.error) {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (error) {
        return <div className="text-red-500 text-lg">{error}</div>; // Display error message
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div>
                {cartDetails?.products?.map((value) => (
                    <CartCards item={value} key={value._id} handleRemove={handleRemoveProduct} />
                ))}
            </div>
            {cartDetails?.products?.length ? (
                <div className="w-full md:w-6/12 bg-base-300 flex flex-col items-center gap-5 p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Price Summary</h2>
                    <h2 className="text-lg">Total Price: ₹{cartDetails?.totalPrice?.toFixed(2)}</h2>
                    <button 
                        className="btn btn-success w-full mt-4" 
                        onClick={makePayment}
                    >
                        Checkout
                    </button>
                </div>
            ) : (
                <h1 className="text-lg font-semibold">Your cart is empty</h1>
            )}
        </div>
    );
};
