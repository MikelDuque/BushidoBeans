import classes from "./Counter.module.css";
import { useState } from "react";
import { useCarrito } from '../../context/CarritoContext'; 

export default function Quantity_Counter({productId, prevQuantity, stock}) {
  const { agregarAlCarrito } = useCarrito();
  const [cartItem, setCartItem] = useState({
    id: productId,
    quantity: prevQuantity
  });

  function handleQuantity(option) {
    switch (option) {
      case "+": {
        setCartItem(cartItem.quantity ++);
      };
      break;
      case "-": {
        setCartItem(cartItem.quantity --);
      }
    };
  };

  const incrementCounter = (e) => {
    e.preventDefault();
    if (cartItem.quantity < stock) {
      handleQuantity("+");
      agregarAlCarrito(cartItem);
    }
  };

  const decrementCounter = (e) => {
    e.preventDefault();
    if (cartItem.quantity > 1) {
      handleQuantity("-");
      agregarAlCarrito(cartItem);
    }
  };

  return (
    <div className={classes.counter_container}>
        <button className={classes.quantity_button} onClick={decrementCounter} disabled={cartItem.quantity <= 1}>-</button>
        <p>{prevQuantity}</p>
        <button className={classes.quantity_button} onClick={incrementCounter} disabled={cartItem.quantity >= stock}>+</button>
    </div>
  );
}