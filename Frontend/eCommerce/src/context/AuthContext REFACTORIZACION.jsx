
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REGISTER_URL } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

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






    const login = (token) => {  // Funcion para guardar el token en el localstorage.
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        navigate('/');  //Una vez se inicie sesion, navegamos hacia el inicio.
    };
    const logout = () => {
        localStorage.removeItem('accessToken'); //Para el logout,  eliminamos el token del localestorage.
        setIsAuthenticated(false);
        navigate('/login'); //Navegamos de vuelta al login
    };

    return (    //Aqui definimos los valores que estaran disponibles para cualquier componente que consuma este contexto. Children es todo el contenido que el AuthProvider envuelve.
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);   //Este hook facilita al contexto el acceso desde cualquier componente. En vez de escribir siempre useContext(AuthContext) basta con usar useAuth() para obtener: 
                                                        // isAuthenticated, login, logout.