// src/views/ProductDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/products/productsSlice';
import { Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.items.find(p => p.id === +id));
  const isFavorite = useSelector(state => state.products.favorites.includes(+id));

  if (!product) return <Typography>Producto no encontrado</Typography>;

  return (
    <div style={{ padding: '20px' }}>
      <Card sx={{ display: 'flex', gap: 2, padding: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ width: 300, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1">${product.price}</Typography>
          <Typography variant="body2" color="text.secondary">{product.category}</Typography>
          <Typography paragraph>{product.description}</Typography>
          <Button variant="outlined" color={isFavorite ? 'error' : 'primary'} onClick={() => dispatch(toggleFavorite(product.id))}>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Button>
          <Button sx={{ ml: 2 }} variant="contained" onClick={() => navigate(`/editar/${product.id}`)}>
            Editar producto
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
