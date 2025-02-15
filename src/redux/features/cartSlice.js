// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        itemCount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.itemCount += 1; // Update item count
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.itemCount = Math.max(0, state.itemCount - 1); // Update item count
        },
        // Other reducers...
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;