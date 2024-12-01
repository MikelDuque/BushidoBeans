import React, { useState, useEffect } from 'react';
import { GET_USERS } from "../../../endpoints/config";
import * as jwt_decode from 'jwt-decode';

const UserAdmin = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            try {
                const decodedToken = jwt_decode.jwtDecode(storedToken);
                setCurrentUser(decodedToken);
                setToken(storedToken);
            } catch (error) {
                console.error("Error al decodificar el token", error);
                localStorage.removeItem('accessToken');
            }
        }
    }, []); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(GET_USERS, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token]);

    const handleUserSelect = (user) => {
        if (!currentUser) {
            alert("Por favor, inicie sesión");
            return;
        }

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
        if (!selectedUser) {
            alert("No hay usuario seleccionado");
            return;
        }

        const userToUpdate = {
            role: selectedUser.role,
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
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? selectedUser : user
                    )
                );
                setSelectedUser(null);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {!currentUser && (
                <p className="text-red-500">Por favor, inicie sesión para ver esta página</p>
            )}
            
            {currentUser && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
                    {error && <p className="text-red-500 mb-4">Error: {error}</p>}
                    
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li 
                                key={user.id} 
                                onClick={() => handleUserSelect(user)}
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                            >
                                {user.name} - {user.role}
                            </li>
                        ))}
                    </ul>

                    {selectedUser && (
                        <div className="mt-6 p-4 border rounded">
                            <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-gray-700">Rol: </span>
                                    <input
                                        type="text"
                                        name="id"
                                        value={selectedUser.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        readOnly 
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Nombre:</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={selectedUser.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </label>
                                <button 
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserAdmin;
