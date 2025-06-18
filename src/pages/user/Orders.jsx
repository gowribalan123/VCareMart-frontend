import React, { useState } from 'react';
import axios from 'axios';

export const Orders= () => {
    const [userId, setUserId] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!userId || !shippingAddress) {
            setError('User ID and shipping address are required.');
            return;
        }

        try {
            const response = await axios.post('/order/createOrder', { userId, shippingAddress });
            if (response.data.status === 'success') {
                setOrderDetails(response.data.message);
                setSuccess('Order created successfully!');
            } else {
                setError('Failed to create order.');
            }
        } catch (err) {
            console.error('Error creating order:', err);
            setError('Server error. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Shipping Address:</label>
                    <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Order</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {orderDetails && (
                <div>
                    <h3>Order Details</h3>
                    <p>User ID: {orderDetails.userId}</p>
                    <p>Total Price: {orderDetails.totalPrice}</p>
                    <p>Payment Status: {orderDetails.paymentStatus}</p>
                    <p>Order Status: {orderDetails.status}</p>
                    <h4>Products:</h4>
                    <ul>
                        {orderDetails.products.map(product => (
                            <li key={product._id}>
                                Product ID: {product.productId}, Quantity: {product.quantity}, Price: {product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

 