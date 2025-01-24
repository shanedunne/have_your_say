import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ArticleDrawer({ anchor = "right", open, onClose, title, body, category, closeTime }) {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{
        width: 550, p: 2, mb: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }} role="presentation">
        <CardContent sx={{ paddingTop: '100px' }}>
          <Typography variant="h1" sx={{ mb: 2, fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{}}>
            {category}
          </Typography>
          <Typography variant="subtitle1" sx={{paddingBottom: '20px'}}>{closeTime}</Typography>

          


          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Box>
    </Drawer>
  );
}
