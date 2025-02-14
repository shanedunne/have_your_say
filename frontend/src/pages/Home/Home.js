import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import theme from "../../assets/theme";
import ButtonAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";



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
                        backgroundColor: theme.palette.third.main,
                        color: theme.palette.primary.contrastText,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: { xs: "100vh", sm: "100vh" },
                        margin: 0,
                        padding: 0
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        Welcome to Have Your Say!
                    </Typography>
                    <Typography
                        variant="subtitle"
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

                    <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                        How It Works
                    </Typography>
                    <Box
                        component="ol"
                        sx={{
                            textAlign: "left",
                            mt: 3,
                            color: theme.palette.primary.contrastText,
                            maxWidth: { xs: "90%", sm: "70%" },
                        }}
                    >
                        <Typography component="li" sx={{ mb: 2, color: theme.palette.primary.contrastText }}>
                            <strong>Petitions</strong>: Group members can create petitions to address
                            issues or propose changes. Each petition requires a predetermined quota
                            of support votes before being escalated to representatives. Users can
                            vote to support or oppose petitions, enabling direct engagement.
                        </Typography>
                        <Typography component="li" sx={{ mb: 2, color: theme.palette.primary.contrastText }}>
                            <strong>Proposals</strong>: When a petition meets its support quota,
                            representatives must respond with a formal proposal. This response can be
                            either:
                            <ul>
                                <li>An explaination of why the petition is not viable,</li>
                                <li>An Outline of an actionable proposal based on the petition’s goals.</li>
                            </ul>
                            Once submitted, users vote on the proposal’s outcome, and
                            representatives are expected to act on the result, ensuring
                            accountability and progress.
                        </Typography>
                        <Typography component="li" sx={{ color: theme.palette.primary.contrastText }} >
                            <strong>Integrations</strong>: An integrations section will track and
                            document the progress of successful proposals as they move toward
                            implementation.
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            textAlign: "center",
                            maxWidth: { xs: "90%", sm: "70%" },
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        ---------------------------------------
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            lineHeight: 1.8,
                            textAlign: "center",
                            maxWidth: { xs: "90%", sm: "70%" },
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        Whether you're part of a regional community, club, society or company,
                         use your voice and be heard. Implement <strong>Have Your Say</strong> now, 
                         the platform you deserve!
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
            <Footer />
        </Box>
    )
} export default HomePage;