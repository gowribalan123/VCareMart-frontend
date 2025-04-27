import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    subcategories: [],
    error: null, // Added error state
};

// Create the category slice
export const subCategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {
        addSubCategory: (state, action) => {
            state.subcategories.push(action.payload); // Add new sub category
            state.error = null; // Clear error on successful addition
        },
        removeSubCategory: (state, action) => {
            state.subcategories = state.subcategories.filter(subcategory => subcategory.id !== action.payload.id); // Remove subcategory by ID
            state.error = null; // Clear error on successful removal
        },
        updateSubCategory: (state, action) => {
            const index = state.subcategories.findIndex(subcategory => subcategory.id === action.payload.id);
            if (index !== -1) {
                state.subcategories[index] = { ...state.subcategories[index], ...action.payload }; // Update subcategory data
            }
            state.error = null; // Clear error on successful update
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { addSubCategory, removeSubCategory, updateSubCategory, setError } = subCategorySlice.actions;

// Selectors
export const selectSubCategories = (state) => state.subcategory.subcategories; // Get all Sub categories
export const selectSubCategoryError = (state) => state.subcategory.error; // New selector for error

// Export the reducer
export default subCategorySlice.reducer;
