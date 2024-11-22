import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as jwt_decode from 'jwt-decode';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cartId, setCartId] = useState(null);
    const { isAuthenticated } = useAuth();

    const API_URL_GET_CART = import.meta.env.VITE_API_GET_CART_URL;
    const API_URL_ADD_CART_PRODUCT = import.meta.env.VITE_API_ADD_CART_PRODUCT_URL;
    const API_URL_DELETE_CART_PRODUCT = import.meta.env.VITE_API_DELETE_CART_PRODUCT_URL;
    const API_URL_DELETE_CART = import.meta.env.VITE_API_DELETE_CART_URL;
    const API_URL_UPDATE_CART = import.meta.env.VITE_API_UPDATE_CART_URL;


    const token = localStorage.getItem('accessToken');

    // Función para manejar el token y obtener el cartId
    const handleToken = () => {
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const decodedToken = jwt_decode.jwtDecode(token);
        const cartId = decodedToken.id; // CAMBIAR POR ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if (!cartId) {
            throw new Error('No se encontró el cartId en el token');
        }

        return cartId;
    };

    useEffect(() => {
        if (isAuthenticated) {
            obtenerCarritoBackend();
        } else {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
            setCarrito(carritoGuardado);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, isAuthenticated]);

    const obtenerCarritoBackend = async () => {
        try {
            const cartId = handleToken();

            const response = await fetch(`${API_URL_GET_CART}?id=${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener el carrito');
            }

            const data = await response.json();
            console.log('Respuesta de la API:', data);

            setCartId(data.id);

            setCarrito(
                data.cartProducts.map((product) => ({
                    id: product.productId,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                }))
            );
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };


    const agregarAlCarrito = async (producto) => {
        if (isAuthenticated) {
            try {
                const response = await fetch(API_URL_ADD_CART_PRODUCT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        CartId: cartId,
                        ProductId: producto.id,
                        Quantity: producto.quantity,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el producto al carrito');
                }

                const data = await response.json();
                console.log('Producto agregado al carrito:', data);

                setCarrito((prevCarrito) => {
                    const productoExistente = prevCarrito.find((item) => item.id === data.productId);
                    if (productoExistente) {
                        return prevCarrito.map((item) =>
                            item.id === data.productId
                                ? { ...item, quantity: data.quantity }
                                : item
                        );
                    } else {
                        return [
                            ...prevCarrito,
                            {
                                id: data.productId,
                                quantity: data.quantity,
                            },
                        ];
                    }
                });
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
            }
        } else {
            const productoExistente = carrito.find((item) => item.id === producto.id);
            if (productoExistente) {
                const nuevoCarrito = carrito.map((item) =>
                    item.id === producto.id ? { ...item, quantity: item.quantity + producto.quantity } : item
                );
                setCarrito(nuevoCarrito);
            } else {
                setCarrito([...carrito, { ...producto }]);
            }
        }
    };

    const eliminarDelCarrito = async (productoId) => {
        if (isAuthenticated) {
            try {
                const response = await fetch(
                    `${API_URL_DELETE_CART_PRODUCT}?CartId=${cartId}&ProductId=${productoId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al eliminar el producto del carrito');
                }

                setCarrito((prevCarrito) =>
                    prevCarrito.filter((item) => item.id !== productoId)
                );
            } catch (error) {
                console.error('Error al eliminar el producto del carrito:', error);
            }
        } else {
            const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
            setCarrito(nuevoCarrito);
        }
    };

    const eliminarContenidoCarrito = async () => {
        if (isAuthenticated) {
            try {
                const response = await fetch(`${API_URL_DELETE_CART}?id=${cartId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el contenido del carrito');
                }

                setCarrito([]);
            } catch (error) {
                console.error('Error al eliminar el contenido del carrito:', error);
            }
        } else {
            setCarrito([]);
        }
    };
    }

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;
