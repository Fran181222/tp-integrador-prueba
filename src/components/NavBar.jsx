// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../features/products/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Grupo 7</Typography>
        <div>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/">Inicio</Button>
              <Button color="inherit" component={Link} to="/favoritos">Favoritos</Button>
              <Button color="inherit" component={Link} to="/crear">Crear</Button>
              <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
              <Typography variant="body2" sx={{ ml: 2 }}>{user.email}</Typography>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">
                <AccountCircleIcon />
              </Button>
              <Button color="inherit" component={Link} to="/register">
                <PersonAddSharpIcon />
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
