// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res.data;
  }
);

const initialState = {
  items: [],
  favorites: [],
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      state.favorites.includes(id)
        ? state.favorites = state.favorites.filter(fav => fav !== id)
        : state.favorites.push(id);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.favorites = state.favorites.filter(fav => fav !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  }
});

export const { toggleFavorite, updateProduct, addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
