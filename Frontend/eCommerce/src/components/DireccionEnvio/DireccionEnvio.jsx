import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";
import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { GET_USER_BY_ID } from "../../endpoints/config";
import { useAuth } from '../../context/AuthContext.jsx';


function DireccionEnvio() {
    const [direcciones, setDirecciones] = useState(null);
    const [cargando, setCargando] = useState(true); 
    const [userId, setUserId]= useState(null);
    const [user, setUser]= useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const tokenId = localStorage.getItem('accessToken');
        if (tokenId) {
            try {
                const decodedToken = jwt_decode.jwtDecode(token);
                console.log(decodedToken)
                setUser(decodedToken.unique_name);  
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        } else {
            console.error("Error al decodificar el token");
        }
    }, []); 

    console.log("userID", userId);
    

        async function getUserAddress(){
            try {
                const response = await fetch(GET_USER_BY_ID(userId), {
                });
                const data = await response.json();
                console.log("data",data.address);
                setDirecciones(data.address);
            } catch (error) {
                alert(error.message);
            }};
            
            
        
    

    useEffect(() => {
        getUserAddress();
    }, [user]);

    return (
        <>
            <p className="subtitulo">Mis Direcciones</p> <br />
            {cargando ? (
                <p>Cargando direcciones...</p>
            ) : direcciones === null ? (
                <>
                <div>{direcciones}</div>
                <ListaDirecciones direcciones={direcciones} />
                </>
            ) : (
                <p className="subtitulo">No tienes direcciones guardadas. ¡Añade una nueva dirección!</p>
            )}
            <AnadirDireccion />
        </>
    );
}

export default DireccionEnvio;