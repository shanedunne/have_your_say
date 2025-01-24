import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import OpenSnackBar from './SnackBar'

import Modal from '@mui/material/Modal';
import { handleCreatePetition } from '../services/api';


function CreatePetition({ pathname }) {
    // create states for form fields
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const categoryOptions = ["Infrastructure", "Transport", "Education", "Youth Services", "Health & Social Care", "Environment", "Housing", "Urban Development", "Local Business", "Culture & Recreation"];

    // snackbar message for succesfully creating a petition
    const message = "Petition successfully created";
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const navigate = useNavigate();

    // create category select options
    function createSelectOptions() {
        let selectOptions = [];
        for (let i = 0; i <= categoryOptions.length; i++) {
            selectOptions.push(<MenuItem key={i} value={categoryOptions[i]}>{categoryOptions[i]}</MenuItem>)
        }
        return selectOptions;
    }

    function onSelectedCategory(e) {
        console.log("Selected option: ", e.target.value);
    }

    const submitPetition = async () => {
        console.log("petition submitted", title)


        // set timestamp for petition starting
        const startTime = Date.now();
        console.log(title, category, body, startTime)
        try {
            if (!title || !category || !body || !startTime) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            }

            const petitionSuccessfullyCreated = handleCreatePetition({ title, category, body, startTime });
            if (petitionSuccessfullyCreated) {
                setSnackBarOpen(true);
                setTimeout(() => window.location.reload(), 3000);
                
            } else {
                setError("Failed to create petition, please try again");

            }
        } catch (error) {
            console.error("Creation of petition failed")
            setError("Error creating petition")
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
            idth: "100%",
            height: "100vh",
            padding: 2,
            backgroundColor: "#f9f9f9",
        }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Create A Petition
            </Typography>
            <Typography variant='body1' sx={{ textAlign: "center", mb: 2 }}>
                Do you have an idea to improve your community? Create a petition and if enough of your neighbours support it, your local representatives will consider it
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: "600px", width: "100%" }}>
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
                    <Select
                        displayEmpty
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                        id="outlined-multiline-static"
                        label="Petition Content"
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
                    <Button variant="contained" onClick={submitPetition}>
                        Submit Petition
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



} export default CreatePetition;