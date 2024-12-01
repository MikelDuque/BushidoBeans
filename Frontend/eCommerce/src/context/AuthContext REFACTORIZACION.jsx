
import { createContext, useContext, useEffect, useState } from "react";
import { LOGIN_URL, REGISTER_URL } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        
        
    }, []);

    function login(user) {
        const { fetchData, isLoading, error } = useFetch({Url:LOGIN_URL, type:'POST', params:user});

        handleToken(fetchData)
    };

    function handleToken(newToken) {
        setToken(newToken);
        setDecodedToken(jwtDecode(newToken));
        localStorage.setItem('token', newToken);
    };

    function logout() {
        
    };

    // Variable para obtener el valor de caducidad: decodedToken.exp

    const contextValue = {
        token,
        decodedToken,
        login,
        logout
    }

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};

export function useAuth() {useContext(AuthContext)};