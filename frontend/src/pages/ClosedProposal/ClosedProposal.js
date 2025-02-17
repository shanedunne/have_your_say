import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ProposalCard from '../../components/ProposalCard';
import { getClosedProposals } from '../../services/api';


function ClosedProposals() {
    const [closedProposals, setClosedProposals] = useState([]);

    useEffect(() => {
        populateProposals();
    }, []);

    const populateProposals = async () => {
        const proposalData = await getClosedProposals();
        setClosedProposals(proposalData);

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
                Closed Proposals
            </Typography>
            {closedProposals.length === 0 ? (
                <Typography variant='h5'>No proposals have closed yet</Typography>
            ) : (
                <Grid container spacing={3}>
                {closedProposals.map((proposal) => {
                    const comp = closedProposals[proposal];
                    return <ProposalCard key={proposal.id} title={proposal.title} body={proposal.body} startTime={proposal.startTime} closeTime={proposal.closeTime} category={proposal.category} proposalId={proposal.id} status={proposal.status} petitionId={proposal.petitionId} />
                })}

            </Grid>
            )}
            
        </Box>
    )
} export default ClosedProposals;