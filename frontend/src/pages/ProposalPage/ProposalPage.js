import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { handlelogout } from "../../services/api";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import OpenSnackBar from '../../components/SnackBar'


function ProposalPage({ title, category, body, startTime, closeTime, petitionId, status, proposalId }) {

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
                const response = await checkHasVotedPetition(petitionId);
                setHasVotedStatus(response);
                console.log(hasVotedStatus)
            } catch (error) {
                console.error("Error checking vote status:", error);
            }
        };
        if (open) {
            fetchVoteStatus();
        }

    }, [open, proposalId]);

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
            <Grid container spacing={2}>
                <Box sx={{
                    width: { xs: '100%', sm: 400, md: 550 }
                    , p: 2, mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} role="presentation">

                    <CardContent sx={{ paddingTop: '100px', fontFamily: theme.typography.fontFamily }}>
                        <Typography variant="h1" sx={{ mb: 2, fontWeight: "bold" }}>
                            {title}
                        </Typography>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{}}>
                                {category}
                            </Typography>
                            {getNowTime > startTime ? (
                                <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>Closing: {closeTime}</Typography>

                            ) : (
                                <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>Starting: {startTime}</Typography>
                            )}
                        </Grid>
                        {status === "open" ? (
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
                                    sx={{ mb: 1, color: theme.palette.secondary.main }}>{status}</Typography>
                            </Grid>

                        )}
                        <Grid item xs={12}>
                            <Typography variant="body1">{body}</Typography>
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
                        <Button sx={{ m: 1 }} variant="contained" size='large' onClick={submitVote}>Confirm</Button>
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



