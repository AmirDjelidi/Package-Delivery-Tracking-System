// src/components/CourierList.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

const CourierList = () => {
    const [couriers, setCouriers] = useState([]);

    useEffect(() => {
        // Fetch couriers from the backend
        axios.get('http://localhost:8080/couriers')
            .then(response => {
                setCouriers(response.data);
            })
            .catch(error => {
                console.error('Error fetching couriers:', error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Courier List
                    </Typography>
                    <Grid container spacing={3}>
                        {couriers.map((courier) => (
                            <Grid item xs={12} sm={6} md={4} key={courier.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="primary">
                                            {courier.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Vehicle Type: {courier.vehicleType}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default CourierList;
