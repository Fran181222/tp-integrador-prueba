// src/views/Register.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, InputAdornment, Stack, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError('Correo inválido');
    if (form.password.length < 6) return setError('Contraseña muy corta');
    if (form.password !== form.confirm) return setError('Contraseñas no coinciden');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === form.email)) return setError('Ya existe un usuario con ese correo');

    users.push({ email: form.email, password: form.password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Correo"
              name="email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={form.email}
              autoComplete="email"
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={form.password}
              autoComplete="new-password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar/ocultar contraseña"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirmar contraseña"
              name="confirm"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={form.confirm}
              autoComplete="new-password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar/ocultar confirmación"
                      onClick={() => setShowConfirm((show) => !show)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Registrarse
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
