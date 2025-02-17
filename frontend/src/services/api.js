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
      phoneNumber
    }, {
      params: { accessCode },
    }

    );
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

// PETITION API FUNCTIONS


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
  const now = new Date().getTime();
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/petition/getOpen", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
    params: { now },
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

// get open petitions for community associated with users cookie
export const getFutureProposals = async () => {
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/petition/getFutureProposals", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
  });
  return response.data;
}

// check if user is elegible to vote
export const checkIfEligiblePetition = async (petitionId) => {
  const userJwt = Cookies.get("JwtToken");
  console.log("petition id:" + petitionId)
  try {
    const response = await axios.get("http://localhost:8080/petition/checkIfEligible", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
      params: { petitionId },
    });
    console.log(response.data);
    return response.data === true;
  } catch (error) {
    console.error("Error in checking if user is eligible to vote on petition", error);
    throw error;
  }
};

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

// PROPOSAL API FUNCTIONS

// api call to post new proposal
export const handleCreateProposal = async ({
  title,
  category,
  body,
  startTime,
  closeTime,
  petitionId
}) => {
  try {
    const userJwt = Cookies.get("JwtToken");
    const response = await axios.post("http://localhost:8080/proposal/create", {
      title,
      category,
      body,
      startTime,
      closeTime,
      petitionId
    },
      {
        // pass the token in the header to not expose it
        headers: {
          Authorization: `Bearer ${userJwt}`,
        },
      });
    // return true if id assigned to proposal
    if (response.data.id !== null) {
      return true;
    }
  } catch (error) {
    console.error("Error creating petition:", error);
    throw error;
  }
};

// get open proposals for community associated with users cookie
export const getOpenProposals = async () => {
  const now = new Date().getTime();
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/proposal/getOpen", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
    params: { now },
  });
  return response.data;
}

// get closed proposals for community associated with users cookie
export const getClosedProposals = async () => {
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get("http://localhost:8080/proposal/getClosed", {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
  });
  return response.data;
}

// check if user is elegible to vote
export const checkIfEligIbleProposal = async (proposalId) => {
  const userJwt = Cookies.get("JwtToken");
  try {
    const response = await axios.get("http://localhost:8080/proposal/checkIfEligible", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
      params: { proposalId },
    });
    console.log(response.data);
    return response.data === true;
  } catch (error) {
    console.error("Error in checking if user is eligIble to vote on proposal", error);
    throw error;
  }
};

// check if user has voted on petition
export const checkHasVotedProposal = async (proposalId) => {
  const userJwt = Cookies.get("JwtToken");
  try {
    const response = await axios.get("http://localhost:8080/proposal/checkHasVoted", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
      params: { proposalId },
    });
    console.log(response.data);
    return response.data === true;
  } catch (error) {
    console.error("Error in checking if user has voted on this proposal", error);
    throw error;
  }
};

export const getProposalById = async (proposalId) => {
  const userJwt = Cookies.get("JwtToken");
  const response = await axios.get(`http://localhost:8080/proposal/${proposalId}`, {
    headers: {
      Authorization: `Bearer ${userJwt}`,
    },
  });
  return response.data;
};


// COMMUNITY APIS
export const handleCreateCommunity = async ({
  name,
  admins,
  groupType,
  petitionQuota,
  petitionTimeframe,
  proposalTimeframe,
  accessCode
}) => {
  try {
    const userJwt = Cookies.get("JwtToken");
    const response = await axios.post("http://localhost:8080/community/create", {
      name,
      admins,
      groupType,
      petitionQuota,
      petitionTimeframe,
      proposalTimeframe,
      accessCode
    },
      {
        // pass the token in the header to not expose it
        headers: {
          Authorization: `Bearer ${userJwt}`,
        },
      });
    // return true if id assigned to community
    if (response.data.id !== null) {
      return true;
    }
  } catch (error) {
    console.error("Error creating community:", error);
    throw error;
  }
}

// STATS
export const getCommunityStats = async (communityId) => {
  try {
    const response = await axios.get("http://localhost:8080/community/stats", {
      params: {
        communityId
      },
    })
    return response.data;
  } catch(error) {
    console.log("error getting community stats", error)
    throw error;
  }
} 