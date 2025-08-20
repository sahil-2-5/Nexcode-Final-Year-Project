import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3030/user/data", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Set user data in context
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          localStorage.removeItem("token"); // Remove invalid token
        }
      }
    };

    initializeUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/user/login",
        { email, password },
        { withCredentials: true }
      );
      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data);
        return data ;
      } else {
        throw new Error("Invalid login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      return null ;
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/"); // Redirect to home or login page
  // };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
