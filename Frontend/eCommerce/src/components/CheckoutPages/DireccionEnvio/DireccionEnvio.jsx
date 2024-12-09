import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";
import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { GET_ALL_ADDRESSES_BY_ID } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext.jsx";

function DireccionEnvio() {
    const [direcciones, setDirecciones] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [userId, setUserId] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const tokenId = localStorage.getItem("accessToken");
        if (tokenId) {
            try {
                const decodedToken = jwt_decode.jwtDecode(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        } else {
            console.error("Token no encontrado en localStorage");
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            const getUserAddresses = async () => {
                try {
                    const response = await fetch(GET_ALL_ADDRESSES_BY_ID(userId), {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Error al obtener las direcciones");
                    }

                    const data = await response.json();
                    setDirecciones(data.address || []);
                    setCargando(false);
                } catch (error) {
                    console.error("Error al obtener las direcciones:", error);
                    setCargando(false);
                }
            };

            getUserAddresses();
        }
    }, [userId, token]);

    return (
        <>
            <p className="subtitulo">Mis Direcciones</p>
            <br />
            {cargando ? (
                <p>Cargando direcciones...</p>
            ) : direcciones && direcciones.length > 0 ? (
                <>
                    <ListaDirecciones direcciones={direcciones} />
                </>
            ) : (
                <p className="subtitulo">
                    No tienes direcciones guardadas. ¡Añade una nueva dirección!
                </p>
            )}
            <AnadirDireccion />
        </>
    );
}

export default DireccionEnvio;
