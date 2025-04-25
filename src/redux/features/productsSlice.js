import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async (productId) => {
        const response = await axiosInstance.get(`/product/product-details/${productId}`);
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productDetails: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedProduct } = productsSlice.actions;
 export default  productsSlice.reducer;
