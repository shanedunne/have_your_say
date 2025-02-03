import React, { useState, useEffect, useParams } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import OpenSnackBar from '../../components/SnackBar'
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { checkHasVotedProposal } from '../../services/api';
import theme from '../../assets/theme';
import { getProposalById } from '../../services/api';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
};




function ProposalPage() {
    const { proposalId } = useParams(); // Get ID from URL
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchProposal() {
      try {
        const data = await getProposalById(proposalId);
        setProposal(data);
      } catch (error) {
        console.error("Error fetching proposal:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProposal();
  }, [proposalId]);

    // snackbar message for succesfully creating a petition
    const message = "Successfully casted vote on proposal";
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [proposalDecision, setProposalDecision] = useState(null)
    const [hasVotedStatus, setHasVotedStatus] = useState(false);

    const getNowTime = async () => {
        return new Date().getTime();
    }

    useEffect(() => {
        const fetchVoteStatus = async () => {
            try {
                const response = await checkHasVotedProposal(proposalId);
                setHasVotedStatus(response);
                console.log(hasVotedStatus)
            } catch (error) {
                console.error("Error checking vote status:", error);
            }
        };

    }, [proposalId]);

    let navigate = useNavigate();

    // close snackbar
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: "100vh",
            padding: 2,
        }}>
            <Grid container spacing={2}>
                <Box sx={{
                    p: 2, mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} role="presentation">

                    <CardContent sx={{ paddingTop: '100px', fontFamily: theme.typography.fontFamily }}>
                        <Typography variant="h1" sx={{ mb: 2, fontWeight: "bold" }}>
                            {proposal.title}
                        </Typography>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{}}>
                                {proposal.category}
                            </Typography>
                            {getNowTime > proposal.startTime ? (
                                <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>Closing: {proposal.closeTime}</Typography>

                            ) : (
                                <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>Starting: {proposal.startTime}</Typography>
                            )}
                        </Grid>
                        {proposal.status === "open" ? (
                            hasVotedStatus === false ? (
                                <Grid className='voteProposal' item xs={12} sm={6} md={6} sx={{ mb: 2 }}>
                                    <Button variant="outlined" value="support" sx={{ mr: 1 }} onClick={(e) => { handleOpen(); setProposalDecision(e.target.value); }}>Support</Button>
                                    <Button variant="outlined" value="oppose" onClick={(e) => { handleOpen(); setProposalDecision(e.target.value); console.log(proposalDecision) }}>Oppose</Button>
                                </Grid>
                            ) : (
                                <Grid >
                                    <Box>
                                        <Typography variant='h5' sx={{
                                            mb: 2,
                                            color: theme.palette.primary.main
                                        }} >You have already voted on this proposal.</Typography>
                                    </Box>

                                </Grid>
                            )
                        ) : (
                            <Grid>
                                <Typography variant='h5'
                                    sx={{ mb: 1, color: theme.palette.secondary.main }}>{proposal.status}</Typography>
                            </Grid>

                        )}
                        <Grid item xs={12}>
                            <Typography variant="body1">{proposal.body}</Typography>
                        </Grid>
                    </CardContent>
                </Box >
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please Confirm Your Decision
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ m: 2 }}>
                            Are you sure you want to {proposalDecision} this proposal? This decision is final.
                        </Typography>
                        <Button sx={{ m: 1 }} variant="contained" size='large' onClick={(() => console.log("this will submit vote"))}>Confirm</Button>
                        <Button sx={{ m: 1 }} variant='contained' size='medium' color='error' onClick={() => { setProposalDecision(null); handleClose(); }}>Cancel</Button>
                    </Box>
                </Modal>
            </Grid>
            <OpenSnackBar
                message={message}
                open={snackBarOpen}
                onClose={handleSnackBarClose}
            />
        </Box>
    )
} export default ProposalPage;



