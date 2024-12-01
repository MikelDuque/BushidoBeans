import React, { useState, useEffect } from 'react';
import { GET_USERS } from "../../../endpoints/config";
import { useAuth } from '../../../context/AuthContext';

const UserAdmin = () => {
    const { user: currentUser } = useAuth(); // Obtén el usuario logueado
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

    const handleUserSelect = (user) => {
        if (user.id !== currentUser.id) {
            setSelectedUser(user);
        } else {
            alert("No puedes editar tu propio usuario.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const userToUpdate = {
            id: selectedUser.id,
            name: selectedUser.name,
        };

        try {
            const response = await fetch('https://localhost:7015/api/User/Update_User', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToUpdate),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            } else {
                // Actualiza la lista de usuarios localmente después de la actualización
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? selectedUser : user
                    )
                );
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
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserSelect(user)}>
                        {user.name} - {user.role}
                    </li>
                ))}
            </ul>

            {selectedUser && (
                <div>
                    <h3>Editar Usuario</h3>
                    <label>
                        ID:
                        <input
                            type="text"
                            name="id"
                            value={selectedUser.id}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={selectedUser.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleUpdate}>Actualizar</button>
                </div>
            )}
        </div>
    );
};

export default UserAdmin;
