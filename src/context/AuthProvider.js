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
    if (!token || !id) return;
    setCookie("authToken", token, 1);
    setCookie("userId", id, 1);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie("authToken");
    deleteCookie("userId");
    setIsAuthenticated(false);
    window.location.reload();
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
