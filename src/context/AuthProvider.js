import React, { createContext, useContext, useState, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "../helpers/cookies/cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token, id) => {
    setIsAuthenticated(true);
    setCookie("authToken", token, 1);
    setCookie("userId", id, 1);
  };

  const logout = () => {
    setIsAuthenticated(false);
    deleteCookie("authToken");
    deleteCookie("userId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
