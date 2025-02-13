import React, { useState } from "react";
//import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch"; 
import { CartCards } from "../../components/user/Cards";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
//import { addToCart } from "../../redux/features/cartSlice"
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {

    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);
    const dispatch = useDispatch();
    //const { cartItems = [], total_price = 0 } = useSelector((state) => state.cart);
    //const { user } = useSelector((state) => state.auth);
  
    //useEffect(() => {
      //const user_id = user ? user._id : null;
   
      //dispatch(fetchCart({ user_id  }));
    ///}, [dispatch, user]);


    const handleRemoveProduct = async (productId) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { productId },
            });
            toast.success("Product removed successfully");
            setRefreshState((prev) => !prev);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "failed to remove");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (error) {
        return <div className="text-red-500 text-lg">{error}</div>; // Display error message
    }

    return (
        <div className="container mx-auto p-4">
            <section>
            <h1 className="text-2xl font-bold mb-4">My Cart</h1>
            </section>
            <section>

            
              <div>
                {cartDetails?.products?.map((value) => (
                    <CartCards 
                        item={value} 
                        key={value._id} 
                        handleRemove={handleRemoveProduct} 
                         // Pass add to cart handler
                    />
                ))}
            </div>
            {cartDetails?.products?.length ? (
                <div className="w-full md:w-6/12 bg-base-300 flex flex-col items-center gap-5 p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Price Summary</h2>
                    <h2 className="text-lg">Total Price: ₹{cartDetails?.totalPrice?.toFixed(2)}</h2>
                </div>
            ) : (
                <h1 className="text-lg font-semibold">Your cart is empty</h1>
            )}
  <button className="btn btn-success mt-20" >Make payment</button>
         </section>
        </div>
    );
};
