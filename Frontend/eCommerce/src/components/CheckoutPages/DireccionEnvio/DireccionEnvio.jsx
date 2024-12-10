import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";
import { useEffect, useState } from "react";
import { GET_ADDRESSES_BY_USER_ID } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext.jsx";
import useFetch from "../../../endpoints/useFetch.js";

function DireccionEnvio() {
    const {token, decodedToken} = useAuth();
    const userId = decodedToken?.id || 0;

    const [direcciones, setDirecciones] = useState(null);
    //const [cargando, setCargando] = useState(true);

    const {fetchData, isLoading} = useFetch({url: GET_ADDRESSES_BY_USER_ID(userId), type: 'GET', token: token, needAuth:true});

    useEffect(() => {
        setDirecciones(fetchData);

    }, [fetchData]);

    /*
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
    */

    /*
    useEffect(() => {
        if (userId) {
            const getUserAddresses = async () => {
                try {
                    const response = await fetch(GET_ADDRESSES_BY_USER_ID(userId), {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    

                    if (!response.ok) {
                        throw new Error("Error al obtener las direcciones");
                    }

                    const data = await response.json();
                    console.log("data direcciones", data);
                    
                    setDirecciones(data || []);
                    setCargando(false);
                } catch (error) {
                    setCargando(false);
                }
            };

            getUserAddresses();
        }
    }, [cargando]);
    */

    return (
        <>
            <p className="subtitulo">Mis Direcciones</p>
            <br />
            {isLoading ? (
                console.log("direcciones", direcciones),
                <p>Cargando direcciones...</p>
            ) : direcciones?.length > 0 ? (
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
