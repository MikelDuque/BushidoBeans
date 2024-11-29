import React, { createContext, useContext, useState } from 'react';
import { useCarrito } from './CarritoContext';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const { carrito } = useCarrito(); 
  const [currentView, setCurrentView] = useState('cart');
  const [order, setOrder] = useState({
    id: 0,
    totalPrice: 0.0,
    totalProducts: 0,
    purchaseDate: null,
    adress: null,
    orderProducts: []
  });
  
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
      orderProducts: orderProducts.fill(carrito)
    }))
  }

  function handleTotalPrice() {
    const subtotal = (!carrito || carrito == []) ? 0 : carrito.reduce((total, item) => total + item.price * item.quantity, 0);

    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      totalPrice: subtotal
    }))
  }

  const calculateShipping = () => {
    const shippingPrice = order.totalPrice > 35 ? 0 : 2.99;
    return shippingPrice.toFixed(2);
  };

  /* ----- FINAL CONTEXTO ----- */

  const ctxValue = {
    currentView,
    order,
    handleButtonClick,
    calculateShipping,
    handleOrderProducts,
    handleTotalPrice
  };

  return (<CheckoutContext.Provider value={ctxValue}> {children} </CheckoutContext.Provider>);
};

export const useCheckout = () => useContext(CheckoutContext);
