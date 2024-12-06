import { createContext, useContext, useState, useEffect} from 'react';
import useFetch from "../endpoints/useFetch";
import { useAuth } from './AuthContext';
import { GET_CART_BY_ID, PUT_CART, DELETE_CARTPRODUCT , DELETE_CART_BY_ID} from "../endpoints/config";


/* ----- Preparación Contexto ----- */

const CartContext = createContext();
export const useCarrito = () => {return useContext(CartContext)};

export const CarritoProvider = ({ children }) => {

    /* ----- Constantes Iniciales ----- */

    const token  = useAuth();

    const localCart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem("carrito")) : [];

    const [cart, setCart] = useState(localCart);
    //const [totalProducts, setTotalProducts] = useState(0);
    //const totalProducts = useRef(0)
   
    /*
    const { fetchData:backendCart} = useFetch({
        url: GET_CART_BY_ID(1),
        type: "GET",
        token: token,
        params: 1,
        condition: true
    });
    */

    /* ----- UseEffect Inicial ----- */

    /*
    useEffect(() => {
        if(backendCart) setCart(backendCart);
    }, [backendCart])
    */
    
    /* ----- Métodos ----- */

    function handleCart(newCart) {setCart(newCart)};

    //TERMINAR (surge error, no toma el carrito)
    /*
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
    */

    
    //function getTotalProducts() { console.log("carrito", carrito); return carrito != []? carrito.reduce((total, product) => total + product.quantity, 0) : 0};
    //console.log("totalProducts", getTotalProducts());


    /* ----- Fin Context ----- */

    const ctxValue = {
        cart,
        //totalProducts: totalProducts.current,
    };

    return <CartContext.Provider value={ctxValue}> {children} </CartContext.Provider>
};