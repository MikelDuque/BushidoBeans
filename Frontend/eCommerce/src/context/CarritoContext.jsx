import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cartId, setCartId] = useState(null); 
    const { isAuthenticated } = useAuth();
    const API_URL_GET_CART = process.env.REACT_APP_API_GET_CART_URL;
    const API_URL_ADD_CART_PRODUCT = process.env.REACT_APP_API_ADD_CART_PRODUCT_URL;
    const API_URL_DELETE_CART_PRODUCT = process.env.REACT_APP_API_DELETE_CART_PRODUCT_URL;

    const token = localStorage.getItem('accessToken'); 

    // Obtener el carrito al cargar la aplicación
    useEffect(() => {
        if (isAuthenticated) {
            obtenerCarritoBackend();
        } else {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
            setCarrito(carritoGuardado);
        }
    }, [isAuthenticated]);

    // Guardar el carrito en localStorage si no está autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, isAuthenticated]);

    const obtenerCarritoBackend = async () => {
        try {
            const response = await fetch(`${API_URL_GET_CART}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener el carrito');
            }

            const data = await response.json();
            setCartId(data.id); // Guardar el ID del carrito
            setCarrito(
                data.cartProducts.map((product) => ({
                    id: product.productId,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                    cantidadP: product.quantity,
                }))
            );
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    const agregarAlCarrito = async (producto) => {
        if (isAuthenticated) {
            try {
                const response = await fetch(
                    `${API_URL_ADD_CART_PRODUCT}?CartId=${cartId}&ProductId=${producto.id}&Quantity=${producto.cantidadP}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al agregar el producto al carrito');
                }

                const data = await response.json();
                setCarrito((prevCarrito) => {
                    const productoExistente = prevCarrito.find((item) => item.id === data.productId);
                    if (productoExistente) {
                        return prevCarrito.map((item) =>
                            item.id === data.productId
                                ? { ...item, cantidadP: data.quantity }
                                : item
                        );
                    } else {
                        return [
                            ...prevCarrito,
                            {
                                id: data.productId,
                                cantidadP: data.quantity,
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
                    item.id === producto.id ? { ...item, cantidadP: item.cantidadP + producto.cantidadP } : item
                );
                setCarrito(nuevoCarrito);
            } else {
                setCarrito([...carrito, { ...producto }]);
            }
        }
    };

    const eliminarDelCarrito = async (productoId, cantidadP) => {
        if (isAuthenticated) {
            try {
                const response = await fetch(
                    `${API_URL_DELETE_CART_PRODUCT}?CartId=${cartId}&ProductId=${productoId}&Quantity=${cantidadP}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
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
