import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array to hold cart items
    itemCount: 0, // Total number of items in the cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload); // Add the new item to the cart
            state.itemCount += 1; // Increment the item count
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items.splice(index, 1); // Remove the item from the cart
                state.itemCount -= 1; // Decrement the item count
            }
        },
        clearCart: (state) => {
            state.items = []; // Clear all items from the cart
            state.itemCount = 0; // Reset item count
        },
        updateCartCount: (state) => {
            state.itemCount = state.items.length; // Update item count based on items array
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, clearCart, updateCartCount } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
