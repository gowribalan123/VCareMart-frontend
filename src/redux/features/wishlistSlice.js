import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isUserAuth: false,
    userData: {},
    error: null, // Added error state
};

// Create the user slice
export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        saveWishlist: (state, action) => {
            state.isUserAuth = true;
            state.userData = action.payload;
            state.error = null; // Clear error on successful login
        },
        clearUser: (state) => {
            state.isUserAuth = false;
            state.userData = {};
            state.error = null; // Clear error on logout
        },
        updateUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveWishlist, clearUser, updateUser, setError } = wishlistSlice.actions;

// Selectors
export const selectIsUserAuth = (state) => state.wishlist.isUserAuth; // Updated to wishlist
export const selectUserData = (state) => state.wishlist.userData; // Updated to wishlist
export const selectUserError = (state) => state.wishlist.error; // Updated to wishlist

// Export the reducer
export default wishlistSlice.reducer;
