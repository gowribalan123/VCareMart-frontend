import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    categories: [],
    error: null, // Added error state
};

// Create the category slice
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload); // Add new category
            state.error = null; // Clear error on successful addition
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload.id); // Remove category by ID
            state.error = null; // Clear error on successful removal
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], ...action.payload }; // Update category data
            }
            state.error = null; // Clear error on successful update
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { addCategory, removeCategory, updateCategory, setError } = categorySlice.actions;

// Selectors
export const selectCategories = (state) => state.category.categories; // Get all categories\

export const selectCategoryError = (state) => state.category.error; // New selector for error

// Export the reducer
export default categorySlice.reducer;
