import './App.css';
import React, { useEffect, useState } from "react";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import SignUpPage from './pages/SignUpPage';


import getGreeting from './services/api';


function App() {

  const [dataFromApi, setDataFromApi] = useState();
  useEffect(() => {
    getGreeting().then((data) => {
      console.log(data.content)
      setDataFromApi(data.content);
      console.log(dataFromApi)
    })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // Monitor changes in dataFromApi
  useEffect(() => {
    console.log("Updated dataFromApi:", dataFromApi);
  }, [dataFromApi]);


  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <SignUpPage />

    </ThemeProvider>
  );
}

export default App;
