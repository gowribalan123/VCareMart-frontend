import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/features/cartSlice";

export const PaymentSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const { transactionId = 'N/A', amount = 0 } = location.state || {};

    useEffect(() => {
        handleClearCart(); // Clear the cart on component mount
    }, []); // Empty dependency array ensures this runs once

    const handleClearCart = async () => {
        try {
            console.log("Clearing cart...");
         dispatch(clearCart()); // Dispatch the clearCart action
            toast.success("Cart cleared successfully!"); // Notify user of success
        } catch (error) {
            console.error("Failed to clear cart:", error);
            toast.error("Failed to clear cart."); // Notify user of failure
        }
    };

    return (
        <div className="payment-success">
            <h1>Payment Successful!</h1>
            <p>Transaction ID: {transactionId}</p>
            <p>Amount: ₹{amount}</p>
            <p>Your cart has been cleared.</p>
        </div>
    );
};
