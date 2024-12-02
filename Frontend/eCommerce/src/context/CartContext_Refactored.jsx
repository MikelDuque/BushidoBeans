import { createContext, useContext, useState, useEffect, useRef } from 'react';
import useFetch from "../endpoints/useFetch";
import { useAuth } from './AuthContext_Refactored';
import { GET_CART_BY_ID, PUT_CART, DELETE_CARTPRODUCT , DELETE_CART_BY_ID} from "../endpoints/config";


/* ----- Preparación Contexto ----- */

const CartContext = createContext();
export const useCart = () => {return useContext(CartContext)};

export const CartProvider = ({ children }) => {

    /* ----- Constantes Iniciales ----- */

    const { token, decodedToken } = useAuth();
    const userId

    const localCart = JSON.parse(localStorage.getItem('carrito' || []))

    const [cart, setCart] = useState([]);
    //const [totalProducts, setTotalProducts] = useState(0);
    const totalProducts = useRef(0)
    
    const { fetchData:backendCart} = useFetch({
        url: GET_CART_BY_ID(1),
        type: "GET",
        token: token,
        params: 1,
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
    console.log(`loading: ${isLoading}, error: ${error}, carrito: ${backendCart}`);
    
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


    /* ----- Fin Context ----- */

    const ctxValue = {
        cart,
        totalProducts: totalProducts.current,
    };

    return <CartContext.Provider value={ctxValue}> {children} </CartContext.Provider>
};