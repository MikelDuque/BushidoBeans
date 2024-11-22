import classes from "./Cart.module.css";
import { useState } from "react";
import Quantity_Counter from "../../Quantity_Counter/Counter";

//DEFINIR CARTITEMS
function cartMapper() {
  return (cartItems.length > 0 ? (
    cartItems.map((item) => (
      <li id="item.productId" className={classes.cart_item}>
        <img src={item.image} alt="img Producto" />
        <div className={classes.data_container}>
          <h3 className={classes.importantText}>{item.name}</h3>
          <div className={classes.complementary_data}>
            <p>item.price</p>
            <Quantity_Counter quantity={cantidad} setQuantity={setCantidad} stock={item.stock}/>
          </div>
        </div>
        <a className={classes.importantText} onClick="">X</a>
      </li>
    ))) : (<p>"Tu carrito está vacío"</p>)
  ); 
};

export default function Cart({}) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <>
      <ul className={classes.cart_list}>
        {cartMapper}
        <li id="" className={classes.cart_item}>
          <img src="https://i.pinimg.com/originals/3a/4a/88/3a4a88c4cc5a51dbdc1f28f5aa105ce1.png" alt="img Producto" />
          <div className={classes.data_container}>
            <h3 className={classes.importantText}>Título del producto</h3>
            <div className={classes.complementary_data}>
              <p>Precio</p>
              <Quantity_Counter quantity={cantidad} setQuantity={setCantidad} stock={20}/>
            </div>
          </div>
          <a className={classes.importantText} onClick="">X</a>
        </li>
        <li className={classes.cart_item}>
          Otro Item
        </li>
      </ul>
    </>
)};