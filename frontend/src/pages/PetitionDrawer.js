import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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


export default function ArticleDrawer({ anchor = "right", open, onClose, title, body, category, closeTime }) {

  let petitionDecision;

  const setPetitionDecision = (decision) => {
    petitionDecision = decision;
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

          <CardContent sx={{ paddingTop: '100px' }}>
            <Typography variant="h1" sx={{ mb: 2, fontWeight: "bold" }}>
              {title}
            </Typography>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Typography variant="h5" sx={{}}>
                {category}
              </Typography>
              <Typography variant="subtitle1" sx={{ paddingBottom: '20px' }}>{closeTime}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ mb: 2 }}>
              <Button variant="outlined" value="support" sx={{ mr: 1 }} onClick={(e) => { handleOpen(); setPetitionDecision(e.target.value); console.log(petitionDecision)}}>Support</Button>
              <Button variant="outlined" value="oppose" onClick={(e) => { handleOpen(); setPetitionDecision(e.target.value); console.log(petitionDecision)}}>Oppose</Button>
            </Grid>
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
            Are you sure you want to {petitionDecision} this petition? This decision is final.
          </Typography>
          <Button sx={{m: 1}} variant="contained" size='large'>Confirm</Button>
          <Button sx={{m: 1}} variant='contained' size='medium' color='error' onClick={() => { setPetitionDecision(null); handleClose(); }}>Cancel</Button>
        </Box>
      </Modal>
      </Grid>
    </Drawer >
  );
}
