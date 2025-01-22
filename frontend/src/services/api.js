import axios from "axios";
import Cookies from 'js-cookie';


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
    console.log(response)
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

    const { jwt } = response.data;

    Cookies.set("JwtToken", jwt, { expires: 7, secure: true })

    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

export const handlelogout = async (
  JwtTokenName) => {
  Cookies.remove(JwtTokenName);
  console.log("cookie removed on logout")
  console.log('Remaining cookies:', Cookies.get());

};

export const handleCreatePetition = async ({
  title,
  category,
  body,
  startTime,
  userJwt,
}) => {
  try {
    const userJwt = Cookies.get("JwtToken");
    const response = await axios.post("http://localhost:8080/createpetition", {
      title,
      category,
      body,
      startTime,
      userJwt,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error creating petition:", error);
    throw error;
  }
};