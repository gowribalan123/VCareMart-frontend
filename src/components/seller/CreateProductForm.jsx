import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const CreateProductForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Fetch categories and subcategories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get("/category/get-all-category");
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    toast.error("Failed to load categories.");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to load categories.");
            }
        };
        fetchCategories();
    }, []);

    // Handle category change
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        const filteredSubcategories = categories.find(category => category._id === categoryId)?.subcategories || [];
        setSubcategories(filteredSubcategories);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("stock", data.stock);
            formData.append("age_group", data.age_group);
            formData.append("size", data.size);
            formData.append("color", data.color);
            formData.append("weight", data.weight);
            formData.append("image", data.image[0]);
            formData.append("category", selectedCategory);
            formData.append("subcategory", data.subcategory);

            await axiosInstance.post("/product/create-product", formData);
            toast.success("Product created successfully");
            navigate('/products');
        } catch (error) {
            console.error(error);
            toast.error("Error while creating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Category</span>
                    </label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className={`select select-bordered ${errors.category ? "border-red-500" : "border-gray-300"}`}
                    >
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No categories available</option>
                        )}
                    </select>
                    {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Subcategory</span>
                    </label>
                    <select
                        className={`select select-bordered ${errors.subcategory ? "border-red-500" : "border-gray-300"}`}
                        {...register("subcategory", { required: "Subcategory is required" })}
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                    {errors.subcategory && <span className="text-red-500 text-sm mt-1">{errors.subcategory.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Product Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        className={`input input-bordered ${errors.name ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Upload Image</span>
                    </label>
                    <input
                        type="file"
                        className={`input ${errors.image ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("image", { required: "Image is required" })}
                    />
                    {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Price</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        className={`input input-bordered ${errors.price ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                    />
                    {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Stock</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter stock quantity"
                        className={`input input-bordered ${errors.stock ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be non-negative" } })}
                    />
                    {errors.stock && <span className="text-red-500 text-sm mt-1">{errors.stock.message}</span>}
                </div>

                {/* Right Column */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Age Group</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter age group"
                        className={`input input-bordered ${errors.age_group ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("age_group", { required: "Age group is required" })}
                    />
                    {errors.age_group && <span className="text-red-500 text-sm mt-1">{errors.age_group.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Size</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter size"
                        className={`input input-bordered ${errors.size ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("size", { required: "Size is required" })}
                    />
                    {errors.size && <span className="text-red-500 text-sm mt-1">{errors.size.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Color</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter color"
                        className={`input input-bordered ${errors.color ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("color", { required: "Color is required" })}
                    />
                    {errors.color && <span className="text-red-500 text-sm mt-1">{errors.color.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700">Weight</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter weight (e.g., 500gm)"
                        className={`input input-bordered ${errors.weight ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("weight", { required: "Weight is required" })}
                    />
                    {errors.weight && <span className="text-red-500 text-sm mt-1">{errors.weight.message}</span>}
                </div>

                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text text-gray-700">Description</span>
                    </label>
                    <textarea
                        placeholder="Description"
                        className={`input input-bordered ${errors.description ? "border-red-500" : "border-gray-300"} p-3 rounded-md`}
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                </div>

                <div className="form-control col-span-2 mt-8">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2 mx-auto bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out">
                        {loading ? <span className="loading loading-dots loading-lg"></span> : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};
