import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from './features/cartSlice';
import sellerReducer from './features/sellerSlice';
import adminReducer from './features/adminSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer, // Add the cart slice reducer
        seller:sellerReducer,
        admin:adminReducer,
    },
});