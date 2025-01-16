import './App.css';
import React, { useEffect, useState } from "react";
import SignUpPage from './pages/SignUpPage';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme'



function App() {

  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar />
      <SignUpPage />
      </ThemeProvider>
  );
}

export default App;
