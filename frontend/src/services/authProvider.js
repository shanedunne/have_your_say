import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();


  // handle refresh of page to keep logged in
  useEffect(() => {
    const token = Cookies.get("JwtToken");
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  const login = (jwt) => {
    Cookies.set("JwtToken", jwt, { expires: 7});

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
