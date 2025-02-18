import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import theme from '../assets/theme';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Grid } from '@mui/material';
import {  msToTimeShortClosing } from '../util/msToTime';
import { truncateText } from '../util/truncateText';
import PetitionDrawer from './PetitionDrawer';


function PetitionCard({ title, category, body, closeTime, petitionId, status}) {

  // handle opening petition drawer
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleToggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4} >
      <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 1, p: 2, maxHeight: '300px', minHeight: '300px', minWidth: 280 }} >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {status === "open" ? (
            <Typography>{msToTimeShortClosing(closeTime)}</Typography>
          ) : (
            <Typography> </Typography>
          )}
          
        <Typography sx={{ color: status === "open" ? "green" : "red" }}>{status}</Typography>
        </Box>
        <CardContent sx={{ p: 0, mb: 0 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {truncateText(body, 100)}
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
      <PetitionDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => handleToggleDrawer(false)}
        title={title}
        body={body}
        category={category}
        closeTime={msToTimeShortClosing(closeTime)}
        petitionId={petitionId}
        status={status}
      />
    </Grid>


  )
} export default PetitionCard;