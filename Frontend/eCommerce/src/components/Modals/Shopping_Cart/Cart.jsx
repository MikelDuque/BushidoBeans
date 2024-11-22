import classes from "./Cart.module.css";
import { useState } from "react";
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
              <Quantity_Counter productId={item.id} prevQuantity={item.quantity} stock={item.stock}/>
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
        {/* <li id="" className={classes.cart_item}>
          <img src="https://i.pinimg.com/originals/3a/4a/88/3a4a88c4cc5a51dbdc1f28f5aa105ce1.png" alt="img Producto" />
          <div className={classes.data_container}>
            <h3 className={classes.importantText}>Título del producto</h3>
            <div className={classes.complementary_data}>
              <p>Precio</p>
              <Quantity_Counter quantity={quantity} setQuantity={setQuantity} stock={20}/>
            </div>
          </div>
          <a className={classes.importantText} onClick="">X</a>
        </li> */}
      </ul>
    </>
)};