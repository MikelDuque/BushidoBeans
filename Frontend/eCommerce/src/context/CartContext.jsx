import { createContext, useContext, useEffect, useState} from 'react';

import { useAuth } from './AuthContext';
import useFetchEvent from '../endpoints/useFetchEvent';
import useFetch from '../endpoints/useFetch';
import { PUT_CART, DELETE_CARTPRODUCT , DELETE_CART_BY_ID, PUT_CARTPRODUCT} from "../endpoints/config";


/* ----- Preparación Contexto ----- */

const CartContext = createContext({
    cart: [],
    totalProducts: 0,
    updateCartProduct: () => {},
    deleteCartProduct: () => {},
    deleteCart: () => {}
}
    
);

export function useCart() {return useContext(CartContext)};

export function CartProvider({ children }) {

    /* ----- Constantes Iniciales ----- */

    const {token, decodedToken}  = useAuth();
    const {fetchingData} = useFetchEvent();
    //const {fetchData} = useFetch({url: PUT_CART, type: 'PUT', token: token, params:updateCart});

    const [cart, setCart] = useState([]);
    const totalProducts = getTotalProducts();

    useEffect(() => {
        mergeCart(); 
    }, []);


    /* ----- CART MERGE ----- */

    async function mergeCart() {
        setCart(token ? await getBackendCart() : getLocalCart());
    }

    function getLocalCart() {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    }

    async function getBackendCart() {
        const updateCart = {
            id: decodedToken.id,
            cartProducts: getLocalCart()
        }
        return await fetchingData({url: PUT_CART, type: 'PUT', token: token, params:updateCart});
    };

    console.log("cart", cart);


    /* ----- PRIVATE FUNCTIONS ----- */

    function handleCart(newCart) {
        setCart(newCart);
        if(!token) localStorage.setItem("cart", JSON.stringify(newCart));
    };

    function getTotalProducts() { 
        console.log(cart.reduce((total, product) => total + product.quantity, 0));
        return cart.reduce((total, product) => total + product.quantity, 0);
    }

    function updateCart(newProduct) {
        const existsIndex = cart.findIndex((prevProduct) => prevProduct.id === newProduct.productId);
        let updatedCart = [...cart];
        
        if (existsIndex !== -1) {
            updatedCart[existsIndex] = {
                ...updatedCart[existsIndex],
                quantity: newProduct.quantity
            }
        } else {
            updatedCart = [...updatedCart, {
                ...newProduct,
                quantity: newProduct.quantity,
            }]
        };
        handleCart(updatedCart);
    };

    function deleteCartItem(id) {
        const updatedCart = [...cart];

        updatedCart.splice(id);

        handleCart(updatedCart);
    }


    /* ----- METHODS ----- */

    async function updateCartProduct(product) {
        const updatedProduct = {
            userId: decodedToken.id,
            productId: product.id,
            quantity: product.quantity
        };

        const backendProduct = await fetchingData({url: PUT_CARTPRODUCT, type: 'PUT', token: token, params: updatedProduct});

        updateCart(backendProduct);
    };

    async function deleteCartProduct(productId) {
        const deletedProduct = {
            userId: decodedToken.id,
            productId: productId
        };

        await fetchingData({url: DELETE_CARTPRODUCT, type: 'DELETE', token: token, params: deletedProduct});

        deleteCartItem(productId);
    }

    async function deleteCart() {
        await fetchingData({url: DELETE_CART_BY_ID, type: 'DELETE', token: token, params: decodedToken.id});

        handleCart([]);
    }


    /* ----- Fin Context ----- */

    const ctxValue = {
        cart,
        totalProducts,
        updateCartProduct,
        deleteCartProduct,
        deleteCart
    };

    return <CartContext.Provider value={ctxValue}> {children} </CartContext.Provider>
};