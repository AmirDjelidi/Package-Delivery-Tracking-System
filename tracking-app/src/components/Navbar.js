// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic
    navigate('/');
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Package Tracking
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/new-package">
            New Package
          </Button>
          <Button color="inherit" component={Link} to="/couriers">
            Courier List
          </Button>
          <Button color="inherit" component={Link} to="/new-courier">
            Add Courier
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
