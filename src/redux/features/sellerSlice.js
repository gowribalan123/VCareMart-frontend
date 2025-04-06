import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isSellerAuth: false,
    sellerData: {},
    error: null, // Added error state
};

// Create the seller slice
export const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        setSellerAuth: (state, action) => {
            state.isSellerAuth = action.payload;
        },
        saveSeller: (state, action) => {
            state.isSellerAuth = true;
            state.sellerData = action.payload;
            state.error = null; // Clear error on successful login
        },
        clearSeller: (state) => {
            state.isSellerAuth = false;
            state.sellerData = {};
            state.error = null; // Clear error on logout
        },
        updateSeller: (state, action) => {
            state.sellerData = { ...state.sellerData, ...action.payload };
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveSeller, clearSeller, updateSeller, setError } = sellerSlice.actions;

// Selectors
export const { setSellerAuth } = sellerSlice.actions;
export const selectIsSellerAuth = (state) => state.seller.isSellerAuth;
export const selectSellerData = (state) => state.seller.sellerData;
export const selectSellerError = (state) => state.seller.error; // New selector for error

// Export the reducer
export default sellerSlice.reducer;
