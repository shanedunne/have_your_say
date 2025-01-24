import axios from "axios";
import Cookies from 'js-cookie';

// function to post details of new user
export const handleSignUp = async ({
  firstName,
  lastName,
  dateOfBirth,
  email,
  postcode,
  password,
  confirmedPassword,
  phoneNumber,
  region,
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
      region
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

// function to handle login by checking data on back end and setting cookie
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

// function to handle logging out and clearing cookie
export const handlelogout = async (
  JwtTokenName) => {
  Cookies.remove(JwtTokenName);
  console.log("cookie removed on logout")
  console.log('Remaining cookies:', Cookies.get());

};
// api call to post new petitions
export const handleCreatePetition = async ({
  title,
  category,
  body,
  startTime,
}) => {
  try {
    const userJwt = Cookies.get("JwtToken");
    const response = await axios.post("http://localhost:8080/petition/create", {
      title,
      category,
      body,
      startTime,
    },
    {
      // pass the token in the header to not expose it
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    });
    // return true if id assigned to petition
    if (response.data.id !== null) {
      return true;
    }
  } catch (error) {
    console.error("Error creating petition:", error);
    throw error;
  }
};

export const getPetitions = async () => {
  const now = new Date().getTime();
  const response = await axios.get("http://localhost:8080/petition/get", now);
  

  console.log(response.data)
  return response.data;
}