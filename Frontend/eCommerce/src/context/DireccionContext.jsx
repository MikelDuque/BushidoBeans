import React, { createContext, useContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode"; // Importamos jwt-decode

const DireccionContext = createContext();

// Hook para usar el contexto
export const useDirecciones = () => useContext(DireccionContext);

// Proveedor del contexto
export const DireccionProvider = ({ children }) => {
    const [direcciones, setDirecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerIdDesdeToken = () => {
        const token = localStorage.getItem("token"); 
        if (token) {
            try {
                const decoded = jwt_decode.jwtDecode(token); 
                return decoded.id; 
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        return null;
    };

    const cargarDirecciones = async () => {
        const id = obtenerIdDesdeToken(); 
        if (id) {
            try {
                setLoading(true);
                // Usamos el id para hacer la llamada al endpoint
                const response = await fetch(`https://localhost:7015/api/Address/${id}`);
                const data = await response.json();
                setDirecciones(data);
            } catch (error) {
                console.error("Error al cargar direcciones:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarDirecciones(); 
    }, []);

    return (
        <DireccionContext.Provider value={{ direcciones, setDirecciones, loading }}>
            {children}
        </DireccionContext.Provider>
    );
};
