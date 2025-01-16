// api.js
import axios from 'axios';

const greetingUrl = "http://localhost:8080/greeting";

// This function returns a Promise
const getGreeting = () => {
  return axios
    .get(greetingUrl)
    .then((response) => {
      return response.data; 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export default getGreeting;
