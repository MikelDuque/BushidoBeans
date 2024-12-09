import { createContext, useContext, useEffect, useRef, useState} from 'react';

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
});

export function useCart() {return useContext(CartContext)};

export function CartProvider({ children }) {

    /* ----- Constantes Iniciales ----- */

    const {token, decodedToken}  = useAuth();
    const {fetchingData} = useFetchEvent();

    const [cart, setCart] = useState(getLocalCart());
    const totalProducts = getTotalProducts();
    const mergeParams = useRef({
        id: 0,
        cartProducts: []
    });


    /* ----- CART MERGE ----- */
    
    const {fetchData} = useFetch({url: PUT_CART, type: 'PUT', token: token, params:mergeParams.current});

    useEffect(() => {
        setMergeParams();

    }, [decodedToken]);

    useEffect(() => {
        if(token && fetchData) getBackendCart();

    }, [token, fetchData]);


    function setMergeParams() {
        mergeParams.current = {
            id: decodedToken ? decodedToken.id : 0,
            cartProducts: getLocalCart()
        }
    }

    function getLocalCart() {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    }

    function getBackendCart() {
        setCart(fetchData);
        localStorage.removeItem('cart');
    }


    /* ----- PRIVATE FUNCTIONS ----- */

    function handleCart(newCart) {
        setCart(newCart);
        if(!token) localStorage.setItem("cart", JSON.stringify(newCart));
    };

    function getTotalProducts() { 
        return cart.reduce((total, product) => total + product.quantity, 0);
    }

    function updateCart(newProduct) {
        const existsIndex = cart.findIndex((prevProduct) => prevProduct.id === newProduct.id);
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
        const updatedCart = [...cart].filter((item) => item.id !== id);

        handleCart(updatedCart);
    }


    /* ----- METHODS ----- */

    async function updateCartProduct(product) {
        if (token) {
            const updatedProduct = {
                userId: decodedToken.id,
                productId: product.id,
                quantity: product.quantity
            };
    
            const isUpdated = await fetchingData({url: PUT_CARTPRODUCT, type: 'PUT', token: token, params: updatedProduct});
    
            if (!isUpdated) return;
        }

        updateCart(product);
    };

    async function deleteCartProduct(productId) {
        if(token) {
            const deletedProduct = {
                userId: decodedToken.id,
                productId: productId
            };
    
            const isDeleted = await fetchingData({url: DELETE_CARTPRODUCT, type: 'DELETE', token: token, params: deletedProduct});

            if(!isDeleted) return;
        }
        
        deleteCartItem(productId);
    }

    async function deleteCart() {
        if (token) {
            const isDeleted = await fetchingData({url: DELETE_CART_BY_ID(decodedToken.id), type: 'DELETE', token: token, params: decodedToken.id});

            if(!isDeleted) return;
        }

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