import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid2 } from '@mui/material';
import Modal from '@mui/material/Modal';
import { handleCreatePetition } from '../services/api';


function CreatePetition({ open, handleOpenPetitionModal, handleClosePetitionModal }) {
    // create states for form fields
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const categoryOptions = ["Infrastructure", "Transport", "Education", "Youth Services", "Health & Social Care", "Environment", "Housing", "Urban Development", "Local Business", "Culture & Recreation"];

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const navigate = useNavigate();

    // create category select options
    function createSelectOptions() {
        let selectOptions = [];
        for (let i = 0; i <= categoryOptions.length; i++) {
            selectOptions.push(<MenuItem value={categoryOptions[i]}>{categoryOptions[i]}</MenuItem>)
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
            if(!title || !category || !body || !startTime) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            } else {
                handleCreatePetition({title, category, body, startTime});
            }
            
            // handleCreatePetition({title, category, body, startTime})
            navigate('/dashboard')
        } catch (error) {
            console.error("Creation of petition failed")
            setError("Error creating petition")
        }
    }

    return (

        <Modal
            open={open}
            onClose={handleClosePetitionModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                margin: '0 auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
            }}>
                <Grid2 container spacing={2}>
                    <Typography variant="h4" >
                        Create A Petition
                    </Typography>
                    <Typography variant='p' sx={{pb: 2}}>
                        Do you have an idea to improve your community? Create a petition and if enough of your neighbours support it, your local representatives will consider it
                    </Typography>

                </Grid2>

                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 12 }} sx={{}}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            type='text'
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{width: '50%',
                                justifyContent: 'center'}}
                        >
                            {createSelectOptions()}
                        </Select>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Petition Content"
                            multiline
                            rows={6}
                            value={body}
                            defaultValue="Default Value"
                            onChange={(e) => setBody(e.target.value)}
                            sx={{width: '100%'}}
                        />
                    </Grid2>

                    {error && (
                        <Grid2 size={{ xs: 6, md: 6 }}>
                            <Typography color="error">{error}</Typography>
                        </Grid2>
                    )}

                    <Grid2 xs={12}>
                        <Button variant="contained" onClick={submitPetition}>
                            Submit Petition
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Modal>
    );



} export default CreatePetition;