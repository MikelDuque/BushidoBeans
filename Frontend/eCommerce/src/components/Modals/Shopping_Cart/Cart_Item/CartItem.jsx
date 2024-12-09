import classes from "./CartItem.module.css"
import { useCart } from "../../../../context/CartContext";
import Quantity_Counter from "../../../Quantity_Counter/Counter";
import { API_BASE_URL } from "../../../../endpoints/config";

export default function CartItem({productData}) {
  const {updateCartProduct, deleteCartProduct} = useCart();

  function handleQuantity(newQuantity) {
    productData.quantity = newQuantity;

    newQuantity <= 0 ? deleteCartProduct(productData.id) : updateCartProduct(productData);
  }

  return (
    <li id={productData.id} className={classes.cart_item}>
        <img src={`${API_BASE_URL}${productData.image}`} alt="img Producto" />
        <div className={classes.data_container}>
          <h3 className={classes.importantText}>{productData.name}</h3>
          <div className={classes.complementary_data}>
            <p>{productData.price} €</p>
            <Quantity_Counter quantity={productData.quantity} handleQuantity={handleQuantity} stock={productData.stock}/>
          </div>
        </div>
        <a className={classes.importantText} onClick={() => deleteCartProduct(productData.id)}>X</a>
      </li>
  );
}