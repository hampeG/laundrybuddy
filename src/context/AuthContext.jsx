import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that wraps app and provides an auth object
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Using useNavigate for redirection within React Router

  // Function to log in a user
  const login = async (email, password, redirectPath) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, _id, role } = response.data;
      if (token) {
        localStorage.setItem("authToken", token); // Store the token in localStorage
        setUser({ _id, email, role }); // Simplified user object with user ID
        setLoading(false);
        navigate(redirectPath); // Redirect to a home route after login
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      // Handle errors (e.g., show an error message)
    }
  };

  // Function to log out a user
  const logout = () => {
    localStorage.removeItem("authToken"); // Clear the token from localStorage
    setUser(null);
    setLoading(false);
    navigate("/login"); // Redirect to the login page after logout
  };

  // Effect to check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // Example API endpoint for session validation
          const response = await axios.get("/api/check-session", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { _id, email, role } = response.data;
          setUser({ _id, email, role }); // Update the user state based on session check
          setLoading(false);
        } catch (error) {
          console.error("Session check failed:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Value provided to context consumers
  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
