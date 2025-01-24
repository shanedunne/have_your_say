import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";


function OpenSnackBar({ message, open, onClose }) {
    // snackbox for successful creation of petition

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={onClose}
            ><Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
            </Snackbar>
        </Box>
    )
} export default OpenSnackBar;