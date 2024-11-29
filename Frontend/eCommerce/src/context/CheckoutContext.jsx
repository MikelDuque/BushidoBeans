import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('cart');
  
  // Función para cambiar el estado de la vista
  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  return (
    <CheckoutContext.Provider value={{ currentView, handleButtonClick }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
