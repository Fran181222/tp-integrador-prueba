import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle' },
  reducers: {
    editProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  }
});

export const { editProduct, deleteProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
