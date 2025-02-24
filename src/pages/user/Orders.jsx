import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const  Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/order/myOrder');
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>My Orders</h1>
            {/* 
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <h2>Order ID: {order._id}</h2>
                        <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
                        <p>Total: ₹{order.totalPrice}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <h3>Items:</h3>
                        <ul>
                            {order.products.map(product => (
                                <li key={product.productId}>
                                    {product.quantity} x {product.price} (Product ID: {product.productId})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            */}
        </div>
    );
};



 