import React,{useState} from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { CategoryCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { CategorySkelton } from "../../components/shared/Skeltons";
import toast from "react-hot-toast";

export const CategoryPage = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [CategoryList, isLoading, error, setCategoryList] = useFetch("/category/get-all-category", refreshState);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/category/category-delete/${id}`);
                toast.success("Category removed succesfully");
                setRefreshState(prev => !prev);
                // Update the CategoryList by filtering out the deleted category
                setCategoryList((prevCategories) => prevCategories.filter(category => category._id !== id));
            } catch (err) {
                console.error("Failed to delete category:", err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <CategorySkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                        <p className="text-gray-600">Explore our wide range of categories.</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {CategoryList?.map((category) => (
                            <CategoryCard
                                key={category?._id}
                                category={category}
                                onDelete={handleDelete}  // Pass the delete handler
                                className="transition-transform transform hover:scale-105"
                            />
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};
