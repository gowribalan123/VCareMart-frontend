import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUser, updateUser } from '../../redux/features/userSlice';

export const Seller_EditProfileForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        shippingaddress: '',
        image: null,
        noofproducts:',,'
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
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
        console.log(e.target.files[0]); // Check if the file is being selected
   
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
  // Log the formData to check if the image is included
  console.log([...formDataToSend]);

   


            await axiosInstance.put('/user/updateprofile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(updateUser());
            alert('Profile updated successfully!');
            
            // Optionally reset form or redirect here
            setFormData({
                name: '',
                email: '',
                phone: '',
                dob: '',
                shippingaddress: '',
                image: null,
            });
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Error updating profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <form className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit} >
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
                <label className="block text-sm font-medium mb-1">Number of Products:</label>
                <input
                    type="text"
                    name="noofproducts"
                    value={formData.noofproducts}
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
                       
                        id="image"
                        className={`input text-sm ${error.image ? "input-error" : ""}`}
                       
                    />
                     {error.image && <span className="text-red-500 text-sm mt-1">{error.image.message}</span>}
                    
                   <br />
                    {formData.image && (
                        <button type="button" onClick={handleRemoveFile} className="ml-2 text-red-500">
                            Remove
                        </button>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
};
