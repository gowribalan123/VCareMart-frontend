import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { Input, Button, Typography, Card, CardBody } from "@material-tailwind/react";
import toast from "react-hot-toast"; // Import toast for notifications
import { loadStripe } from "@stripe/stripe-js";
import { useFetch } from "../../hooks/useFetch";
export const ShippingAddress = () => {
    const [shippingaddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
      const [refreshState, setRefreshState] = useState(false);
    const [addedAddress, setAddedAddress] = useState(null);
     const [quantities, setQuantities] = useState({});
 const [cartDetails] = useFetch("/cart/get-cart", refreshState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingaddress, [name]: value });
    };

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axiosInstance.get('/shippingaddress/get-shippingaddress');
                setShippingAddress(response.data);
                setAddedAddress(response.data); // Set the fetched address
            } catch (error) {
                setError(error.message);
                toast.error("Error fetching address");
            } finally {
                setLoading(false);
            }
        };
        fetchAddress();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/shippingaddress/add-shippingaddress', { shippingaddress });
            setSuccess(response.data.message);
            setError('');
            setAddedAddress(shippingaddress); // Save the added address
            toast.success('Shipping address added successfully!');
            // Reset form only after successful submission
            setShippingAddress({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            });
        } catch (err) {
            setError(err.response.data.message || 'Error adding address');
            setSuccess('');
            toast.error(err.response.data.message || 'Error adding address');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete('/shippingaddress/delete-shippingaddress', {
                data: { shippingaddress: addedAddress }
            });
            setSuccess(response.data.message);
            setError('');
            setAddedAddress(null); // Clear the added address
            toast.success('Shipping address deleted successfully!');
        } catch (err) {
            setError(err.response.data.message || 'Error deleting address');
            setSuccess('');
            toast.error(err.response.data.message || 'Error deleting address');
        }
    };

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


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 mb-4">
                <CardBody>
                    <Typography variant="h5" className="mb-4">
                        Add Shipping Address
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="street"
                            label="Street"
                            value={shippingaddress.street}
                            onChange={handleChange}
                            required
                            className="mb-4"
                        />
                        <Input
                            type="text"
                            name="city"
                            label="City"
                            value={shippingaddress.city}
                            onChange={handleChange}
                            required
                            className="mb-4"
                        />
                        <Input
                            type="text"
                            name="state"
                            label="State"
                            value={shippingaddress.state}
                            onChange={handleChange}
                            required
                            className="mb-4"
                        />
                        <Input
                            type="text"
                            name="zipCode"
                            label="Zip Code"
                            value={shippingaddress.zipCode}
                            onChange={handleChange}
                            required
                            className="mb-4"
                        />
                        <Input
                            type="text"
                            name="country"
                            label="Country"
                            value={shippingaddress.country}
                            onChange={handleChange}
                            required
                            className="mb-4"
                        />
                        <Button type="submit" className="w-full">
                            Add Address
                        </Button>

                        <Button className="mt-20" onClick={makePayment} color="green">Continue</Button>
                    </form>
                </CardBody>
            </Card>

            <div>
                <h2>Address</h2>
                {loading ? (
                    <p>Loading address...</p>
                ) : (
                    addedAddress ? (
                        <Card className="w-96">
                            <CardBody>
                                <Typography variant="h6">Added Address</Typography>
                                <p>{addedAddress.street}</p>
                                <p>{addedAddress.city}, {addedAddress.state}, {addedAddress.zipCode}</p>
                                <p>{addedAddress.country}</p>
                                <Button color="red" onClick={handleDelete} className="mt-4">
                                    Delete Address
                                </Button>
                            </CardBody>
                        </Card>
                    ) : (
                        <p>No address found.</p>
                    )
                )}
            </div>
        </div>
    );
};
