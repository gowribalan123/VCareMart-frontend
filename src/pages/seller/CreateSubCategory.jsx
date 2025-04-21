import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addSubCategory } from '../../redux/features/subCategorySlice';

export const CreateSubCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
       
        categoryId: '',
        userId: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]); // Ensure this is initialized as an array
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
                    userId: response.data._id || '',
                }));
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
          try {
              const response = await axiosInstance.get("/category/get-all-category");
              console.log('API Response:', response.data); // Log the response data
                 // Access the data property
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Set categories from the nested data array
      } else {
          throw new Error('Categories data is not an array');
      }
               
          } catch (err) {
              setError('Error fetching categories: ' + err.message);
          }
      };
      
      

        fetchUserData();
        fetchCategories();
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

            await axiosInstance.post('/subcategory/create-subcategory', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(addSubCategory());
            alert('Subcategory created successfully!');

            // Reset form
            setFormData({
                name: '',
                description: '',
                image: null,
                userId: '',
                categoryId: '',
            });
        } catch (err) {
            console.error('Error creating Subcategory:', err);
            setError(err.response?.data?.message || 'Error creating subcategory');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <form className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Create Subcategory</h2>
            <div className="mb-4">
                <label htmlFor="subcategory" className="block text-sm font-medium mb-1">Subcategory:</label>
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
                <label htmlFor="categoryId" className="block text-sm font-medium mb-1">Select Category:</label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subcategory Image:</label>
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
                {isSubmitting ? 'Creating...' : 'Create Subcategory'}
            </button>
        </form>
    );
};
