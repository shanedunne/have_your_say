import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../services/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';


function LoginPage() {
    // create states for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    // const histpry = useNavigate();

    const configureLogin = async () => {
        try {
            if (!email || !password) {
                setError("Please fill in all form fields");
                return;
            }

            // call axios post request
            handleLogin({
                email,
                password
            });


        } catch (error) {
            // Handle login error
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid email or password');
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
                Login
            </Typography>

            </Grid2>
            
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 10, md: 12 }} sx={{}}>
                <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid2>

                <Grid2 size={{ xs: 10, md: 12 }}>
                <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid2>

                {error && (
                    <Grid2 size={{ xs: 6, md: 6 }}>
                        <Typography color="error">{error}</Typography>
                    </Grid2>
                )}

                <Grid2 xs={12}>
                    <Button variant="contained" onClick={configureLogin}>
                        Login
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );


} export default LoginPage;