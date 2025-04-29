import React,{useState} from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { SubCategoryCard} from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { SubCategorySkelton } from "../../components/shared/Skeltons";
import toast from "react-hot-toast";

export const SubCategoryPage = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [SubCategoryList, isLoading, error,setSubCategoryList] = useFetch("/subcategory/get-all-subcategory", refreshState);


    const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
            if (confirmDelete) {
                try {
                    await axiosInstance.delete(`/subcategory/subcategory-delete/${id}`);
                    toast.success("SubCategory removed succesfully");
                    setRefreshState(prev => !prev);
                    // Update the CategoryList by filtering out the deleted category
                    setSubCategoryList((prevSubCategories) => prevSubCategories.filter(subcategory => subcategory._id !== id));
                } catch (err) {
                    console.error("Failed to delete sub category:", err);
                }
            }
        };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <SubCategorySkelton/>
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                        <p className="text-gray-600">Explore our wide range of sub categories.</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {SubCategoryList?.map((subcategory) => (
                            <SubCategoryCard
                                key={subcategory?._id}
                                subcategory={subcategory}
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
