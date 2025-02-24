import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch"; 
import { CartCards } from "../../components/user/Cards";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { removeItem ,clearCart} from "../../redux/features/cartSlice";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);
    const dispatch = useDispatch();

    const handleRemoveCartItem = async (productId) => {
        try {
            await axiosInstance.delete("/cart/remove-from-cart", { data: { productId } });
            toast.success("Product removed successfully");
            dispatch(removeItem(productId));
            setRefreshState(prev => !prev);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to remove");
        }
    };

    const updateQuantity = async (productId, delta) => {
        const updatedProducts = cartDetails.products.map(product => {
            if (product.productId._id === productId) {
                const newQuantity = Math.max(1, product.quantity + delta);
                return { ...product, quantity: newQuantity };
            }
            return product;
        });

        await axiosInstance.put('/cart/update-quantity', { products: updatedProducts });
        setRefreshState(prev => !prev);
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance.post("/payment/create-checkout-session", {
                products: cartDetails?.products,
            });

            const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
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
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-lg text-center">{error}</div>;
    }

    const totalPrice = cartDetails.products.reduce((acc, product) => {
        return acc + (product.productId.price * product.quantity);
    }, 0);

    return (
        <div className="container mx-auto p-4">
            <section className="mb-6">
                <h1 className="text-3xl font-bold text-center">My Cart</h1>
            </section>
            <section>
                <div className="space-y-4">
                    {cartDetails?.products?.length > 0 ? (
                        cartDetails.products.map((item) => (
                            <div key={item.productId._id}>
                                <CartCards 
                                    item={item} 
                                    handleRemove={handleRemoveCartItem} 
                                    updateQuantity={updateQuantity} 
                                />
                                <div className="flex items-center justify-between mt-2 border p-2 rounded-lg shadow-md bg-white">
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => updateQuantity(item.productId._id, -1)} 
                                            className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.productId._id, 1)} 
                                            className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-lg font-semibold">₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                                    <span className="text-sm text-gray-600">{item.productId.name}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-lg font-semibold text-center">Your cart is empty</h1>
                    )}
                </div>
                <h2 className="text-xl font-semibold mt-6">Price Summary</h2>
                <h2 className="text-lg">Total Price: ₹{totalPrice.toFixed(2)}</h2>
                <div className="text-center mt-4">
                    <button 
                        className="btn btn-success mt-4 px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                        onClick={makePayment} 
                        disabled={cartDetails?.products?.length === 0}
                    >
                        Make Payment
                    </button>
                </div>
            </section>
        </div>
    );
};
