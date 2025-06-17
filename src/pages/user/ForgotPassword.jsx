import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { axiosInstance } from '../../config/axiosInstance';

const ForgotPassword = ({role}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    console.log("role", role); // Log the role for debugging
    const user = {
        role: "user"
        
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axiosInstance.post('/user/forgot-password', { email });
            setMessage(response.data.message);
            alert(response.data.message); // Alert message to the user

            // Clear fields after successful submission
            setEmail('');

            // Check user role and navigate accordingly
            if (user.role === 'user') {
            
                navigate('/login'); // Navigate to regular login
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Send Reset Link
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
