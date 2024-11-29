import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";
import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";


function DireccionEnvio() {
    const [direcciones, setDirecciones] = useState([]);
    const [cargando, setCargando] = useState(true); 
    const handleObtenerId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null; 
        const decodedToken = jwt_decode.jwtDecode(token);
        return decodedToken.id;
    };

    const userId = handleObtenerId();

    const handleObtenerDirecciones = async () => {
        if (!userId) {
            console.error("No se pudo obtener el ID del usuario.");
            setCargando(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:7015/api/Address/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setDirecciones(data);
            } else {
                console.error("Error al obtener las direcciones:", response.statusText);
            }
        } catch (error) {
            console.error("Error al obtener las direcciones:", error);
        } finally {
            setCargando(false); 
        }
    };

    useEffect(() => {
        handleObtenerDirecciones();
    }, []);

    return (
        <>
            <p className="subtitulo">Mis Direcciones</p> <br />
            {cargando ? (
                <p>Cargando direcciones...</p>
            ) : direcciones.length > 0 ? (
                <ListaDirecciones direcciones={direcciones} />
            ) : (
                <p className="subtitulo">No tienes direcciones guardadas. ¡Añade una nueva dirección!</p>
            )}
            <AnadirDireccion />
        </>
    );
}

export default DireccionEnvio;