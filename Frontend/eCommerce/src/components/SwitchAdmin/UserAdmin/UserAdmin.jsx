import React, { useState, useEffect } from 'react';
import { GET_USERS, UPDATE_USER } from "../endpoints/config";
import { useAuth } from '../../../context/AuthContext.jsx';

const UserAdmin = () => {
    const { user } = useAuth(); // Obtén el usuario logueado
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(GET_USERS);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdate = async (userData) => {
        try {
            const response = await fetch(`${UPDATE_USER}/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {error && <p>Error: {error}</p>}
            <ul>
                {users.map((userData) => (
                    <li key={userData.id}>
                        {userData.id !== user.id && (
                            <>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setSelectedUser({ ...userData, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={userData.role}
                                    onChange={(e) => setSelectedUser({ ...userData, role: e.target.value })}
                                />
                                {/* Otros campos... */}
                                <button onClick={() => handleUpdate(selectedUser)}>Actualizar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAdmin;
