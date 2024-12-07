
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

    /* ----- HOOKS Y CONSTS ----- */

    const navigateTo = useNavigate()

    const [token, setToken] = useState(sessionStorage?.getItem('token') || null);
    const decodedToken = useRef(token ||null);

    
    useEffect(() => {
        if (token) {
            decodingToken();
            handleExpiration();
            console.log("decoded", decodedToken.current);
        };
    }, [token]);


    /* ----- FUNCIONES ----- */

    function handleLogin(newToken) {
        console.log("new token", newToken);
        
        if (newToken) {
            sessionStorage.setItem('token', newToken);
            setToken(newToken);
            //decodingToken();
            
            navigateTo('/');
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('token');
        setToken(null);
    };

    function decodingToken() {
        decodedToken.current = token ? jwtDecode(token) : null;
    }

    function handleExpiration() {
        const expiration = decodedToken.current;

        console.log(expiration);
        
    }

    // La variable para obtener el valor de caducidad es decodedToken.exp

    const contextValue = {
        token,
        decodedToken: decodedToken.current,
        handleLogin,
        handleLogout
    };

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};