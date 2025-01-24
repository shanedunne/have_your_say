import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import PetitionCardNew from '../../components/PetitionCardNew';


function OpenPetitions() {
    

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            idth: "100%",
            height: "100vh",
            padding: 2,
        }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Open Petitions
            </Typography>
            <Grid>
                <PetitionCardNew />
            </Grid>
        </Box>
    )
} export default OpenPetitions;