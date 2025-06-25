// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../features/products/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const products = useSelector(state => state.products.items);
  const productToEdit = isEdit ? products.find(p => p.id === +id) : null;

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (isEdit && productToEdit) {
      setForm(productToEdit);
    }
  }, [isEdit, productToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProduct({ ...form, id: productToEdit.id }));
    } else {
      dispatch(addProduct(form));
    }
    navigate('/');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Editar Producto' : 'Crear Producto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del producto"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Precio"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Categoría"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="URL de la Imagen"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
