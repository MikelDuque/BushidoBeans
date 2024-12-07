import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { POST_ORDER } from '../endpoints/config';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const { token } = useAuth();
  const { carrito } = useCart(); 

  const [currentView, setCurrentView] = useState('cart');
  const [order, setOrder] = useState({
    id: 0,
    totalPrice: 0.0,
    totalProducts: 0,
    purchaseDate: null,
    orderProducts: []
  });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    handleOrderProducts();
    handleTotalPrice();
    handleAddress("C/ Frederick Terman, 3, Campanillas, 29590, Málaga");
  }, []);


  
  // Función para cambiar el estado de la vista
  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  function handleOrder(newOrder) {
    setOrder(newOrder)
  }

  function handleAddress(actualAddress) {
    setAddress(actualAddress)
  }

  function handleOrderProducts() {
    console.log("carrito", carrito);
    console.log("carrito checkout", order.orderProducts);
    
    

    setOrder(estadoPrevio => ({
      ...estadoPrevio,
      orderProducts: JSON.parse(JSON.stringify(carrito))
    }))
  }

  function handleTotalPrice() {
    console.log("CARRO", carrito);
    
    const subtotal = (!carrito || carrito.length === 0) ? 0 : carrito.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log("subtotal", subtotal);
    console.log("productos", order.orderProducts);
    
    
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
  const sendOrder = async () => {
    try {
      const response = await fetch(POST_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order),
      });
    
      if (response.ok) console.log("Order almacenado correctamente");
      else throw new Error("Solicitud a la API fallida");

    } catch (error) {console.log(error);}
  };


  /* ----- FINAL CONTEXTO ----- */

  const ctxValue = {
    currentView,
    order,
    address,
    handleButtonClick,
    calculateShipping,
  };

  return (<CheckoutContext.Provider value={ctxValue}> {children} </CheckoutContext.Provider>);
};

export const useCheckout = () => useContext(CheckoutContext);
