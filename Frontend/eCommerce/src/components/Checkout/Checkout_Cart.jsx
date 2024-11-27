import classes from "./Checkout_Cart.module.css"
import Cart from "../Modals/Shopping_Cart/Cart";

export default function Checkout_Cart() {
  return(
    <div className={classes.cart_container}>
      <div className={classes.cart_header}>
        <h4 className={classes.text}>Tu Carro</h4>
        <button className={classes.text}>Vaciar carro</button>
      </div>
      <Cart/>
      </div>
  );
}