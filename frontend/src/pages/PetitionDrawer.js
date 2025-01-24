import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function ArticleDrawer({ anchor = "right", open, onClose, title, body, category, closeTime }) {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ width: 550, p: 2 }} role="presentation">
      <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
            {category}
          </Typography>
          <Typography variant="subtitle1">{closeTime}</Typography>
        
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Box>
    </Drawer>
  );
}
