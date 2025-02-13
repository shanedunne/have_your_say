import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getOpenProposals } from '../../services/api';
import ProposalCard from '../../components/ProposalCard';
import OpenPetitions from '../OpenPetitions/OpenPetitions';


function Integrations() {
    const [integrations, setIntegrations] = useState([]);



    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            idth: "100%",
            height: "100vh",
            padding: 2,
        }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Integrations
            </Typography>
            <Typography variant='h5'>Coming soon...</Typography>

        </Box>
    )
} export default Integrations;