import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { handlelogout } from '../services/api';

export default function ButtonAppBar() {

  let navigate = useNavigate();

  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
