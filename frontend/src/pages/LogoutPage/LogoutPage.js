import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { handlelogout } from "../../services/api";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import OpenSnackBar from '../../components/SnackBar'


function Logout() {

    // snackbar message for succesfully creating a petition
    const message = "Successfully logged out";
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    let navigate = useNavigate();

    const logout = () => {
        handlelogout("JwtToken")
        setSnackBarOpen(true);
        setTimeout(() => navigate('/'), 3000);
    };

    // close snackbar
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: { xs: '100%', sm: 400, md: 600 },
            height: "100vh",
            padding: 2,
        }}>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Click below to Logout
            </Typography>
            <Button variant="outlined" color="inherit" size='large' onClick={logout}>Logout</Button>
            <OpenSnackBar
                message={message}
                open={snackBarOpen}
                onClose={handleSnackBarClose}
            />
        </Box>
    )
} export default Logout;



