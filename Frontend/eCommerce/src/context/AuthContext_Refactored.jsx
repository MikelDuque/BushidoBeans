
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => {useContext(AuthContext)};

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(getTokenFromSession());
    const isLoggedIn = useRef(false)
    const decodedToken = useRef(null);

    useEffect(() => {
        
        
    }, [token]);

    function handleToken(newToken) {
        setToken(newToken);
        decodedToken.current = jwtDecode(newToken);
        sessionStorage.setItem('token', newToken);
    };

    function getTokenFromSession() {
        const sessionToken = sessionStorage.getItem('token') || [];
        setToken(JSON.parse(sessionToken));
    }

    function logout() {
        sessionStorage.removeItem('token');
    };

    // Variable para obtener el valor de caducidad: decodedToken.exp

    const contextValue = {
        token,
        decodedToken,
        isLoggedIn
    }

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};