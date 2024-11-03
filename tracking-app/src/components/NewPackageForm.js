// src/components/NewPackageForm.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPackageForm = () => {
    const [addressee, setAddressee] = useState('');
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [courierId, setCourierId] = useState('');
    const [couriers, setCouriers] = useState([]);

    // Load available couriers on component mount
    React.useEffect(() => {
        axios.get('http://localhost:8080/couriers')
            .then(response => setCouriers(response.data))
            .catch(error => console.error('Error fetching couriers:', error));
    }, []);

    // Handle form submission to create a new package
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPackage = {
            addressee,
            description,
            courierId,
        };

        axios.post('http://localhost:8080/packages', newPackage)
            .then(response => {
                console.log('Package created:', response.data);
                setAddressee('');
                setDescription('');
                setCourierId('');
                navigate('/dashboard');
            })
            .catch(error => console.error('Error creating package:', error));
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Create New Package
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Addressee"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={addressee}
                            onChange={(e) => setAddressee(e.target.value)}
                            required
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <TextField
                            select
                            label="Courier"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={courierId}
                            onChange={(e) => setCourierId(e.target.value)}
                            required
                        >
                            {couriers.map((courier) => (
                                <MenuItem key={courier.id} value={courier.id}>
                                    {courier.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Create
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default NewPackageForm;
