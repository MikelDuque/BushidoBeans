
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useFetchEvent from "../endpoints/useFetchEvent";
import { LOGIN_URL } from "../endpoints/config";

const AuthContext = createContext({
    token: null,
    decodedToken: null,
    handleLogin: () => {},
    handleLogout: () => {},
    startExpCountdown: () => {}
});

export function useAuth() {return useContext(AuthContext)};

export function AuthProvider({ children }) {

    /* ----- HOOKS Y CONSTS ----- */

    const {fetchingData} = useFetchEvent();

    const [token, setToken] = useState(sessionStorage.getItem('accessToken'));
    const decodedToken = useRef(token ? jwtDecode(token) : null);
    
    const logoutTime = useRef(decodedToken.current?.exp *1000 - Date.now().valueOf() || 0);
    const {current: instance} = useRef({});
    

    useEffect(() => {
        if (token && logoutTime <= 0) startExpCountdown();

        return () => {instance.timer = cancelTimer();};
    }, [decodedToken]);


    /* ----- FUNCIONES ----- */

    function handleLogin(newToken) {
        if (newToken) {
            sessionStorage.setItem('accessToken', newToken);
            setToken(newToken);
            decodedToken.current = jwtDecode(newToken)     
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('accessToken');
        setToken(null);
        decodedToken.current = null;
    };


    /* ----- TOKEN EXPIRATION CONTROLL ----- */

    function startExpCountdown() { 
        console.log("entraste en countdown");
        
        if(!token) return;
        
        instance.timer = cancelTimer();
        instance.timer = setTimeout(() => {
            handleLogout();
            cancelCountdown();
        }, 30000);
        
        handleDomEvents(true);
        
    };

    function cancelCountdown() {
        instance.timer = cancelTimer();
        handleDomEvents(false);
        //relogin();    Sin un "Refresh token" no se puede terminar el componente...
    }

    async function relogin() {
        const loginData = {
            mail: decodedToken.current.email,
            password: decodedToken.current.password
        };    

        const data = await fetchingData({url: LOGIN_URL, type: 'POST', params:loginData, needAuth:false});

        if(data) handleLogin(data.accessToken);
    };

    function cancelTimer() {
        if (instance.timer) clearTimeout(instance.timer);   
        return 0;
    }

    function handleDomEvents(addOrRemove) {
        addOrRemove ? (
            window.addEventListener("click", cancelCountdown),
            window.addEventListener("mousemove", cancelCountdown),
            window.addEventListener("wheel", cancelCountdown),
            window.addEventListener("keydown", cancelCountdown)
        ) : (
            window.removeEventListener("click", cancelCountdown),
            window.removeEventListener("mousemove", cancelCountdown),
            window.removeEventListener("wheel", cancelCountdown),
            window.removeEventListener("keydown", cancelCountdown)
        );
    }


    /* ----- FINAL DEL CONTEXTO ----- */

    const contextValue = {
        token,
        decodedToken: decodedToken.current,
        handleLogin,
        handleLogout,
        startExpCountdown
    };

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};