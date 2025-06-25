// src/views/Home.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';

const cardZoomStyle = {
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.06)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    zIndex: 2,
  },
};

const Home = () => {
  const { items, status } = useSelector(state => state.products);

  if (status === 'loading') return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Productos</Typography>
      <Grid container spacing={2}>
        {items.map(product => (
          <Grid item key={product.id}>
            <Box sx={cardZoomStyle}>
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
