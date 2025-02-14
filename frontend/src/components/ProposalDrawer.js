import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { checkHasVotedProposal } from '../services/api';
import { submitPetitionVote } from '../services/api';
import theme from '../assets/theme';
import ReactMarkdown from 'react-markdown';


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


export default function ProposalDrawer({ anchor = "right", open, onClose, title, body, category, closeTime, startTime, petitionId, proposalId, status }) {

  const [proposalDecision, setProposalDecision] = useState(null)
  const [hasVotedStatus, setHasVotedStatus] = useState(false);
  const [isEligible, setIsEligible] = useState(null);

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
    if (open) {
      fetchVoteStatus();
    }

  }, [open, proposalId]);


  const submitVote = async () => {
    try {
      console.log("submitting vote from frontend", proposalDecision, proposalId);
      // await submitPetitionVote(petitionDecision, petitionId);
      setTimeout(() => setOpenModal(false), 2000);
    } catch (error) {
      console.error("error submitting vote", error)
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
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
              {status === "open soon" ? (
                 <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>{startTime}</Typography>
              ) : (
                <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>{closeTime}</Typography>
              )
              }
             
            </Grid>
            {status === "open" ? (
              hasVotedStatus === false ? (
                <Grid className='votePetitions' item xs={12} sm={6} md={6} sx={{ mb: 2 }}>
                  <Button variant="outlined" value="support" sx={{ mr: 1 }} onClick={(e) => { handleOpen(); setProposalDecision(e.target.value); }}>Support</Button>
                  <Button variant="outlined" value="oppose" onClick={(e) => { handleOpen(); setProposalDecision(e.target.value); console.log(proposalDecision) }}>Oppose</Button>
                </Grid>
              ) : (
                <Grid >
                  <Box>
                    <Typography variant='h5' sx={{
                      mb: 2,
                      color: theme.palette.primary.main
                    }} >You have already voted on this petition.</Typography>
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
              <Typography variant="body1"  >
                <ReactMarkdown>
                  {body}
                </ReactMarkdown>
              </Typography>
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
            <Button sx={{ m: 1 }} variant="contained" size='large' onClick={() => { console.log("submit from here ") }}>Confirm</Button>
            <Button sx={{ m: 1 }} variant='contained' size='medium' color='error' onClick={() => { setProposalDecision(null); handleClose(); }}>Cancel</Button>
          </Box>
        </Modal>
      </Grid>
    </Drawer >
  );
}
