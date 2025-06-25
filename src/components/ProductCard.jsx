// src/components/ProductCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">{product.category}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/producto/${product.id}`}>Ver más</Button>
        <IconButton
          onClick={() => dispatch(toggleFavorite(product.id))}
          sx={{
            bgcolor: isFavorite ? 'error.main' : 'white',
            color: isFavorite ? 'white' : 'error.main',
            '&:hover': {
              bgcolor: isFavorite ? 'error.dark' : 'grey.200',
            },
            ml: 'auto'
          }}
        >
          {isFavorite
            ? <Favorite sx={{ color: 'white' }} />
            : <FavoriteBorder sx={{ color: 'error.main' }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
