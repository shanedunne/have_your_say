import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import PetitionCard from '../../components/PetitionCard';
import { getPetitions } from '../../services/api';


function OpenPetitions() {
    const [openPetitions, setOpenPetitions] = useState([]);

    useEffect(() => {
        populatePetitions();
    }, []);

    const populatePetitions = async () => {
        const petitionData = await getPetitions();
        setOpenPetitions(petitionData);
        
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
                Open Petitions
            </Typography>
            <Grid container spacing={3}>
                {openPetitions.map((petition) => {
                    const comp = openPetitions[petition];
                    return <PetitionCard title={petition.title} body={petition.body} closeTime={petition.closeTime} category={petition.category}/>
                })}
                
            </Grid>
        </Box>
    )
} export default OpenPetitions;