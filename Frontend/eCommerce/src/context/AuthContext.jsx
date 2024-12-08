
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useFetchEvent from "../endpoints/useFetchEvent";

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
    const {fetchingData} = useFetchEvent();

    const [token, setToken] = useState(sessionStorage.getItem('accessToken'));
    const decodedToken = useRef(token ? jwtDecode(token) : null);
    //const logoutTimer = useRef(decodedToken?.exp - Date.now().valueOf() / 1000 || 0);
    
    useEffect(() => {
        
    }, [token]);


    /* ----- FUNCIONES ----- */

    function handleLogin(newToken) {
        if (newToken) {
            sessionStorage.setItem('accessToken', newToken);
            setToken(newToken);          
            
            navigateTo('/');
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('accessToken');
        setToken(null);
        decodedToken.current = null;
    };


    function tokenExpControl() {
        window.addEventListener(clearTimeout(logoutCountdown));

        const logoutCountdown = setTimeout(() => {
            handleLogout();
        }, 15000);

        clearTimeout(logoutCountdown);
        window.removeEventListener(clearTimeout(logoutCountdown));

        if(token) relogin();
    };

    async function relogin() {
        const loginData = {
            mail: decodedToken.current.mail,
            password: decodedToken.current.password
        };

        const data = await fetchingData({url: LOGIN_URL, type: 'POST', params:loginData});

        if(data) handleLogin(data.accessToken);
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