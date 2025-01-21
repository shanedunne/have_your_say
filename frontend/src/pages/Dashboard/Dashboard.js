import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



function Dashboard() {
    const history = useNavigate();

    const handleLogout = () => {
        history("/");
    }

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
                Welcome to the dashboard!
            </h2>

        </Box>
    )
} export default Dashboard;