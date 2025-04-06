import React ,{useState} from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

export const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
 
    try {
      const response = await axiosInstance.post("/admin/create-category", data,{
                         headers: { 
                        //   Authorization: `Bearer ${token}`,
                    
                              'Content-Type': 'application/json',
                         },
                       withCredentials:true,
                      });

     
      if (response.ok) {
        setMessage("Category created successfully!");
        // Reset form fields
        setName('');
        setDescription('');
        setImage(null);
      } else {
        setMessage(data.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while creating the category");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image:</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};
