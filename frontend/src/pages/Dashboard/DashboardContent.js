import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useAuth } from "../../services/authProvider";
import PeopleIcon from "@mui/icons-material/People";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
// import theme if needed
import theme from "../../assets/theme";

function DashboardContent() {
  const { communityId, communityName, role } = useAuth();
  const [stats, setStats] = useState({ members: 0, petitions: 0, proposals: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        // const data = await fetchCommunityStats(communityId);
        // setStats(data);
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
          <Typography variant="h4" sx={{ mb: 1 }}>
            Welcome to the {communityName} Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Role: {role === "ROLE_ADMIN" ? "Administrator" : "Community Member"}
          </Typography>
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
                <Typography variant="h4">{stats.members}</Typography>
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
                <Typography variant="h4">{stats.members}</Typography>
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
                <Typography variant="h4">{stats.members}</Typography>
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
                <Typography variant="h4">{stats.members}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardContent;
