import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getOpenProposals } from '../../services/api';
import ProposalCard from '../../components/ProposalCard';
import OpenPetitions from '../OpenPetitions/OpenPetitions';


function openProposals() {
    const [openProposals, setOpenProposals] = useState([]);

    useEffect(() => {
        populateProposals();
    }, []);

    const populateProposals = async () => {
        const proposalData = await getOpenProposals();
        setOpenProposals(proposalData);
        
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
                Open Proposals
            </Typography>
            <Grid container spacing={3}>
                {openProposals.map((proposal) => {
                    const comp = openProposals[proposal];
                    return <ProposalCard key={proposal.id} title={proposal.title} body={proposal.body} startTime={proposal.startTime} closeTime={proposal.closeTime} category={proposal.category} proposalId={proposal.id} status={proposal.status} petitionId={proposal.petitionId}/>
                })}
                
            </Grid>
        </Box>
    )
} export default OpenProposals;