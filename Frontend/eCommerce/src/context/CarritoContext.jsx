import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import useFetch from "../endpoints/useFetch";
import { useAuth } from './AuthContext';
import { GET_CART_BY_ID, PUT_CART, DELETE_CART_PRODUCT , DELETE_CART_BY_ID} from "../endpoints/config";


/* ----- Preparación Contexto ----- */

const CarritoContext = createContext();
export const useCarrito = () => {return useContext(CarritoContext)};

export const CarritoProvider = ({ children }) => {

    /* ----- Constantes Iniciales ----- */

    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('accessToken') || null;
    const userId = isAuthenticated ? jwtDecode(token).id : 0;
    const localCart = JSON.parse(localStorage.getItem('carrito' || []))

    const [carrito, setCarrito] = useState([]);
    //const [totalProducts, setTotalProducts] = useState(0);
    const totalProducts = useRef(0)
    
    const { fetchData:backendCart, isLoading, error } = useFetch({
        Url: GET_CART_BY_ID(userId),
        type: "GET",
        token,
        params: userId,
        condition: true
    });


    /* ----- UseEffect Inicial ----- */

    useEffect(() => {
        if (!isAuthenticated) handleCart(localCart)
            
            else if (!isLoading && !error) {
                handleCart(backendCart)
                //handleTotalProducts()
            };
    }, [isAuthenticated, isLoading, error]);
    
    /* ----- Métodos ----- */

    function handleCart(newCart) {setCarrito(newCart)};

    //TERMINAR (surge error, no toma el carrito)
    function handleTotalProducts() { 
        const totalProducts2 = carrito != [] ? Array.from(carrito).reduce((total, product) => total + product.quantity, 0) : 0;
        
        totalProducts.current = totalProducts2;
    }

    function updateCart() {
        const {fetchData: newCart} = useFetch({
            Url: PUT_CART,
            type: "PUT",
            token: token,
            params: localCart,
            condition: newCart
        });

        handleCart(newCart);
    }

    
    //function getTotalProducts() { console.log("carrito", carrito); return carrito != []? carrito.reduce((total, product) => total + product.quantity, 0) : 0};
    //console.log("totalProducts", getTotalProducts());
    

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
/* 
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

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, isAuthenticated]);

    useEffect(() => {
        console.log("Carrito inicial:", carrito);
    }, [carrito]);
*/


    // //Intento de funcion para sincronicar los productos del localestorage con el backend una vez iniciado sesion

    /*LLAMADAS A LOS ENDPOINT*/
/* 
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
*/
    
    const agregarAlCarrito = async (producto) => {
        console.log("hola producto", producto);

        if (isAuthenticated) {
            useFetch({
                Url: PUT_CART,
                type: "PUT",
                token: token,
                params: producto,
                condition: true
            });
            try {

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

/*
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
*/


    const eliminarDelCarrito = async (productoId) => {
        if (isAuthenticated) {
            useFetch({
                Url: DELETE_CART_PRODUCT,
                type: "DELETE",
                token: token,
                params: productoId,
                condition: true
            });
            try {

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
            useFetch({
                Url: DELETE_CART_BY_ID,
                type: "DELETE",
                token: token,
                params: userId,
                condition: true
            });
            try {


                setCarrito([]);


            } catch (error) {
                console.error('Error al eliminar el contenido del carrito:', error);
            }
        } else {
            setCarrito([]);
        }
    };


    /* ----- Fin Context ----- */

    const ctxValue = {
        carrito,
        totalProducts: totalProducts.current,
        agregarAlCarrito,
        eliminarDelCarrito,
        eliminarContenidoCarrito,
    };

    return <CarritoContext.Provider value={ctxValue}> {children} </CarritoContext.Provider>
};