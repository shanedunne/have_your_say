import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import OpenSnackBar from '../../components/SnackBar'
import CustomizedSlider from '../../components/PercentSlide';
import NoOfDaysSelect from '../../components/NoOfDaysSelect';

import Modal from '@mui/material/Modal';
import { handleCreatePetition } from '../../services/api';


function CreateCommunity({ pathname }) {
    // create states for form fields
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState([]);
    const [groupType, setGroupType] = useState("");
    const [petitionQuota, setPetitionQuota] = useState("");
    const [petitionTimeframe, setPetitionTimeframe]= useState("");
    const [proposalQuota, setProposalQuota] = useState("");
    const [proposalTimeframe, setProposalTimeframe] = useState("");
    const communityTypeOptions = ["Local Government", "Company", "Company Subdivision", "Society", "Club", "School", "Local Community"];

    // snackbar message for succesfully creating a community
    const message = "Community successfully created";
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const navigate = useNavigate();

    // create category select options
    function createSelectOptions() {
        let selectOptions = [];
        for (let i = 0; i <= communityTypeOptions.length; i++) {
            selectOptions.push(<MenuItem key={i} value={communityTypeOptions[i]}>{communityTypeOptions[i]}</MenuItem>)
        }
        return selectOptions;
    }

    function onSelectedCategory(e) {
        console.log("Selected option: ", e.target.value);
    }

    const submitPetition = async () => {
        console.log("petition submitted", name)


        // set timestamp for petition starting
        const startTime = Date.now();
        try {
            if (!name || !admin || !groupType || !petitionQuota || !petitionTimeframe || !proposalQuota || !proposalTimeframe) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            }

            /*
            const communitySuccessfullyCreated = handleCreateCommunity({});
            if (communitySuccessfullyCreated) {
                setSnackBarOpen(true);
                setTimeout(() => window.location.reload(), 2000);
                
            } else {
                setError("Failed to create community, please try again");
            }                

                */
            
        } catch (error) {
            console.error("Creation of community failed")
            setError("Error creating community")
        }
    }
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
            maxWidth: {xs: '100%', sm: 400, md: 600},
            height: "100vh",
            padding: 2,
        }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Create A Community
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: {xs: '100%', sm: 400, md: 600} }}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        type='text'
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Select
                        displayEmpty
                        value={groupType}
                        onChange={(e) => setGroupType(e.target.value)}
                        sx={{
                            width: '50%',
                            justifyContent: 'center'
                        }}
                    >
                        {createSelectOptions()}
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{mb: 2}} gutterBottom>Petition Quota</Typography>
                    <CustomizedSlider value={petitionQuota} onChange={setPetitionQuota} />
                </Grid>
                <Grid item xs={6}>
                <NoOfDaysSelect value={petitionTimeframe} onChange={setPetitionTimeframe} label={'Petition Timeframe'}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{mb: 2}} gutterBottom>Proposal Quota</Typography>
                    <CustomizedSlider value={proposalQuota} onChange={setProposalQuota} />
                </Grid>
                <Grid item xs={6}>
                <NoOfDaysSelect value={proposalTimeframe} onChange={setProposalTimeframe} label={'Proposal Timeframe'}/>
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button variant="contained" onClick={(() => {console.log("form submit")})}>
                        Create Community
                    </Button>
                </Grid>
            </Grid>
            <OpenSnackBar
                message={message}
                open={snackBarOpen}
                onClose={handleSnackBarClose}
            />
        </Box>

    );



} export default CreateCommunity;