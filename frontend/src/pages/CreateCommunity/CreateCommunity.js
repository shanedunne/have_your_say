import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import OpenSnackBar from '../../components/SnackBar'
import CustomizedSlider from '../../components/PercentSlide';
import NoOfDaysSelect from '../../components/NoOfDaysSelect';

import Modal from '@mui/material/Modal';
import { handleCreateCommunity } from '../../services/api';

function CreateCommunity({ pathname }) {
    // create states for form fields
    const [name, setName] = useState("");
    const [admins, setAdmins] = useState([]);
    const [adminInput, setAdminInput] = useState("");
    const [groupType, setGroupType] = useState("");
    const [petitionQuota, setPetitionQuota] = useState("");
    const [petitionTimeframe, setPetitionTimeframe] = useState("");
    const [proposalTimeframe, setProposalTimeframe] = useState("");
    const [accessCode, setAccessCode] = useState("");
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

    // handle adding multiple admin
    const addAdmin = () => {
        if (adminInput.trim() === "") {
            setError("Admin email cannot be empty");
            return;
        }
        if (admins.includes(adminInput)) {
            setError("This email is already added");
            return;
        }
        setAdmins([...admins, adminInput.trim()]);
        setAdminInput("");
    };

    const removeAdmin = (email) => {
        setAdmins(admins.filter((admin) => admin !== email));
    };

    function onSelectedCategory(e) {
        console.log("Selected option: ", e.target.value);
    }

    const submitCommunity = async () => {
        console.log("community submitted", name)

        try {
            if (!name || admins.length === 0 || !groupType || !petitionQuota || !petitionTimeframe || !accessCode || !proposalTimeframe) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            }


            const communitySuccessfullyCreated = handleCreateCommunity({
                name,
                admins,
                groupType,
                petitionQuota,
                petitionTimeframe,
                proposalTimeframe,
                accessCode
            });
            if (communitySuccessfullyCreated) {
                setSnackBarOpen(true);
                setTimeout(() => window.location.reload(), 2000);

            } else {
                setError("Failed to create community, please try again");
            }



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
            maxWidth: { xs: '100%', sm: 400, md: 600 },
            height: "100vh",
            padding: 2,
        }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Create A Community
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: { xs: '100%', sm: 400, md: 600 } }}>
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

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="community-type">Conmmunity Type</InputLabel>
                        <Select
                            id='community-type'
                            labelId="community-type"
                            label={'Community Type'}
                            value={groupType}
                            onChange={(e) => setGroupType(e.target.value)}
                        >
                            {createSelectOptions()}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ mb: 2 }} gutterBottom>Petition Quota</Typography>
                    <CustomizedSlider value={petitionQuota} onChange={setPetitionQuota} />
                </Grid>
                <Grid item xs={6}>
                    <NoOfDaysSelect value={petitionTimeframe} onChange={setPetitionTimeframe} label={'Petition Timeframe'} />
                </Grid>
                <Grid item xs={6}>
                    <NoOfDaysSelect value={proposalTimeframe} onChange={setProposalTimeframe} label={'Proposal Timeframe'} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Access Code For Sign Ups"
                        variant="outlined"
                        type='text'
                        fullWidth
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Admin Email Address"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={adminInput}
                        onChange={(e) => setAdminInput(e.target.value)}
                    />
                    <Button sx={{ mt: 1 }} variant="outlined" onClick={addAdmin}>
                        Add Admin
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Admin Emails</Typography>
                    <List>
                        {admins.map((email, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => removeAdmin(email)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button variant="contained" onClick={submitCommunity}>
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