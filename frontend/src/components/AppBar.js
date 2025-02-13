import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import theme from '../assets/theme';

export default function ButtonAppBar() {

  let navigate = useNavigate();



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Box
            onClick={() => navigate('/')}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" component="div" sx={{ mr: 2 }}>
              Have Your Say
            </Typography>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
