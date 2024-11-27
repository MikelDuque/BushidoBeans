import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
    const [cartId, setCartId] = useState(null);
    const { isAuthenticated } = useAuth();

    // URLs de la API
    const API_URL_GET_CART = "https://localhost:7015/api/Cart/Get_Cart";
    const API_URL_ADD_CART_PRODUCT = "https://localhost:7015/api/Cart/Update_CartProduct";
    const API_URL_DELETE_CART_PRODUCT = "https://localhost:7015/api/Cart/Delete_CartProduct";
    const API_URL_DELETE_CART = "https://localhost:7015/api/Cart/Delete_CartContent";
    const API_URL_UPDATE_CART = "https://localhost:7015/api/Cart/Update_GlobalCart";


    const token = localStorage.getItem('accessToken');

    // Función para manejar el token y obtener el cartId
    const handleToken = () => {
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const decodedToken = jwtDecode(token);
        const cartId = decodedToken.id; // CAMBIAR POR ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if (!cartId) {
            throw new Error('No se encontró el cartId en el token');
        }

        return cartId;
    };

    useEffect(() => {
        if (isAuthenticated) {
            actualizarProductosCarrito();
            obtenerCarritoBackend();
        } else {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
            if (carritoGuardado) {
                setCarrito(carritoGuardado);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, isAuthenticated]);

    useEffect(() => {
        console.log("Carrito inicial:", carrito);
    }, [carrito]);
    

    //Intento de funcion para sincronicar los productos del localestorage con el backend una vez iniciado sesion

    useEffect(() => {
        const sincronizarCarritoBackend = async () => {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

            if(carritoGuardado.length > 0){
                try{
                    // Crear objeto backend
                    const carritoBackend = {
                        id: handleToken(), 
                        cartProducts: carritoGuardado.map((producto) => ({
                            productId: producto.id,
                            quantity: producto.quantity,
                        })),
                    }

                    //Enviar productos al backend
                    const response = await fetch(`${API_URL_UPDATE_CART}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(carritoBackend),
                    });
                    if(!response.ok){
                        throw new Error('Error al sincronizar el carrito con el backend');
                    }
                    
                    const data = await response.json();
                    console.log('Carrito sincronizado con el backend:', data);

                    setCarrito(data.cartProducts.map((product) => ({
                        id: product.productId,
                        image: product.image,
                        name: product.name,
                        price: product.price,
                        stock: product.stock,
                        quantity: product.quantity
                    })))
                    //Borramos el carrito local
                    localStorage.removeItem('carrito');
                }catch (error) {
                    console.error('Error al sincronizar el carrito con el backend:', error);
                }
            }
        }
        
        if (isAuthenticated) {
            sincronizarCarritoBackend();
        }
    }, [isAuthenticated, token])

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
                        stock: product.stock,
                        quantity: product.quantity
                    }))
                );

        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };


    const agregarAlCarrito = async (producto) => {
        console.log("hola producto",producto);
        
        if (isAuthenticated) {
            try {
                const response = await fetch(`${API_URL_ADD_CART_PRODUCT}?CartId=${cartId}&ProductId=${producto.id}&Quantity=${producto.quantity}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    /* query: JSON.stringify({
                        CartId: cartId,
                        ProductId: producto.id,
                        Quantity: producto.quantity
                    }), */
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
            setCarrito((prevCarrito) => {
                const productoExistente = prevCarrito.find((item) => item.id === producto.id);
                if (productoExistente) {
                    const nuevoCarrito = prevCarrito.map((item) =>
                        item.id === producto.id
                            ? { ...item, quantity: item.quantity + producto.quantity }
                            : item
                    );
                    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                    return nuevoCarrito;
                } else {
                    const nuevoCarrito = [...prevCarrito, { ...producto }];
                    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                    return nuevoCarrito;
                }
            });
        }
    };

    function establecerCarrito(carritoNuevo) {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id === carritoNuevo.productId);
            if (productoExistente) {
                return prevCarrito.map((item) =>
                    item.id === carritoNuevo.productId
                        ? { ...item, quantity: carritoNuevo.quantity }
                        : item
                );
            } else {
                return [
                    ...prevCarrito,
                    {
                        id: carritoNuevo.productId,
                        quantity: carritoNuevo.quantity,
                    },
                ];
            }
        });
    }

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
                        'Authorization': `Bearer ${token}`,
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
    
    const actualizarProductosCarrito = async () => {
        
        if (isAuthenticated) {
            try {
                const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    
                if (carritoGuardado.length === 0) {
                    console.warn("No hay productos en el carrito para actualizar");
                    return;
                }
                    const carritoBackend = {
                    id: cartId,
                    cartProducts: carritoGuardado.map((product) => ({
                        productId: product.id,
                        quantity: product.quantity
                       
                    })),
                };
    
                
                const response = await fetch(`${API_URL_UPDATE_CART}?id=${cartId}&cartProducts=${carrito}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(carritoBackend),
                });
    
                if (!response.ok) {
                    throw new Error("Error al actualizar el carrito en el backend");
                }
    
                // Obtener la respuesta y actualizar el estado
                const data = await response.json();
                console.log("Carrito actualizado en el backend:", data);
    
                // Actualizar el estado del carrito en el contexto
                setCarrito(
                    data.cartProducts.map((product) => ({
                        id: product.productId,
                        image: product.image, 
                        name: product.name, 
                        price: product.price, 
                        quantity: product.quantity,
                        stock: product.stock
                    }))
                );
    
                localStorage.removeItem('carrito');
            } catch (error) {
                console.error("Error al actualizar el carrito en el backend:", error);
            }
        } else {
            console.warn("El usuario no está autenticado, no se puede sincronizar el carrito con el backend");
        }
    };

    
    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarProductosCarrito,
                eliminarContenidoCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
export default CarritoProvider;
