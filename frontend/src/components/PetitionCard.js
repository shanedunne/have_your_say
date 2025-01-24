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
import { msToTimeShort } from '../util/msToTime';
import { truncateText } from '../util/truncateText';


function PetitionCard({title, category, body, closeTime}) {
    return(
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: "30%" }}>
            <Card sx={{ borderRadius: 1, p: 3 }}>
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "light" }}>
                    {category}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 1 }}
                  >
                    
                    {msToTimeShort(closeTime)}
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ p: 0, mb: 0 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {truncateText(body, 100)}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  href="#"
                  underline="none"
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
          </Grid>
    )
} export default PetitionCard;