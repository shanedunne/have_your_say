import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import OpenSnackBar from '../../components/SnackBar'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { getFutureProposals } from '../../services/api';
import { handleCreateProposal } from '../../services/api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import theme from '../../assets/theme';
// import { handleCreatePetition } from '../../services/api';


function CreateProposal({ pathname }) {
    // create states for form fields
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [petition, setPetition] = useState(null);
    const [petitionId, setPetitionId] = useState("");
    const [futureProposals, setFutureProposals] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const getFutureProposalData = async () => {
        let data = await getFutureProposals();
        setFutureProposals(data);
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

    // hangle change in select
    function hanleSelectChange(e) {
        console.log("Selected option: ", e.target.value);
    }

    // call api to post proposal
    const submitProposal = async () => {
        console.log("proposal submitted", title)

        console.log("title: " + title)
        console.log("category: " + category)
        console.log("body: " + body)
        console.log("start: " + startTime)
        console.log("end: " + endTime)
        console.log("id: " + petitionId)
        try {
            if (!title || !petition?.category || !body || !startTime || !endTime || !petition?.id) {
                console.log("missing fields")
                setError("Please fill in all fields");
                return;
            }

            const proposalSuccessfullyCreated = handleCreateProposal({ title, category: petition.category, body, startTime, endTime, petitionId: petition.id });
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

    // close snackbar
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };

    // convert date to ms
    const handleStartTime = (date) => {
        setStartTime(dayjs(date).startOf('day').valueOf());
    };

    const handleEndTime = (date) => {
        setEndTime(dayjs(date).endOf('day').valueOf());
    }


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
                Create A Proposal
            </Typography>
            <Typography variant='body1' sx={{ textAlign: "center", mb: 2 }}>
                Provide your proposal in response to the supported petition below
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: { xs: '100%', sm: 400, md: 600 } }}>
                <Grid item xs={12}>
                    <InputLabel id="supported-petition-select">Select supported petition</InputLabel>

                    <Select
                        labelId="supported-petition-select"
                        id="supported-petition-select"
                        displayEmpty
                        value={petition?.id || ""}
                        onChange={(e) => {
                            const selected = futureProposals.find(p => p.id === e.target.value);
                            setPetition(selected || {});
                        }}
                        sx={{
                            width: '80%',
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={6}>
                        <DatePicker
                            label="Proposal Start Date"
                            value={startTime ? dayjs(startTime) : null}
                            onChange={(newDate) => handleStartTime(newDate)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <DatePicker
                            label="Proposal End Date"
                            value={endTime ? dayjs(endTime) : null}
                            onChange={(newDate) => handleEndTime(newDate)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>
                </LocalizationProvider>

                <Grid xs={12}>
                    <Typography variant='caption' sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        ml: 3,
                        mt: 1,
                    }}><InfoOutlinedIcon fontSize='small' sx={{ color: theme.palette.primary.main }} /> Voting will commence at 00:00 of your chosen start date and end at 23:59 on the end date</Typography>
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
                    <Button variant="contained" onClick={submitProposal}>
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