import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/features/cartSlice";

export const PaymentSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
     // const [paymentdetails, isLoading, error] = useFetch("/payment/");
    
    const { transactionId = 'N/A', amount = 0 } = location.state || {};

    const handleClearCart = () => {
        console.log("Clearing cart...");
        dispatch(clearCart());
        toast.success("Cart cleared successfully!");
    };

  


    useEffect(() => {
        handleClearCart();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg text-center text-gray-700 mb-6">Thank you for your purchase. Your order is being processed !</p>
                <p className="mt-2 text-gray-600">A confirmation email has been sent to you.</p>
            {/*
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Transaction Details</h2>
                    <p className="mt-2">Transaction ID: <strong>{transactionId}</strong></p>
                    <p>Total Amount: <strong>₹{amount.toFixed(2)}</strong></p>
                    <p className="mt-2 text-gray-600">A confirmation email has been sent to you.</p>
                </div>
                */}
                <button 
                    className="w-full mt-4 px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
                    onClick={() => window.location.href = '/product'}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};
