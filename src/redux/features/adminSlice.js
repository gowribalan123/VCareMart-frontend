import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isAdminAuth: false,
    adminData: {},
    error: null, // Added error state
};

// Create the admin slice
export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminAuth: (state, action) => {
            state.isAdminAuth = action.payload;
        },
        saveAdmin: (state, action) => {
            state.isAdminAuth = true;
            state.adminData = action.payload;
            state.error = null; // Clear error on successful login
        },
        clearAdmin: (state) => {
            state.isAdminAuth = false;
            state.adminData = {};
            state.error = null; // Clear error on logout
        },
        updateAdmin: (state, action) => {
            state.adminData = { ...state.adminData, ...action.payload };
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveAdmin, clearAdmin, updateAdmin, setError } = adminSlice.actions;

// Selectors
export const { setAdminAuth } = adminSlice.actions;
export const selectIsAdminAuth = (state) => state.admin.isAdminAuth;
export const selectAdminData = (state) => state.admin.adminData;
export const selectAdminError = (state) => state.admin.error; // New selector for error

// Export the reducer
export default adminSlice.reducer;
