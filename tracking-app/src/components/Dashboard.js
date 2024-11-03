// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const Dashboard = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from the backend
    axios.get('http://localhost:8080/packages')
        .then(response => setPackages(response.data))
        .catch(error => console.error('Error fetching packages:', error));
  }, []);

  return (
      <>
        <Navbar />
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={3}>
              {packages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                    <Card>
                      <CardContent>
                        <Typography color="textPrimary">Tracking Number: {pkg.trackingNumber}</Typography>
                        <Typography color="textSecondary">Status: {pkg.status}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            component={Link}
                            to={`/packages/${pkg.id}`}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </>
  );
};

export default Dashboard;
