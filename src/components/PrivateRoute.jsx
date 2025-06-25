// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../features/products/authSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
