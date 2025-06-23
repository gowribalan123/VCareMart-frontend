import React, { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { SellerCard2 } from "../../components/user/Cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { updateUser } from '../../redux/features/userSlice';
import { useDispatch } from "react-redux";

export const ViewSellers = ({ role }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        shippingaddress: '',
        image: null,
        noofproducts: '',
    });

    const [products, setProducts] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [refreshState, setRefreshState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails] = useFetch("/user/get-all-user", refreshState);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                const response = await axiosInstance.get("/user/get-all-user");
                setSellerDetails(response.data);
            } catch (err) {
                console.error("Error fetching seller details:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSellerDetails();
    }, []);

    const handleToggleUser = async (userId, isActive) => {
        try {
            const endpoint = isActive 
                ? `/user/account-deactivate/${userId}` 
                : `/user/account-activate/${userId}`;
            await axiosInstance.put(endpoint);
            toast.success(`Seller is now ${isActive ? 'inactive' : 'active'}`);
            setRefreshState(prev => !prev);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to toggle seller status");
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await axiosInstance.delete(`/user/delete/${userId}`);
            toast.success("Seller removed");
            setRefreshState(prev => !prev);
        } catch (error) {
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
            toast.error(error?.response?.data?.message || "Failed to update seller");
        }
    };

    const handleViewProducts = async (userId) => {
        console.log("Viewing products for seller with ID:", userId);
        try {
            const response = await axiosInstance.get(`/product/get-all-products-by-seller/${userId}`);
            if (response && response.data && response.data.data) {
                setProducts(response.data.data);
                setError('');

                if (response.data.data.length === 0) {
                    toast.info("No products added. Please add products.");
                }
            } else {
                console.error("Unexpected response structure:", response);
                setError("Unexpected response structure.");
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(err.response ? err.response.data.message : err.message);
            setProducts([]); // Reset products to empty on error
        }
    };

    const filteredUsers = Array.isArray(userDetails) ? userDetails.filter(user =>
        user.role === 'seller' && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

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
                    <SellerCard2 
                        key={user._id} 
                        user={user} 
                        onRemove={handleRemoveUser}
                        onUpdate={handleUpdateUser}  
                        onToggle={handleToggleUser} 
                        onViewProducts={handleViewProducts}
                    />
                ))}
            </div>
        </div>
    );
};
