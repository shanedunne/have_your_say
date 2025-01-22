import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreatePetition from "../../components/CreatePetition";



function Dashboard() {
    const [openPetitionModal, setOpenPetitionModal] = React.useState(false);
  const handleOpenPetitionModel = () => setOpenPetitionModal(true);
  const handleClosePetitionModal = () => setOpenPetitionModal(false);
    const history = useNavigate();

    const handleLogout = () => {
        history("/");
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '100vh',
            margin: '0 auto',
        }}>
            <h2>
                Welcome to the dashboard!
            </h2>
            <Button variant="contained" onClick={handleOpenPetitionModel}>
                Create Petition
            </Button>
            {/* CreatePetition Modal */}
            <CreatePetition open={openPetitionModal} handleOpen={handleOpenPetitionModel} handleClose={handleClosePetitionModal} />

        </Box>
    )
} export default Dashboard;