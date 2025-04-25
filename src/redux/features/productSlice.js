import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
   products: [],
    error: null, // Added error state
};

// Create the category slice
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload); // Add new product
            state.error = null; // Clear error on successful addition
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id); // Remove product by ID
            state.error = null; // Clear error on successful removal
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product=> product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...action.payload }; // Update product data
            }
            state.error = null; // Clear error on successful update
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, updateProduct, setError } = productSlice.actions;

// Selectors
export const selectProduct = (state) => state.product.products; // Get all Products
export const selectSProductError = (state) => state.product.error; // New selector for error

// Export the reducer
export default productSlice.reducer;
