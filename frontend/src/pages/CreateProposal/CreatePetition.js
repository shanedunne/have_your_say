import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import OpenSnackBar from '../../components/SnackBar'
import { getFutureProposals } from '../../services/api';

import Modal from '@mui/material/Modal';
// import { handleCreatePetition } from '../../services/api';


function CreateProposal({ pathname }) {
    // create states for form fields
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [petition, setPetition] = useState({});
    const [futureProposals, setFutureProposals] = useState([]);

    const getFutureProposalData = async () => {
        let data = await getFutureProposals();
        setFutureProposals(data);
        console.log(data);
    }

    useEffect(() => {
        getFutureProposalData();
    }, []);


    
    
    // snackbar message for succesfully creating a petition
    const message = "Proposal successfully created";
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const navigate = useNavigate();

    // create category select options
    function createSelectOptions() {
        let selectOptions = [];
        for (let i = 0; i < futureProposals.length; i++) {
            selectOptions.push(<MenuItem key={i} value={futureProposals[i].id}>{futureProposals[i].title}</MenuItem>)
        }
        return selectOptions;
    }

    function onSelectedCategory(e) {
        console.log("Selected option: ", e.target.value);
    }

    /*
    const submitProposal = async () => {
        console.log("proposal submitted", title)


        // set timestamp for petition starting
        const startTime = Date.now();
        console.log(title, category, body, startTime)
        try {
            if (!title || !category || !body || !startTime) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            }

            const proposalSuccessfullyCreated = handleCreateProposal({ title, category, body, startTime });
            if (proposalSuccessfullyCreated) {
                setSnackBarOpen(true);
                setTimeout(() => window.location.reload(), 3000);
                
            } else {
                setError("Failed to create proposal, please try again");

            }
        } catch (error) {
            console.error("Creation of proposal failed")
            setError("Error creating proposal")
        }
    }
    */
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
                Create A Proposal
            </Typography>
            <Typography variant='body1' sx={{ textAlign: "center", mb: 2 }}>
                Provide your proposal in response to the supported petition below
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: {xs: '100%', sm: 400, md: 600} }}>
            <Grid item xs={12}>
                    <Select
                        displayEmpty
                        value={petition}
                        onChange={(e) => setPetition(e.target.value)}
                        sx={{
                            width: '50%',
                            justifyContent: 'center'
                        }}
                    >
                        {createSelectOptions()}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        type='text'
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>

                
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Proposal Content"
                        multiline
                        rows={6}
                        value={body}
                        defaultValue="Default Value"
                        onChange={(e) => setBody(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button variant="contained" onClick={(() => console.log("test"))}>
                        Submit Proposal
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



} export default CreateProposal;