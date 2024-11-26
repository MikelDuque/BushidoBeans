import classes from "./Counter.module.css";
import { useState } from "react";
import { useCarrito } from '../../context/CarritoContext'; 

export default function Quantity_Counter({productId, oldQuantity, stock}) {
  const { agregarAlCarrito } = useCarrito();
  const [quantity, setQuantity] = useState(oldQuantity)
  console.log("stock", stock);

  function handleQuantity(newQuantity) {
    setQuantity(newQuantity)
  };

  const incrementCounter = () => {
    if(quantity < stock) {
      agregarAlCarrito({id: productId, quantity: +1})
      handleQuantity(quantity+1)
    }
  };

  const decrementCounter = () => {
    if(quantity > 0) {
      agregarAlCarrito({id: productId, quantity: -1})
      handleQuantity(quantity-1)
    }
  };

  return (
    <div className={classes.counter_container}>
        <button className={classes.quantity_button} onClick={decrementCounter} disabled={quantity <= 0}>-</button>
        <p>{quantity}</p>
        <button className={classes.quantity_button} onClick={incrementCounter} disabled={quantity >= stock}>+</button>
    </div>
  );
}