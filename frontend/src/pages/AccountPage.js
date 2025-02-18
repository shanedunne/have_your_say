import { React, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { getAccountInfo } from "../services/api";
import { useAuth } from "../services/authProvider";

const AccountPage = () => {
    const [accountInfo, setAccountInfo] = useState({});
    const { role, communityId, communityName } = useAuth();

    useEffect(() => {

        async function getData() {

            try {
                const info = await getAccountInfo();
                console.log('Getting account info')

                setAccountInfo(info);
            } catch (error) {
                console.error("error getting account info", error)
            }
    }
        getData();

    }, [])



    return (
        <Box sx={{ p: 3 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Account Details
                    </Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                First Name
                            </Typography>
                            <Typography variant="body1">{accountInfo.firstName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Last Name
                            </Typography>
                            <Typography variant="body1">{accountInfo.lastName}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Date of Birth
                            </Typography>
                            <Typography variant="body1">{accountInfo.dateOfBirth}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Community
                            </Typography>
                            <Typography variant="body1">{communityName}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Role
                            </Typography>
                            <Typography variant="body1">{accountInfo.role}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Email
                            </Typography>
                            <Typography variant="body1">{accountInfo.email}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountPage;
