// src/views/NotFound.jsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: 40, textAlign: 'center' }}>
    <Typography variant="h3" gutterBottom>Página no encontrada</Typography>
    <Typography variant="body1" gutterBottom>La ruta ingresada no existe.</Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Volver al inicio
    </Button>
  </div>
);

export default NotFound;
