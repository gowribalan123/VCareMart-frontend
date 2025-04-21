import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addCategory } from '../../redux/features/categorySlice';

export const CreateCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        userId: '',  // Automatically loaded seller ID
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setFormData(prevData => ({
                    ...prevData,
                    userId: response.data._id || '', // Load seller ID from user data
                }));
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleRemoveFile = () => {
        setFormData({ ...formData, image: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            await axiosInstance.post('/category/create-category', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(addCategory());
            alert('Category created successfully!');
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                image: null,
                userId: '', // Reset seller ID
            });
        } catch (err) {
            console.error('Error creating Category:', err);
            setError(err.response?.data?.message || 'Error creating category');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <form className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category:</label>
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
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="seller" className="block text-sm font-medium mb-1">Seller ID:</label>
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    readOnly // Make the seller ID field read-only
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category Image:</label>
                <div className="flex items-center">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`input text-sm ${error.image ? "input-error" : ""}`}
                    />
                    {formData.image && (
                        <button type="button" onClick={handleRemoveFile} className="ml-2 text-red-500">
                            Remove
                        </button>
                    )}
                </div>
                {formData.image && (
                    <div className="mt-2">
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="w-32 h-32 object-cover"
                        />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Category'}
            </button>
        </form>
    );
};
