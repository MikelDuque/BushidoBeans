import classes from "./Cart.module.css";
import Quantity_Counter from "../../Quantity_Counter/Counter";
import { useCarrito } from "../../../context/CarritoContext";

export default function Cart({}) {
  const {carrito, eliminarDelCarrito} = useCarrito();

  //DEFINIR CARTITEMS
  function cartMapper(cartItems) {
    return (cartItems.length > 0 ? ( 
      cartItems.map((item) => (
        console.log(item),
        <li id={item.productId} className={classes.cart_item}>
          <img src={`https://localhost:7015/${item.image}`} alt="img Producto" />
          <div className={classes.data_container}>
            <h3 className={classes.importantText}>{item.name}</h3>
            <div className={classes.complementary_data}>
              <p>{item.price} €</p>
              <Quantity_Counter productId={item.id} oldQuantity={item.quantity} stock={item.stock}/>
            </div>
          </div>
          <a className={classes.importantText} onClick={(e) => {e.preventDefault(), eliminarDelCarrito(item.id)}}>X</a>
        </li>
      ))) : (<p>"Tu carrito está vacío"</p>)
    ); 
  };

  return (
    <>
      <ul className={classes.cart_list}>
        {cartMapper(carrito)}
      </ul>
    </>
)};