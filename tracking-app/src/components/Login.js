// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic
    window.location.href = '/dashboard';
  };

  return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
        </Box>
      </Container>
  );
};

export default Login;
