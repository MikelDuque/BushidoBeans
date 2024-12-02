import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import "./User.css";
import { GET_USER_BY_ID } from "../../../endpoints/config.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../UserSidebar/Sidebar";
function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate("/user/profile");
    };
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) throw new Error("Token not found");

                const decodedToken = jwtDecode.jwtDecode(token);
                const userId = decodedToken.id;

                const response = await fetch(GET_USER_BY_ID(userId), {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading user data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-wrapper">
            <Sidebar/>
            <div className="user-container">
                <h2 className="titulo">Información del Usuario</h2>
                <div className="user-info">
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Apellido:</strong> {user.surname}</p>
                    <p><strong>Email:</strong> {user.mail}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                    <p><strong>Rol:</strong> <span className="highlight">{user.role}</span></p>
                </div>
                <button className="user-button" onClick={handleEditClick}>Editar Información</button>
            </div>
        </div>
    );
}



export default User;
