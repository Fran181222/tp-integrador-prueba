// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice';
import Navbar from './components/NavBar';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetails from './views/ProductDetails';
import ProductForm from './components/ProductForm';
import NotFound from './views/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import Register from './views/Register';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './shared-theme/customTheme.jsx';

const theme = createTheme(getDesignTokens('dark')); // Cambia 'dark' a 'light' si prefieres el tema claro

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/favoritos" element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path="/crear" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/editar/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/producto/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
