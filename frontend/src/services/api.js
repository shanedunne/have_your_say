// api.js
import axios from "axios";

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

export const handleSignUp = async ({
  firstName,
  lastName,
  dateOfBirth,
  email,
  postcode,
  password,
  confirmedPassword,
  phoneNumber,
  accessCode,
}) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/signup", {
      firstName,
      lastName,
      dateOfBirth,
      email,
      postcode,
      password,
      confirmedPassword,
      phoneNumber,
      accessCode
    });
    return response.data;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

export const handleLogin = async ({ 
  email,
  password,
}) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};
export default getGreeting;
