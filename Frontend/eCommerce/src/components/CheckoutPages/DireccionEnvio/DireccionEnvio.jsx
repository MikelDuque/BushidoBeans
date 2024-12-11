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
