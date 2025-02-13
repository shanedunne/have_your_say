import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import theme from "../../assets/theme";
import ButtonAppBar from "../../components/AppBar";



function HomePage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <ButtonAppBar />
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
                <Box sm={12} m={9}
                    sx={{
                        flex: 3,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: { xs: "50%", sm: "100vh" },
                        margin: 0
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        Welcome to Have Your Say!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            textAlign: "center",
                            maxWidth: { xs: "90%", sm: "70%" },
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        Have Your Say is the ultimate platform for empowering communities to
                        voice their opinions and make meaningful decisions. Create petitions,
                        vote on proposals, and actively participate in shaping the future of
                        your community.
                    </Typography>
                </Box>
                <Box sm={12} m={3}
                    sx={{
                        flex: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: { xs: "50%", sm: "100vh" },
                        margin: 0,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.main
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Get Started
                    </Typography>
                    <span>
                        <Button variant="outlined" color="inherit" size='large' onClick={() => navigate('/login')} sx={{ mr: 1, color: theme.palette.secondary.main }} >Login</Button>
                        <Button variant="outlined" color="inherit" size='large' onClick={() => navigate('/signup')} sx={{ ml: 1, color: theme.palette.secondary.main }}>Signup</Button>
                    </span>

                </Box>
            </Box>
        </Box>
    )
} export default HomePage;