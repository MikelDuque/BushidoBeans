import classes from "./Counter.module.css";

export default function Quantity_Counter({quantity, setQuantity, stock}) {

  const incrementCounter = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementCounter = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={classes.counter_container}>
        <button className={classes.quantity_button} onClick={decrementCounter} disabled={quantity <= 1}>-</button>
        <p>{quantity}</p>
        <button className={classes.quantity_button} onClick={incrementCounter} disabled={quantity >= stock}>+</button>
    </div>
  );
}