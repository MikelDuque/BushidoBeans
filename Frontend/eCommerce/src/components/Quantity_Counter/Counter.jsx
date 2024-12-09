import { useEffect } from "react";
import classes from "./Counter.module.css";

export default function Quantity_Counter({quantity, handleQuantity, stock}) {

  useEffect(() => {
    if(quantity > stock) handleQuantity(stock);
    if (quantity < 0) handleQuantity(0);
  }), [quantity];

  function decrementCounter() {
    if(quantity > 0) handleQuantity(--quantity);
  };

  function incrementCounter() {
    console.log(`Hola, incremnt counter! Quantity es ${quantity}, y Stock ${stock}. Entra en el if? ${quantity <= stock}`);
    if(quantity < stock) handleQuantity(++quantity)
  };

  return (
    <div className={classes.counter_container}>
        <button className={classes.quantity_button} onClick={decrementCounter} disabled={quantity <= 0}>-</button>
        <p>{quantity}</p>
        <button className={classes.quantity_button} onClick={incrementCounter} disabled={quantity >= stock}>+</button>
    </div>
  );
}