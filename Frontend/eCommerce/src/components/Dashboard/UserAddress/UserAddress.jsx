import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import "./UserAddress.css";
import Sidebar from "../UserSidebar/Sidebar";
function UserAddress() {
    // const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addresses = [
        { id: 1, name: "Casa", address: "Calle Principal 123, Ciudad X", phone: "123456789" },
        { id: 2, name: "Oficina", address: "Avenida Central 456, Ciudad Y", phone: "987654321" },
    ];
    // useEffect(() => {
    //     const fetchAddresses = async () => {
    //         try {
    //             const token = localStorage.getItem("accessToken");
    //             if (!token) throw new Error("Token not found");

    //             const decodedToken = jwtDecode.jwtDecode(token);
    //             const userId = decodedToken.id;

    //             const response = await fetch(`https://localhost:7015/api/Address/1`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setAddresses(data);
    //             } else {
    //                 throw new Error("Failed to fetch addresses");
    //             }
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAddresses();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-wrapper">
            <Sidebar/>
            <div className="user-container">
                <h2 className="titulo">Direcciones de Envío</h2>
                <div className="addresses-list">
                    {addresses.map((address) => (
                        <div key={address.id} className="address-card">
                            <h3>{address.name}</h3>
                            <p>{address.address}</p>
                            <p><strong>Teléfono:</strong> {address.phone}</p>
                            <button className="address-btn">Editar</button>
                            <button className="address-btn delete">Eliminar</button>
                        </div>
                    ))}
                </div>
                <button className="add-address-btn">Añadir Nueva Dirección</button>
            </div>
        </div>
    );
}

export default UserAddress;
