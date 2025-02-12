import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [communityId, setCommunityId] = useState(null);
  const [role, setRole] = useState(null);
  const [communityName, setCommunityName] = useState(null);
  const navigate = useNavigate();


  // handle refresh of page to keep logged in
  useEffect(() => {
    const token = Cookies.get("JwtToken");
    if (token) {
      const decodedJWT = jwtDecode(token);

      setIsAuthenticated(true);
      setCommunityId(decodedJWT.communityId);
      setRole(decodedJWT.role);
      setCommunityName(decodedJWT.communityName)

    } else {
      setIsAuthenticated(false);
      setCommunityId(null);
      setRole(null);
      setCommunityName(null);
    }
  }, []);

  const login = (jwt) => {
    Cookies.set("JwtToken", jwt, { expires: 7 });

    const decodedJWT = jwtDecode(jwt);

    setIsAuthenticated(true);
    setCommunityId(decodedJWT.communityId);
    setRole(decodedJWT.role);
    setCommunityName(decodedJWT.communityName)

  };

  const logout = () => {
    Cookies.remove("JwtToken");

    setIsAuthenticated(false);
    setCommunityId(null);
    setRole(null)
    setCommunityName(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, communityId, role, communityName }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
