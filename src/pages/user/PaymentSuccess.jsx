import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance"; // Adjust the import path as necessary

export const PaymentSuccess = () => {
    const location = useLocation();
    const { transactionId = 'N/A', amount = 0 } = location.state || {};

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

   {/**  const clearCart = async () => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/clear-cart",
                headers: {
                    'Authorization': `Bearer ${token}` // Include token if necessary
                },
            });
            toast.success("Cart cleared successfully!");
        } catch (error) {
            console.error("Failed to clear cart:", error);
            toast.error("Failed to clear cart.");
        }
    };
*/}
    useEffect(() => {
      //  clearCart(); // Call the clearCart function on component mount
    }, []); // Empty dependency array to run once when the component mounts

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2">
            <div className="bg-white shadow-md rounded-lg p-16 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-green-600">Payment Successful!</h1>
                <p className="mt-4 text-lg text-gray-700">Thank you for your purchase!</p>
{/** 
                <p className="mt-2 text-lg text-gray-700">Transaction ID: <span className="font-bold">{transactionId}</span></p>
                <p className="mt-2 text-lg text-gray-700">Amount: <span className="font-bold">₹{amount}</span></p>
*/}
                <p className="mt-4 text-green-500">Your cart has been cleared.</p>
                
            </div>
            <div>
                
            <Link to="/user/product" className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                    Continue Shopping
                </Link>
            </div>
            
        </div>

    );
};