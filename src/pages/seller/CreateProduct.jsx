import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { addProduct } from '../../redux/features/productSlice';
import toast from "react-hot-toast";

export const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        rating: '',
        age_group: '',
        size: '',
        color: '',
        weight: '',
        image: null,
        userID: '',
        subcategoryid: '',
        categoryid: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subcategories, setSubCategories] = useState([]);
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
    } = useForm();

    // Fetch user data and subcategories
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setFormData(prevData => ({
                    ...prevData,
                    userID: response.data._id || '',
                }));
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        const fetchSubCategories = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/subcategory/get-all-subcategory");
                if (response.data && Array.isArray(response.data.data)) {
                    setSubCategories(response.data.data);
                } else {
                    throw new Error('Subcategories data is not an array');
                }
            } catch (err) {
                setError('Error fetching subcategories: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchSubCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subcategoryid') {
            const selectedSubcategory = subcategories.find(sub => sub._id === value);
            setFormData({
                ...formData,
                [name]: value,
                categoryid: selectedSubcategory ? selectedSubcategory.categoryId : '',
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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

            await axiosInstance.post('/product/create-product', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(addProduct());
            toast.success('Product created successfully!');
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                rating: '',
                age_group: '',
                size: '',
                color: '',
                weight: '',
                image: null,
                userID: '',
                subcategoryid: '',
                categoryid: '',
            });
        } catch (err) {
            console.error('Error creating Product:', err);
            setError(err.response?.data?.message || 'Error creating Product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>
            <form className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
                {/* Subcategory Selection */}
                <div className="mb-4">
                    <label htmlFor="subcategoryid" className="block text-sm font-medium mb-1">Select Sub Category:</label>
                    <select
                        name="subcategoryid"
                        value={formData.subcategoryid}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>

                {/* Category Field */}
                <div className="mb-4">
                    <label htmlFor="categoryid" className="block text-sm font-medium mb-1">Category:</label>
                    <input
                        name="categoryid"
                        value={formData.categoryid}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Product Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* File Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Product Image:</label>
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

                {/* Other Fields */}
                {['price', 'stock', 'rating', 'age_group', 'size', 'color', 'weight'].map(field => (
                    <div className="mb-4" key={field}>
                        <label htmlFor={field} className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        <input
                            type={field === 'price' || field === 'stock' || field === 'rating' ? 'number' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                {/* Description Field */}
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

                {/* Submit Button */}
                <div className="form-control col-span-2 mt-8 flex items-center justify-center">
                    <button type="submit" className="p-2 btn btn-primary w-full md:w-1/2 mx-auto bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out" disabled={isSubmitting}>
                        {isSubmitting ? <span className="loading loading-dots loading-lg"></span> : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};