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
        categoryid:'',
         
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

        // Check if the selected field is subcategory
        if (name === 'subcategoryid') {
            const selectedSubcategory = subcategories.find(sub => sub._id === value);
            if (selectedSubcategory) {
                // Update categoryid based on selected subcategory
                setFormData({
                    ...formData,
                    [name]: value,
                    categoryid: selectedSubcategory.categoryId, // Assuming categoryID is the key for category ID
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: value,
                    categoryid: '', // Reset category ID if no subcategory is selected
                });
            }
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
            toast.success('Product created successfully!'); // Using toast for success message
            
            // Reset form
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
                categoryid:'',
              
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

                <div className="mb-4">
                    <label htmlFor="categoryid" className="block text-sm font-medium mb-1"> Category:</label>
                   <input
                        name="categoryid"
                        value={formData.categoryid}
                        onChange={handleChange}
                        required readOnly
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                        ></input> 
                       
</div>
                <div className="mb-4">
                    <label htmlFor="product" className="block text-sm font-medium mb-1">Product:</label>
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

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium mb-1">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium mb-1">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age_group" className="block text-sm font-medium mb-1">Age Group:</label>
                    <input
                        type="text"
                        name="age_group"
                        value={formData.age_group}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="size" className="block text-sm font-medium mb-1">Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium mb-1">Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="weight" className="block text-sm font-medium mb-1">Weight:</label>
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight}
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

                <div className="form-control col-span-2 mt-8">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2 mx-auto bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out" disabled={isSubmitting}>
                        {isSubmitting ? <span className="loading loading-dots loading-lg"></span> : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};
