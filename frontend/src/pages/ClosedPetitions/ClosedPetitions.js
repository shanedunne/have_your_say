import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import PetitionCard from '../../components/PetitionCard';
import { getClosedPetitions } from '../../services/api';


function ClosedPetitions() {
    const [closedPetitions, setClosedPetitions] = useState([]);

    useEffect(() => {
        populatePetitions();
    }, []);

    const populatePetitions = async () => {
        const petitionData = await getClosedPetitions();
        setClosedPetitions(petitionData);

    }

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
                Closed Petitions
            </Typography>
            {closedPetitions.length === 0 ? (
                <Typography variant='h5'>No petitions have closed yet</Typography>
            ) : (
                <Grid container spacing={3}>
                {closedPetitions.map((petition) => {
                    const comp = closedPetitions[petition];
                    return <PetitionCard key={petition.id} title={petition.title} body={petition.body} closeTime={petition.closeTime} category={petition.category} petitionId={petition.id} status={petition.status} />
                })}

            </Grid>
            )}
        </Box>
    )
} export default ClosedPetitions;