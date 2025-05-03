import React ,{useState} from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard1 } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const ViewProductPage = ({role}) => {
     const [refreshState, setRefreshState] = useState(false);
    const [productList, isLoading, error,setProductList] = useFetch("/product/get-all-products",refreshState);
    console.log('products===', productList);
     

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/product/delete-product/${id}`);
                toast.success("Product removed succesfully");
                setRefreshState(prev => !prev);
                // Update the ProductList by filtering out the deleted product
                setProductList((prevProducts) => prevProducts.filter(product => product._id !== id));
            } catch (err) {
                console.error("Failed to delete product:", err);
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                        <p className="text-gray-600">Explore our wide range of products.</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {productList?.map((product) => (
                            <ProductCard1
                                key={product?._id}
                                product={product} 
                                onDelete={handleDelete}  
                                // Pass the delete handler
                                role ={role}
                                className="transition-transform transform hover:scale-105"
                            />
                        ))}
                    </section>
                    
                </>
            )}
        </div>
    );
};
