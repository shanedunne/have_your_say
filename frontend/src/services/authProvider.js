import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [community, setCommunity] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();


  // handle refresh of page to keep logged in
  useEffect(() => {
    const token = Cookies.get("JwtToken");
    if (token) {
      const decodedJWT = jwtDecode(token);

      setIsAuthenticated(true);
      setCommunity(decodedJWT.community);
      setRole(decodedJWT.role);

    } else {
      setIsAuthenticated(false);
      setCommunity(null);
      setRole(null);
    }
  }, [Cookies.get("JwtToken")]);

  const login = (jwt) => {
    Cookies.set("JwtToken", jwt, { expires: 7 });

    const decodedJWT = jwtDecode(jwt);

    setIsAuthenticated(true);
    setCommunity(decodedJWT.community);
    setRole(decodedJWT.role);

  };

  const logout = () => {
    Cookies.remove("JwtToken");
    Cookies.remove("UserCommunity");
    Cookies.remove("UserRole");

    setIsAuthenticated(false);
    setCommunity(null);
    setRole(null)
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, community, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
