// src/components/PackageDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [packageDetails, setPackageDetails] = useState(null);
    const [courierName, setCourierName] = useState(null);
    const [status, setStatus] = useState('');

    // Define package status options
    const statusOptions = [
        "In preparation",
        "Taken over",
        "In transit",
        "In processing at sorting center",
        "Left sorting center",
        "Out for delivery",
        "Delivered",
        "Waiting for pickup",
        "Returned to sender",
        "Undelivered / Delivery failed",
        "Customs / Pending clearance",
        "Under investigation",
        "Canceled",
        "Transportation issue"
    ];

    useEffect(() => {
        // Fetch package and courier details
        axios.get(`http://localhost:8080/packages/${id}`)
            .then(response => {
                setPackageDetails(response.data);
                setStatus(response.data.status);
                return axios.get(`http://localhost:8080/couriers/${response.data.courierId}`);
            })
            .then(courierResponse => {
                setCourierName(courierResponse.data.name);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    // Handle status update
    const handleUpdateStatus = () => {
        const updatedPackage = { ...packageDetails, status };
        axios.put(`http://localhost:8080/packages/${id}`, updatedPackage)
            .then(response => {
                setPackageDetails(response.data);
            })
            .catch(error => console.error('Error updating status:', error));
    };

    // Handle package deletion with confirmation
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this package?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/packages/${id}`)
                .then(() => {
                    console.log("Package deleted");
                    navigate('/dashboard'); // Redirect to dashboard after deletion
                })
                .catch(error => console.error('Error deleting package:', error));
        } else {
            navigate('/dashboard'); // Redirect to dashboard if deletion is canceled
        }
    };

    if (!packageDetails) return <Typography>Loading...</Typography>;

    return (
        <>
            <Navbar />
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Package Details
                    </Typography>
                    <Typography variant="body1">
                        <strong>ID:</strong> {packageDetails.id}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Tracking Number:</strong> {packageDetails.trackingNumber}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Addressee:</strong> {packageDetails.addressee}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Description:</strong> {packageDetails.description}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Status:</strong> {packageDetails.status}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Creation Date:</strong> {new Date(packageDetails.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Updated:</strong> {new Date(packageDetails.updatedAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Courier:</strong> {courierName || "Loading courier..."}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            select
                            label="Status"
                            variant="outlined"
                            fullWidth
                            value={status}
                            onChange={handleStatusChange}
                            helperText="Select package status"
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleUpdateStatus}
                            sx={{ mt: 2 }}
                        >
                            Update Status
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={handleDelete}
                            sx={{ mt: 2 }}
                        >
                            Delete Package
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default PackageDetails;
