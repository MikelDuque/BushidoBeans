
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
    const decodedToken = useRef(token ? jwtDecode(token) : "");
    
    useEffect(() => {
        //handleExpiration();
        
    }, []);


    /* ----- FUNCIONES ----- */

    function handleLogin(newToken) {
        if (newToken) {
            sessionStorage.setItem('token', newToken);
            setToken(newToken);
            
            navigateTo('/');
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('token');
        setToken(null);
        decodedToken.current = null;
    };

    function handleExpiration() {
        if(!decodedToken.current) return;

        const expirationDate = decodedToken.current.exp;
        const currentTime = Date.now().valueOf() / 1000;
        
        console.log(`exp date ${expirationDate}, current ${currentTime}`);

        if(expirationDate < currentTime) handleLogout();
    };


    /* ----- FINAL DEL CONTEXTO ----- */

    const contextValue = {
        token,
        decodedToken: decodedToken.current,
        handleLogin,
        handleLogout
    };

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};