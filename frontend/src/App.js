import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Home/Home';
import ButtonAppBar from './components/AppBar';
import { AppProvider } from '@toolpad/core/AppProvider';
import theme from './assets/theme.js'





function App() {

  return (
    <div className='App'>
      <BrowserRouter >
       <AppProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
