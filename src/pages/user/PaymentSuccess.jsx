import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch"; // Adjust the import path as necessary

export const PaymentSuccess = () => {
    const location = useLocation();
    const { transactionId = 'N/A', amount = 0 } = location.state || {};

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Clear cart after payment success
    const [clearCartData, clearCartLoading, clearCartError] = useFetch('/cart/clear-cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in the header
        },
    });

    useEffect(() => {
        if (clearCartData) {
            toast.success("Cart cleared successfully!"); // Notify user of success
        }
        if (clearCartError) {
            console.error("Failed to clear cart:", clearCartError);
            toast.error("Failed to clear cart."); // Notify user of failure
        }
    }, [clearCartData, clearCartError]); // Run effect when clearCartData or clearCartError changes

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-green-600">Payment Successful!</h1>
                <p className="mt-4 text-lg text-gray-700">Thank you for your purchase!</p>
                <p className="mt-2 text-lg text-gray-700">Transaction ID: <span className="font-bold">{transactionId}</span></p>
                <p className="mt-2 text-lg text-gray-700">Amount: <span className="font-bold">₹{amount}</span></p>
                {clearCartLoading ? (
                    <p className="mt-4 text-gray-600">Clearing your cart...</p>
                ) : (
                    <p className="mt-4 text-green-500">Your cart has been cleared.</p>
                )}
                <Link to="/products" className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};
