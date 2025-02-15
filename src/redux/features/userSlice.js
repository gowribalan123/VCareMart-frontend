import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isUserAuth: false,
    userData: {},
};

// Create the user slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isUserAuth = true;
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.isUserAuth = false;
            state.userData = {};
        },
        updateUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser, updateUser } = userSlice.actions;

// Selectors
export const selectIsUserAuth = (state) => state.user.isUserAuth;
export const selectUserData = (state) => state.user.userData;

// Export the reducer
export default userSlice.reducer;