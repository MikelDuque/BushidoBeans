import { useState, useEffect } from 'react';
import { DELETE_USER_BY_ID, GET_USERS, UPDATE_USER_ROLE } from "../../../endpoints/config";

import classes from "./UserList.module.css"
import UserListElement from './UserListElement/UserListElement';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../../../components/Modals/Modal.jsx';
import { useModal } from '../../../context/ModalContext.jsx';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const {closeModal, openModal} = useModal();
    const { token, decodedToken } = useAuth();

    useEffect(() => {
        if (token) getUsers();
    }, [token]);

    async function getUsers(){
        try {
            const response = await fetch(GET_USERS, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUsers(data || []);
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleUpdate = (event) => {
        const loggedUser = decodedToken?.id;
        console.log("usuario", loggedUser);
        
        const thisElement = event.target;

        const userToUpdate = {
            UserId: thisElement.id,
            Role: thisElement.value === "usuario" ? null : thisElement.value
        };
        
        if(loggedUser != thisElement.id) {updateUser(userToUpdate)}
        else {alert("No puedes modificar tu propio usuario")}
    };

    const updateUser = async (userToUpdate) => {
        try {
            const response = await fetch(UPDATE_USER_ROLE, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userToUpdate),
            });

            if (!response.ok) {throw new Error('Error al actualizar el usuario');}
            else {getUsers()}
        } catch (error) {
            setError(error.message);
            console.log("Error: ", error.message);  
        }
    };

    const handleDelete = async (event) => {
        const thisElement = event.target;  

        try {
            const response = await fetch(DELETE_USER_BY_ID(thisElement.id), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {throw new Error('Error al eliminar el usuario');}
            else {getUsers()}
        } catch (error) {
            setError(error.message);
            console.log();
            console.log("Error: ", error.message);
        }
    }

    return (
        <div>
            {error ? <p>{error}</p> : 
                <ul className={classes.container}>
                    {users.length > 0 ? (users.map((listElement, i) => (
                        <li key={i}> <UserListElement listElement={listElement} changeRol={handleUpdate} deleteUser={() => openModal("deleteUser")}/> </li>
                    ))) : <p>No existen elementos que listar</p>}
                </ul>
            }
                <Modal type="deleteUser" titulo="¿Eliminar usuario?" continueFnc={handleDelete} cancelFnc={closeModal} buttonValues={{continueVal: "Eliminar", cancelVal: "Cancelar"}}>
                    <div className={classes.deleteAlert}>
                        <h1>Una vez eliminado no podrá deshacer la acción...</h1>
                    </div>
                </Modal>

            {/*
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
                                <div className='block'>
                                <label htmlFor='Role' className="text-gray-700">Rol de: {selectedUser.name}</label>
                                    <select
                                        id='role'
                                        name='role'
                                        defaultValue={selectedUser.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                                    >
                                        <option value="string">Sin rol</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                </div>
                                
                                
                                <button 
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Actualizar
                                </button>
                                
                            </div>
                        </div>
                    )}
                </>
            )}
            */}

        </div>
    );
};

