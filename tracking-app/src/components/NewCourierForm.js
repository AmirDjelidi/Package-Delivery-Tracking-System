// src/components/NewCourierForm.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewCourierForm = () => {
    const [name, setName] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const navigate = useNavigate();

    // Define vehicle types for selection
    const vehicleTypes = [
        { value: 'Truck', label: 'Truck' },
        { value: 'Car', label: 'Car' },
        { value: 'Motorcycle', label: 'Motorcycle' }
    ];

    // Handle form submission to add a new courier
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCourier = {
            name,
            vehicleType
        };

        axios.post('http://localhost:8080/couriers', newCourier)
            .then(response => {
                console.log('Courier added:', response.data);
                // Reset fields after adding a courier
                setName('');
                setVehicleType('');
                navigate('/couriers');
            })
            .catch(error => console.error('Error adding courier:', error));
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Add New Courier
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Courier Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            select
                            label="Vehicle Type"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                        >
                            {vehicleTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Add Courier
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default NewCourierForm;
