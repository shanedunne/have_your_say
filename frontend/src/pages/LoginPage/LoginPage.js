import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../services/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useAuth } from "../../services/authProvider";
import Cookies from 'js-cookie';
import ButtonAppBar from '../../components/AppBar';




function LoginPage() {
    const { login } = useAuth();
    // create states for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const navigate = useNavigate();

    const configureLogin = async () => {
        try {
            if (!email || !password) {
                setError("Please fill in all form fields");
                return;
            }

            console.log("calling api")
            // call axios post request
            const jwt = await handleLogin({
                email,
                password
            });
            console.log("from login: ", jwt)
            console.log("calling cookie setter")
            login(jwt);
            console.log("JwtToken in cookie:", Cookies.get("JwtToken"));


            navigate("/dashboard")


        } catch (error) {
            // Handle login error
            console.error('Login failed');
            setError('Invalid email or password');
        }
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <ButtonAppBar />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <Grid container spacing={2} sx={{ maxWidth: 300 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={configureLogin} fullWidth>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );


} export default LoginPage;