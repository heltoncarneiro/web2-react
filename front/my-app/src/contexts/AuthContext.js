import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect runs when the component mounts and whenever the token changes.
        // If the token is cleared (e.g., by the interceptor or logout),
        // this will ensure the user state is also cleared.
        if (!token) {
            setUser(null);
        }
        // A real app would have a /users/me endpoint to fetch user data
        // and verify the token is still valid on app load.
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        // User data could be fetched here
    };

    const register = async (email, password) => {
        await api.post('/auth/register', { email, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null); // This will trigger the useEffect to clear the user
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
