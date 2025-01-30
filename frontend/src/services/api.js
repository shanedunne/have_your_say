import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

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
  community,
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
      community
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

    Cookies.set("JwtToken", jwt, { expires: 7 });

    return jwt;
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

// get open petitions for community associated with users cookie
export const getOpenPetitions = async () => {
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/petition/getOpen", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
  });
  return response.data;
}

// get open petitions for community associated with users cookie
export const getClosedPetitions = async () => {
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/petition/getClosed", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
  });
  return response.data;
}

// check if user has voted on petition
export const checkHasVotedPetition = async (petitionId) => {
  const userJwt = Cookies.get("JwtToken");
  try {
    const response = await axios.get("http://localhost:8080/petition/checkHasVoted", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
      params: { petitionId },
    });
    console.log(response.data);
    return response.data === true; 
  } catch (error) {
    console.error("Error in checking if user has voted on this petition", error);
    throw error;
  }
};

// submit petition vote
export const submitPetitionVote = async (decision, petitionId) => {
  const userJwt = Cookies.get("JwtToken");
  try {
    console.log("calling from the api")
    const response = await axios.post("http://localhost:8080/petition/vote",
    {},
     {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
      params: { decision, petitionId },
    });
    console.log("response from api")
    console.log(response.data)
  } catch (error) {
    console.error("Error in submitting vote", error);
    throw error;
  }
}
