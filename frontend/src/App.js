import './App.css';
import React, { useEffect, useState } from "react";
import getGreeting from './api';


function App() {

  const [dataFromApi, setDataFromApi] = useState();
  useEffect(() =>
  {
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
    <div>
      {dataFromApi}
    </div>
  );
}

export default App;
