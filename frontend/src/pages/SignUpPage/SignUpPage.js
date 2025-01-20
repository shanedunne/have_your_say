import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from '../../services/api'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';
import './SignUpPage.css'


function SignUpPage() {
    // create states for form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [postcode, setPostcode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accessCode, setAccessCode] = useState("");

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    // const histpry = useNavigate();

    const configureSignUp = async () => {
        try {
            if (!firstName || !lastName || !dateOfBirth || !email || !postcode || !password || !confirmedPassword || !phoneNumber || !accessCode) {
                setError("Please fill in all form fields");
                return;
            }

            // ensure password and confirmation are the same
            if (password !== confirmedPassword) {
                throw new Error("Passwords do not match");
            }

            // call axios post request
            handleSignUp(firstName,
                lastName,
                dateOfBirth,
                email,
                postcode,
                password,
                confirmedPassword,
                phoneNumber,
                accessCode);


        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
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
            <Grid2 container spacing={2}>
            <Typography variant="h4" gutterBottom>
                Sign Up Form
            </Typography>

            </Grid2>
            
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLasttName(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="Date of Birth"
                        variant="outlined"
                        fullWidth
                        placeholder="DD-MM-YYYY"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="Postcode"
                        variant="outlined"
                        fullWidth
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 4 }}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6, md: 4 }}>
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        label="Access Code"
                        variant="outlined"
                        fullWidth
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </Grid2>

                {error && (
                    <Grid2 size={{ xs: 6, md: 6 }}>
                        <Typography color="error">{error}</Typography>
                    </Grid2>
                )}

                <Grid2 xs={12}>
                    <Button variant="contained" onClick={configureSignUp}>
                        Sign Up
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );


} export default SignUpPage;