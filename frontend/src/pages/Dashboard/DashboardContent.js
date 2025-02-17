import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useAuth } from "../../services/authProvider";
import PeopleIcon from "@mui/icons-material/People";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PetitionsPieChart from "../../components/PetitionsPieChart";
import theme from "../../assets/theme";
import { getCommunityStats } from "../../services/api";


// Example categories (static for now)
const categoryOptions = [
    "Infrastructure",
    "Transport",
    "Education",
    "Youth Services",
    "Health & Social Care",
    "Environment",
    "Housing",
    "Urban Development",
    "Local Business",
    "Culture & Recreation",
];

// Example mock petitions
const mockPetitions = [
    { id: 1, category: "Infrastructure", title: "Fix roads" },
    { id: 2, category: "Environment", title: "Clean parks" },
    { id: 3, category: "Transport", title: "More bus routes" },
    { id: 4, category: "Transport", title: "New bike lanes" },
    { id: 5, category: "Education", title: "More school funding" },
    // etc...
];

function DashboardContent() {
    const { communityId, communityName, role } = useAuth();
    const [memberCount, setMemberCount] = useState();
    const [totalVotes, setTotalVotes] = useState();
    const [petitionsApproved, setPetitionsApproved] = useState();
    const [proposalsApproved, setProposalsApproved] = useState();
    const [petitionCategories, setPetitionCategories] = useState({});
    const [petitions, setPetitions] = useState([]);


    useEffect(() => {
        async function fetchStats() {
            try {
                const stats = await getCommunityStats(communityId);
                console.log(stats);
                setMemberCount(stats.memberCount);
                setTotalVotes(stats.proposalVoteCount + stats.petitionVoteCount);
                setPetitionsApproved(stats.approvedPetitions);
                setProposalsApproved(stats.approvedProposal);
                setPetitionCategories(stats.petitionCategoryTally);
            } catch (error) {
                console.error("Error fetching community stats:", error);
            }
        }
        fetchStats();
    }, [communityId]);

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12}>
                    <Box
                        sx={{
                            p: 3,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                            Welcome to the {communityName} Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Role: {role === "ROLE_ADMIN" ? "Administrator" : "Community Member"}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                            }}
                        >
                            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                                <PeopleIcon fontSize="large" color="primary" />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle1">Total Members</Typography>
                                <Typography variant="h4">{memberCount}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                            }}
                        >
                            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                                <HowToVoteIcon fontSize="large" color="success" />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle1">Total Votes</Typography>
                                <Typography variant="h4">{totalVotes}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                            }}
                        >
                            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                                <CheckCircleIcon fontSize="large" color="warning" />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle1">Approved Petitions</Typography>
                                <Typography variant="h4">{petitionsApproved}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                            }}
                        >
                            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                                <DoneAllIcon fontSize="large" color="secondary" />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle1">Approved Proposals</Typography>
                                <Typography variant="h4">{proposalsApproved}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <PetitionsPieChart petitionCategories={petitionCategories} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default DashboardContent;
