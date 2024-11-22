import classes from "./Counter.module.css";
import { useState } from "react";
import { useCarrito } from '../../context/CarritoContext'; 

export default function Quantity_Counter({productId, oldQuantity, stock}) {
  const { agregarAlCarrito } = useCarrito();
  const [quantity, setQuantity] = useState(oldQuantity)
  const [cartItem, setCartItem] = useState({
    id: productId,
    quantity: oldQuantity
  });

  function handleQuantity(newQuantity) {
    setQuantity(quantity)
    /* switch (option) {
      case "+": {
        setCartItem(cartItem.quantity = 1);
      };
      break;
      case "-": {
        setCartItem(cartItem.quantity = -1);
      }
    }; */
  };

  const incrementCounter = () => {
    quantity < stock ? handleQuantity(quantity++) : handleQuantity(stock);
    /* if (cartItem.quantity < stock) {
      handleQuantity("+");
      agregarAlCarrito(cartItem);
    } */
   agregarAlCarrito({id: productId, quantity: quantity})
  };

  const decrementCounter = () => {
    quantity > 1 ? handleQuantity(quantity--) : handleQuantity(0);
    /* if (cartItem.quantity > 1) {
      handleQuantity("-");
      agregarAlCarrito(cartItem);
    } */
    agregarAlCarrito({id: productId, quantity: quantity})
  };

  /* function decrementCounter() {
    quantity > 1 ? setQuantity(quantity--) : setQuantity(0);
  }

  function incrementCounter() {
    quantity < stock ? setQuantity(quantity++) : setQuantity(stock);
  } */


  return (
    <div className={classes.counter_container}>
        <button className={classes.quantity_button} onClick={decrementCounter} disabled={cartItem.quantity <= 0}>-</button>
        <p>{quantity}</p>
        <button className={classes.quantity_button} onClick={incrementCounter} disabled={cartItem.quantity >= stock}>+</button>
    </div>
  );
}