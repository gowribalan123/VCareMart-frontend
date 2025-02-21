import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";

export const EditProfileForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
       phone: '',
        dob: '',
        shippingaddress: '',
        billingaddress: '',
        image: null, // Initialize as null for file input
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/user/profile");
                withCredentials: true, // Include credentials in the request
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            await axiosInstance.post('/user/updateprofile', formDataToSend);
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Error updating profile');
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;


    return (
        <form className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
             <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Shipping Address:</label>
                <input
                    type="text"
                    name="shippingaddress"
                    value={formData.shippingaddress}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Billing Address:</label>
                <input
                    type="text"
                    name="billingaddress"
                    value={formData.billingaddress}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Profile Picture:</label>
                <div className="flex items-center">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image"
                    />
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Choose File
                    </label>
                    <span className="ml-4 text-gray-700">
                        {formData.image ? formData.image.name : 'No file chosen'}
                    </span>
                </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Update Profile
            </button>
        </form>
    );
};