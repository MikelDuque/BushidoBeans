import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import Input from "../../Input";
import { POST_ADDRESS } from "../../../endpoints/config";
import Alert from "../../Alert/Alert"; 
import "./AñadirDireccion.css";
import { useAuth } from '../../../context/AuthContext';
function AñadirDireccion() {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        pais: "",
        telefono: "",
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwt_decode.jwtDecode(token);
                console.log(decodedToken) 
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        } else {
            console.error("Error al decodificar el token");
        }
    }, []); 

    const [alertMessage, setAlertMessage] = useState(""); 
    const [showAlert, setShowAlert] = useState(false); 
    const [userId, setUserId]= useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    const handleAñadirDireccion = async (e) => {
        e.preventDefault();

        try {
            //const tokenUser = localStorage.getItem("token");

            const nuevaDireccion = {
                userId: userId,
                addressee: `${formData.nombre} ${formData.apellido}`,
                addressInfo: `${formData.direccion}, ${formData.ciudad}, ${formData.codigoPostal}, ${formData.pais}`,
                phoneNumber: formData.telefono,
            };

            console.log("direccion a mandar",nuevaDireccion);
            
            const response = await fetch(POST_ADDRESS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                    
                },
                body: JSON.stringify(nuevaDireccion),
            });

            if (response.ok) {
                setAlertMessage("Dirección añadida correctamente.");
                setShowAlert(true);
            } else {
                const errorData = await response.json();
                setAlertMessage(`Error: ${errorData.message || "No se pudo añadir la dirección."}`);
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error al añadir dirección:", error);
            setAlertMessage("Hubo un error al intentar añadir la dirección.");
            setShowAlert(true);
        }
    };

    const closeAlert = () => {
        setShowAlert(false); // Cerrar la alerta
    };

    return (
        <div className="container-añadir-direccion">
            <h1 className="titulo-añadir-direccion">Añadir Dirección</h1>
            {showAlert && <Alert message={alertMessage} onClose={closeAlert} />} 
            <form className="form-añadir-direccion" onSubmit={handleAñadirDireccion}>
                <div className="form-group">
                    <label htmlFor="nombre" className="label"></label>
                    <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="input"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="apellido" className="label"></label>
                    <Input
                        type="text"
                        id="apellido"
                        name="apellido"
                        className="input"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="direccion" className="label"></label>
                    <Input
                        type="text"
                        id="direccion"
                        name="direccion"
                        className="input"
                        placeholder="Dirección"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ciudad" className="label"></label>
                    <Input
                        type="text"
                        id="ciudad"
                        name="ciudad"
                        className="input"
                        placeholder="Ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="codigoPostal" className="label"></label>
                    <Input
                        type="text"
                        id="codigoPostal"
                        name="codigoPostal"
                        className="input"
                        placeholder="Código Postal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pais" className="label"></label>
                    <Input
                        type="text"
                        id="pais"
                        name="pais"
                        className="input"
                        placeholder="País"
                        value={formData.pais}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono" className="label"></label>
                    <Input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="input"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-guardar">
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default AñadirDireccion;
