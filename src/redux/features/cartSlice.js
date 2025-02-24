import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        itemCount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity; // Add to existing quantity
            } else {
                state.items.push(action.payload); // Add as a new item
            }
            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0;
        },
        addQuantityToItem: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity += 1;
                state.itemCount += 1; // Increment total item count
            }
        },
        subtractQuantityFromItem: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity = Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
                state.itemCount = Math.max(0, state.itemCount - 1); // Decrement and prevent negative count
            }
        },
    },
});

// Export actions for use in components
export const { 
    addItem, 
    removeItem, 
    clearCart, 
    addQuantityToItem, 
    subtractQuantityFromItem 
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
