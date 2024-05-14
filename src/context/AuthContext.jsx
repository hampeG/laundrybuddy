import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that wraps your app and provides an auth object
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();  // Using useNavigate for redirection within React Router

    // Function to log in a user
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/login', { email, password });
            const { data } = response;
            if (data.token) {
                localStorage.setItem('token', data.token);  // Store the token in localStorage
                setUser({ email, role: data.role });  // Simplified user object
                setLoading(false);
                navigateTo('/dashboard');  // Redirect to a dashboard route after login
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
            // Handle errors (e.g., show an error message)
        }
    };

    // Function to log out a user
    const logout = () => {
        localStorage.removeItem('token');  // Clear the token from localStorage
        setUser(null);
        setLoading(false);
        navigateTo('/login');  // Redirect to the login page after logout
    };

    // Effect to check session on component mount
    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Example API endpoint for session validation
                    const response = await axios.get('/api/check-session', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { data } = response;
                    setUser({ email: data.email, role: data.role });  // Update the user state based on session check
                    setLoading(false);
                } catch (error) {
                    console.error('Session check failed:', error);
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
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
