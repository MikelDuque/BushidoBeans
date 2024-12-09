import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { POST_ORDER } from '../endpoints/config';
import useFetchEvent from '../endpoints/useFetchEvent';


const CheckoutContext = createContext({
  totalPrice: 0,
  totalProducts: 0,
  orderProducts: [],
  userId: 0,
  addressId: 0
});

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
    userId: decodedToken.id || 0,
    addressId: 0
  });

  useEffect(() => {
    handleOrderProducts();
    handleTotalPrice();
  }, []);


  // Función para cambiar el estado de la vista
  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  function handleOrder(newOrder) {
    setOrder(newOrder)
  }

  function handleOrderProducts() {
    
    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      orderProducts: JSON.parse(JSON.stringify(cart))
    }))
  }

  function handleTotalPrice() {
    const subtotal = (cart || cart.length > 0) ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    
    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      totalPrice: subtotal
    }))
  }

  const calculateShipping = () => {
    const shippingPrice = order.totalPrice > 35 ? 0 : 2.99;
    return shippingPrice.toFixed(2);
  };


  //FETCHING
  async function sendOrder() {

    const postedOrder = await fetchingData({url: POST_ORDER, type: 'POST', token: token, params:order});
  };


  /* ----- FINAL CONTEXTO ----- */

  const ctxValue = {
    currentView,
    order,
    handleButtonClick,
    calculateShipping,
  };

  return (<CheckoutContext.Provider value={ctxValue}> {children} </CheckoutContext.Provider>);
};