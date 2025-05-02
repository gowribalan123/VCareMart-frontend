import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CartCards1 } from "../../components/user/Cards";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Typography, Input } from "@material-tailwind/react";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance.post("/payment/create-checkout-session", { 
                products: cartDetails?.products.map(product => ({
                    productId: product.productId,
                    quantity: quantities[product.productId] || product.quantity
                }))
            });
            await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
        }
    };

    const handleRemoveCartItem = async (productId) => {
        try {
            await axiosInstance.delete("/cart/remove-from-cart", { data: { productId } });
            toast.success("Product removed");
            setRefreshState(prev => !prev);
        } catch (error) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || "Failed to remove";
            toast.error(`Error: ${errorMessage}`);
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        const numQuantity = Math.max(1, Number(quantity)); // Ensure it's a number and at least 1
        setQuantities(prev => ({ ...prev, [productId]: numQuantity }));
    };

    const handleUpdateQuantity = async (productId) => {
        const quantity = quantities[productId] || 1; // Default to 1 if not set
        try {
            await axiosInstance.put("/cart/update-quantity", { productId, quantity });
            toast.success("Quantity updated");
            setRefreshState(prev => !prev);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update quantity");
        }
    };

    if (isLoading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!cartDetails?.products?.length) {
        return <Typography variant="h6" className="text-center">Your cart is empty!</Typography>;
    }

    return (
        <div className="p-4">
            <section>
                <Typography variant="h4" className="text-center mb-4">Cart Page</Typography>
            </section>
            <section className="flex flex-wrap">
                <div className="w-full md:w-6/12">
                    <Typography variant="h5" className="mb-4">Items in Cart</Typography>
                    {cartDetails.products.map((value) => (
                        <CartCards1 
                            item={value} 
                            key={value?._id} 
                            handleRemove={handleRemoveCartItem} 
                            handleUpdate={handleUpdateQuantity} 
                        />
                    ))}
                </div>
                <div className="w-full md:w-6/12 px-20 py-20">
                    {cartDetails.products.map((value) => {
                        const currentQuantity = quantities[value.productId] || value.quantity;
                        const totalPrice = value.productId.price * currentQuantity; // Calculate total price for the updated quantity
                        return (
                            <Card key={value?._id} className="mb-4 p-4">
                                <Typography>Price per item: ₹{value?.productId?.price}</Typography>
                                <Typography>Total Price: ₹{totalPrice.toFixed(2)}</Typography>
                                <label>Enter quantity</label>
                                <Input
                                    type="number"
                                    value={currentQuantity} // Bind the current quantity to the input
                                    min="1"
                                    onChange={(e) => handleQuantityChange(value.productId, e.target.value)}
                                    className="mt-2"
                                    placeholder="Enter quantity"
                                />
                                <Button 
                                    onClick={() => handleUpdateQuantity(value.productId)} 
                                    color="blue" 
                                    className="mt-2"
                                >
                                    Update Quantity
                                </Button>
                            </Card>
                        );
                    })}
                    <Typography variant="h6">Total Price: ₹{cartDetails.totalPrice.toFixed(2)}</Typography>
                    <Button className="mt-20" onClick={makePayment} color="green">Make Payment</Button>
                </div>
            </section>
        </div>
    );
};