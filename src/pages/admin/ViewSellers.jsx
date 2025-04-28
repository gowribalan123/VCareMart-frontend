import React, { useState } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { SellerCard2 } from "../../components/user/Cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { updateUser } from '../../redux/features/userSlice';
import { useDispatch } from "react-redux";

export const ViewSellers = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        shippingaddress: '',
        image: null,
        noofproducts: '',
    });

    const [refreshState, setRefreshState] = useState(false);
    const [userDetails, isLoading, error] = useFetch("/user/get-all-user", refreshState);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleRemoveUser = async (userId) => {
        try {
            await axiosInstance.delete(`/user/delete/${userId}`);
            toast.success("User removed");
            setRefreshState(prev => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to remove seller");
        }
    };

    const handleUpdateUser = async (userId) => {
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            await axiosInstance.put('/user/updateprofile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(updateUser());
            toast.success('Profile updated successfully!');
            setRefreshState(prev => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update seller");
        }
    };

    // Ensure userDetails is an array before filtering and filter by role
    const filteredUsers = Array.isArray(userDetails) ? userDetails.filter(user =>
        user.role === 'seller' && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl text-gray-500 font-bold mb-4">All Sellers</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/3 mb-4 py-2 border-b-2 border-blue-600 outline-none focus:border-yellow-400"
                aria-label="Search users"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                    <SellerCard2 key={user._id} user={user} onRemove={handleRemoveUser} onUpdate={handleUpdateUser} />
                ))}
            </div>
        </div>
    );
};
