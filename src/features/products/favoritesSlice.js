import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter(fav => fav !== id);
      } else {
        state.push(id);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
