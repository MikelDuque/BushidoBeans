import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import useFetch from "../endpoints/useFetch";
import { GET_CART_BY_ID, PUT_CART } from "../endpoints/config";

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('accessToken');
    const userId = token.id;


    const handleCart = (newCart) => {
        setCarrito(newCart);
    };

    // URLs de la API


    // Función para manejar el token y obtener el cartId
    // const handleToken = () => {
    //     if (!token) {
    //         throw new Error('No hay token de autenticación');
    //     }

    //     const decodedToken = jwtDecode(token);
    //     const cartId = decodedToken.id; 

    //     if (!cartId) {
    //         throw new Error('No se encontró el cartId en el token');
    //     }
    //     if (!cartId) {
    //         throw new Error('No se encontró el cartId en el token');
    //     }

    //     return cartId;
    // };


    useEffect(() => {
        if (isAuthenticated) {
             sincronizarCarritoBackend();
             obtenerCarritoBackend();
        } else {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
            if (carritoGuardado) {
                handleCart(carritoGuardado);
            }
        }
    }, [isAuthenticated]);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         localStorage.setItem('carrito', JSON.stringify(carrito));
    //     }
    // }, [carrito, isAuthenticated]);

    // useEffect(() => {
    //     console.log("Carrito inicial:", carrito);
    // }, [carrito]);


    // //Intento de funcion para sincronicar los productos del localestorage con el backend una vez iniciado sesion

    /*LLAMADAS A LOS ENDPOINT*/

    const obtenerCarritoBackend =  () => {
        const { fetchData: carritoBackend, error: fetchError } = useFetch({
            Url: GET_CART_BY_ID(userId),
            type: "GET",
            token,
            params: userId,
        });
        handleCart(fetchData);
        console.log("Carrito obtenido:", fetchData);

    };

    const sincronizarCarritoBackend = async () => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
        const { fetchData: carritoBackend, error: fetchError } = useFetch({
            Url: PUT_CART(userId),
            type: "PUT",
            token,
            params: carritoGuardado,
        });
        handleCart(carritoGuardado)
        //Borramos el carrito local
        localStorage.removeItem('carrito');
    }
    
    const agregarAlCarrito = async (producto) => {
        console.log("hola producto", producto);

    //     if (isAuthenticated) {
    //         try {
    //             const response = await fetch(`${API_URL_ADD_CART_PRODUCT}?CartId=${cartId}&ProductId=${producto.id}&Quantity=${producto.quantity}`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //                 /* query: JSON.stringify({
    //                     CartId: cartId,
    //                     ProductId: producto.id,
    //                     Quantity: producto.quantity
    //                 }), */
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Error al agregar el producto al carrito');
    //             }

    //             const data = await response.json();
    //             console.log('Producto agregado al carrito:', data);

    //             setCarrito((prevCarrito) => {
    //                 const productoExistente = prevCarrito.find((item) => item.id === data.productId);
    //                 if (productoExistente) {
    //                     return prevCarrito.map((item) =>
    //                         item.id === data.productId
    //                             ? { ...item, quantity: data.quantity }
    //                             : item
    //                     );
    //                 } else {
    //                     return [
    //                         ...prevCarrito,
    //                         {
    //                             id: data.productId,
    //                             quantity: data.quantity,
    //                         },
    //                     ];
    //                 }
    //             });
    //         } catch (error) {
    //             console.error('Error al agregar el producto al carrito:', error);
    //         }
    //     } else {
    //         setCarrito((prevCarrito) => {
    //             const productoExistente = prevCarrito.find((item) => item.id === producto.id);
    //             if (productoExistente) {
    //                 const nuevoCarrito = prevCarrito.map((item) =>
    //                     item.id === producto.id
    //                         ? { ...item, quantity: item.quantity + producto.quantity }
    //                         : item
    //                 );
    //                 localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    //                 return nuevoCarrito;
    //             } else {
    //                 const nuevoCarrito = [...prevCarrito, { ...producto }];
    //                 localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    //                 return nuevoCarrito;
    //             }
    //         });
    //     }
    // };

    // function establecerCarrito(carritoNuevo) {
    //     setCarrito((prevCarrito) => {
    //         const productoExistente = prevCarrito.find((item) => item.id === carritoNuevo.productId);
    //         if (productoExistente) {
    //             return prevCarrito.map((item) =>
    //                 item.id === carritoNuevo.productId
    //                     ? { ...item, quantity: carritoNuevo.quantity }
    //                     : item
    //             );
    //         } else {
    //             return [
    //                 ...prevCarrito,
    //                 {
    //                     id: carritoNuevo.productId,
    //                     quantity: carritoNuevo.quantity,
    //                 },
    //             ];
    //         }
    //     });
    // }

    // const eliminarDelCarrito = async (productoId) => {
    //     if (isAuthenticated) {
    //         try {
    //             const response = await fetch(
    //                 `${API_URL_DELETE_CART_PRODUCT}?CartId=${cartId}&ProductId=${productoId}`,
    //                 {
    //                     method: 'DELETE',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`,
    //                     },
    //                 }
    //             );

    //             if (!response.ok) {
    //                 throw new Error('Error al eliminar el producto del carrito');
    //             }

    //             setCarrito((prevCarrito) =>
    //                 prevCarrito.filter((item) => item.id !== productoId)
    //             );
    //         } catch (error) {
    //             console.error('Error al eliminar el producto del carrito:', error);
    //         }
    //     } else {
    //         const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
    //         setCarrito(nuevoCarrito);
    //     }
    // };

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

    //             if (!response.ok) {
    //                 throw new Error('Error al eliminar el contenido del carrito');
    //             }

    //             setCarrito([]);


    //         } catch (error) {
    //             console.error('Error al eliminar el contenido del carrito:', error);
    //         }
    //     } else {
    //         setCarrito([]);
    //     }
    // };


    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                eliminarContenidoCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
export default CarritoProvider;
