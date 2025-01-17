import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <ButtonAppBar />
    <App />
    </ThemeProvider>
  </React.StrictMode>
);