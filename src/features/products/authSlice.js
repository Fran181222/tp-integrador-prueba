// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getSession = () => {
  const user = localStorage.getItem('sessionUser');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getSession(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('sessionUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('sessionUser');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
