import classes from "./CartItem.module.css"
import { useCarrito } from "../../../../context/CarritoContext";
import Quantity_Counter from "../../../Quantity_Counter/Counter";
import { useEffect, useState } from "react";

export default function CartItem({productData}) {
  const {eliminarDelCarrito, agregarAlCarrito} = useCarrito();
  const [quantity, setQuantity] = useState(productData.quantity);

  return (
    <li id={productData.id} className={classes.cart_item}>
        <img src={productData.image} alt="img Producto" />
        <div className={classes.data_container}>
          <h3 className={classes.importantText}>{productData.name}</h3>
          <div className={classes.complementary_data}>
            <p>{productData.price} €</p>
            <Quantity_Counter quantity={quantity} setQuantity={setQuantity} stock={productData.stock}/>
          </div>
        </div>
        <a className={classes.importantText} onClick={(e) => {e.preventDefault(), eliminarDelCarrito(productData.id)}}>X</a>
      </li>
  );
}