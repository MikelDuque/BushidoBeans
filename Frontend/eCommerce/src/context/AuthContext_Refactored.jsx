
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LOGIN_URL, REGISTER_URL } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const decodedToken = useRef(null);

    useEffect(() => {
        getTokenFromSession();
        
    }, [token]);

    function login(loginRequest) {
        const { fetchData:backendToken } = useFetch({Url:LOGIN_URL, type:'POST', params:loginRequest});

        handleToken(backendToken);
    };

    function register(newUser) {
        const { fetchData:backendToken } = useFetch({Url:REGISTER_URL, type:'POST', params:newUser});

        handleToken(backendToken);
    };

    function handleToken(newToken) {
        setToken(newToken);
        decodedToken.current = jwtDecode(newToken);
        sessionStorage.setItem('token', newToken);
    };

    function getTokenFromSession() {
        setToken(sessionStorage.getItem('token') || []);
    }

    function logout() {
        sessionStorage.removeItem('token');
        setToken([]);
        setDecodedToken(null);
    };

    // Variable para obtener el valor de caducidad: decodedToken.exp

    const contextValue = {
        token,
        decodedToken,
        login,
        register,
        logout
    }

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};

export function useAuth() {useContext(AuthContext)};