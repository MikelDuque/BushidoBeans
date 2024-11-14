import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);
    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        navigate('/');
    };
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
