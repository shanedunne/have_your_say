import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getOpenProposals } from '../../services/api';
import ProposalCard from '../../components/ProposalCard';
import OpenPetitions from '../OpenPetitions/OpenPetitions';
import theme from '../../assets/theme';


function OpenProposals() {
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
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2, color: theme.typography.color }}>
                Open Proposals
            </Typography>
            {openProposals.length === 0 ? (
                <Typography variant='h5'>There are currently no open proposals at this time.</Typography>

            ) : (
                <Grid container spacing={3}>
                    {openProposals.map((proposal) => {
                        const comp = openProposals[proposal];
                        return <ProposalCard key={proposal.id} title={proposal.title} body={proposal.body} startTime={proposal.startTime} closeTime={proposal.endTime} category={proposal.category} proposalId={proposal.id} status={proposal.status} petitionId={proposal.petitionId} />
                    })}

                </Grid>
            )}

        </Box>
    )
} export default OpenProposals;