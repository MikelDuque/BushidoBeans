/*
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REGISTER_URL } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = {eMail: null, password: null};
    
    const { fetchData } = useFetch({Url:LOGIN_URL, type:'POST', params:user});

    useEffect(() => {
        //Detectamos el token de autentificacion. useEffect se carga una vez ejecutado el componente.
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);   //Si el token existe = autentificacion = true.
        }
    }, []);

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
*/