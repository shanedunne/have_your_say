import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("JwtToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const testJwt = "test-jwt-token";
    Cookies.set("JwtToken", testJwt, { expires: 7 });
    console.log("Test Cookie:", Cookies.get("JwtToken")); // Should log "test-jwt-token"
  }, []);
  

  const login = (jwt) => {
    if (!jwt) {
        console.error("Invalid JWT:", jwt); // Log if JWT is undefined or null
        return;
      }
    console.log("Setting cookie with JWT:", jwt); // Debug log

    Cookies.set("JwtToken", jwt, { expires: 7});
    console.log("Cookie after setting:", Cookies.get("JwtToken")); // Check if it is set

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("JwtToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
