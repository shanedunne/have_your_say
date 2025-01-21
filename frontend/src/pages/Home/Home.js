import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



function HomePage() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '100vh',
            margin: '0 auto',
        }}>
            <h2>
                Welcome to the Have Your Say!
            </h2>
            <p>Please login or signup</p>

        </Box>
    )
} export default HomePage;