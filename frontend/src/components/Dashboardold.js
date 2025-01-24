import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreatePetition from "../../components/CreatePetition";
import { Grid, Grid2 } from '@mui/material';




function Dashboard() {
    const [openPetitionModal, setOpenPetitionModal] = React.useState(false);
  const handleOpenPetitionModel = () => setOpenPetitionModal(true);
  const handleClosePetitionModal = () => setOpenPetitionModal(false);
    const history = useNavigate();

    const handleLogout = () => {
        history("/");
    }

    return (
        <Grid2 size={{ xs: 12, md: 12 }} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '6vh',
            margin: '0 auto',
        }}>
            <Grid2 size={{ xs: 6, md: 12 }}><h2>
                Welcome to the dashboard!
            </h2>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }} sx={{position: 'absolute', right: '10%'}}>
            <Button variant="contained" onClick={handleOpenPetitionModel}>
                Create Petition
            </Button>
            </Grid2>
            
            {/* CreatePetition Modal */}
            <CreatePetition open={openPetitionModal} handleOpen={handleOpenPetitionModel} handleClose={handleClosePetitionModal} />

        </Grid2>
    )
} export default Dashboard;