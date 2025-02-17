import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getOpenPetitions, getOpenProposals } from "../services/api";
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { msToTimeShortClosing } from '../util/msToTime';
import { truncateText } from '../util/truncateText';
import PetitionDrawer from './PetitionDrawer';


const ClosingSoonCard = () => {
    const [closingSoon, setClosingSoon] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



    useEffect(() => {
        async function getData() {
            try {
                const petitions = await getOpenPetitions();
                const proposals = await getOpenProposals();

                const allOpenItems = [...petitions, ...proposals];

                if (allOpenItems.length > 0) {
                    const soonest = allOpenItems.reduce((prev, curr) =>
                        curr.closingTime < prev.closingTime ? curr : prev
                    );
                    setClosingSoon(soonest);
                } else {
                    setClosingSoon(null);
                }

            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [])



    // handle opening petition drawer
    const handleToggleDrawer = (open) => {
        setIsDrawerOpen(open);
    };



    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Closing Soon
                </Typography>
                <Box sx={{ width: "100%", height: 300, pb: 1 }}>
                    <Grid >
                        {closingSoon ? (
                            <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 1, p: 2, maxHeight: '300px', minHeight: '300px' }}>
                                <Box
                                    sx={{
                                        mb: 2,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {closingSoon.status === "open" ? (
                                        <Typography>{msToTimeShortClosing(closingSoon.closeTime)}</Typography>
                                    ) : (
                                        <Typography> </Typography>
                                    )}

                                    <Typography sx={{ color: closingSoon.status === "open" ? "green" : "red" }}>{closingSoon.status}</Typography>
                                </Box>
                                <CardContent sx={{ p: 0, mb: 0 }}>
                                    <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                                        {closingSoon.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {truncateText(closingSoon.body, 70)}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mt: 'auto'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleToggleDrawer(true)}
                                        sx={{
                                            display: "inline-flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="text.primary"
                                            sx={{ fontWeight: "bold", ml: 2, fontSize: "18px" }}
                                        >
                                            View Petition
                                        </Typography>
                                    </Button>
                                </Box>
                            </Card>
                        ): (
                        <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 1, p: 2, maxHeight: '300px', minHeight: '300px' }}>
                            <Box
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >



                                <CardContent sx={{ p: 0, mb: 0 }}>
                                    <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                                        No open items
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Come back soon to see new petitions and proposals
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                        )}
                        {closingSoon && (
                            <PetitionDrawer
                            anchor="right"
                            open={isDrawerOpen}
                            onClose={() => handleToggleDrawer(false)}
                            title={closingSoon.title}
                            body={closingSoon.body}
                            category={closingSoon.category}
                            closeTime={msToTimeShortClosing(closingSoon.closeTime)}
                            petitionId={closingSoon.petitionId}
                            status={closingSoon.status}
                        />
                        )}
                        
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}; export default ClosingSoonCard;