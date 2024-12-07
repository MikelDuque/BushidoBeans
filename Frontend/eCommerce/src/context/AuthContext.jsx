
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    token: null,
    decodedToken: null,
    handleLogin: () => {},
    handleLogout: () => {}
});

export function useAuth() {return useContext(AuthContext)};

export function AuthProvider({ children }) {
    const navigateTo = useNavigate()

    const [token, setToken] = useState(sessionStorage?.getItem('token') || null);
    const decodedToken = useRef(null);

    useEffect(() => {
  
    }, [token]);

    function handleLogin(newToken) {
        console.log("new token", newToken);
        
        if (newToken) {
            setToken(newToken);
            decodedToken.current = jwtDecode(newToken);
            sessionStorage.setItem('token', newToken);
            navigateTo('/');
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('token');
        setToken(null);
    };

    // La variable para obtener el valor de caducidad es decodedToken.exp

    const contextValue = {
        token,
        decodedToken,
        handleLogin,
        handleLogout
    };

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};