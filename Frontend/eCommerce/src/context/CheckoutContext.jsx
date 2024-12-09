import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { POST_ORDER } from '../endpoints/config';
import useFetchEvent from '../endpoints/useFetchEvent';


const CheckoutContext = createContext();

export function useCheckout() {return useContext(CheckoutContext)};

export function CheckoutProvider({ children }) {
  const { token, decodedToken } = useAuth();
  const { cart } = useCart(); 
  const { fetchingData } = useFetchEvent();

  const [currentView, setCurrentView] = useState('cart');
  const [order, setOrder] = useState({
    totalPrice: 0.0,
    totalProducts: 0,
    orderProducts: [],
    userId: decodedToken?.id || 0,
    addressId: 0
  });

  useEffect(() => {
    handleOrderProducts();
    handleTotalPrice();
  }, [cart]);


  // Función para cambiar el estado de la vista
  const handleButtonClick = (view) => {
    setCurrentView(view);

    if(view === 'confirm') sendOrder();
  };

  function handleOrderProducts() {
    let orderProducts = [];

    cart.forEach((cartItem) => {
    orderProducts = [...cart, {
      ...cartItem,
      purchasePrice: cartItem.price
    }]});

    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      orderProducts: [...orderProducts]

    }));

    /*
    setOrder(estadoPrevio => ({
      ...estadoPrevio.map((item) => {
        estadoPrevio = [...cart, {
          ...item,
          purchasePrice: item.price
        }]})}));
        */
  }

  function handleTotalPrice() {
    const subtotal = (cart || cart.length > 0) ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    
    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      totalPrice: subtotal
    }))
  }

  function handleSelectedAddress(id) {
    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      addressId: id
    }))
  }

  const calculateShipping = () => {
    const shippingPrice = order.totalPrice > 35 ? 0 : 2.99;
    return shippingPrice.toFixed(2);
  };


  //FETCHING
  async function sendOrder() {
    console.log("order", order);
    

    const postedOrder = await fetchingData({url: POST_ORDER, type: 'POST', token: token, params:order, needAuth:true});

    console.log("posted", postedOrder);
    
  };


  /* ----- FINAL CONTEXTO ----- */

  const ctxValue = {
    currentView,
    order,
    handleButtonClick,
    calculateShipping,
    handleSelectedAddress
  };

  return (<CheckoutContext.Provider value={ctxValue}> {children} </CheckoutContext.Provider>);
};