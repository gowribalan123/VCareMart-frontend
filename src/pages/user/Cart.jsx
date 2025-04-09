import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CartCards1 } from "../../components/user/Cards";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Typography } from "@material-tailwind/react"; // Import Material Tailwind components

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartDetails?.products },
            });

            console.log(session, "=======session");
            const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveCartItem = async (productId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { productId },
            });
            toast.success("Product removed");
            setRefreshState((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to remove");
        }
    };

    return (
        <div className="p-4">
            <section>
                <Typography variant="h4" className="text-center mb-4">Cart Page</Typography>
            </section>
            <section className="flex">
                <div className="w-6/12">
                    <Typography variant="h5" className="mb-4">Items in Cart</Typography>
                    {cartDetails?.products?.map((value) => (
                        <CartCards1 item={value} key={value?._id} handleRemove={handleRemoveCartItem} />
                    ))}
                </div>
                <div className="w-6/12 px-20 py-20">
                    {cartDetails?.products?.map((value) => (
                        <Card key={value?._id} className="mb-4 p-4">
                            <Typography>Price: ₹{value?.productId?.price}</Typography>
                        </Card>
                    ))}
                    <Typography variant="h6">Total Price: ₹{cartDetails?.totalPrice}</Typography>
                    <Button className="mt-20" onClick={makePayment} color="green">Make Payment</Button>
                </div>
            </section>
        </div>
    );
};
