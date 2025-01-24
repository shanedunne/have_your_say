// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D9AE94', // Custom primary color
      contrastText: '#ffffff', // Text color for primary buttons
    },
    secondary: {
      main: '#9B9B7A', // Custom secondary color
      contrastText: '#000000',
    },
    background: {
      default: '#f4f6f8', // Page background
      paper: '#ffffff', // Card or paper background
    },
    text: {
      primary: '#333333',
      secondary: '#555555', 
    },
  },
  typography: {
    fontFamily: "Newsreader, serif", 
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 800,
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    button: {
      textTransform: 'none',
    },
  },
  spacing: 8, 
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
