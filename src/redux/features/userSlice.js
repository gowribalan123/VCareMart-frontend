import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isUserAuth: false,
    userData: {},
    error: null, // Added error state
};

// Create the user slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
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
export const { saveUser, clearUser, updateUser, setError } = userSlice.actions;

// Selectors
export const selectIsUserAuth = (state) => state.user.isUserAuth;
export const selectUserData = (state) => state.user.userData;
export const selectUserError = (state) => state.user.error; // New selector for error

// Export the reducer
export default userSlice.reducer;
