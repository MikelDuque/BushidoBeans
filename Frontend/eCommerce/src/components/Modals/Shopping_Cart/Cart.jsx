import classes from "./Cart.module.css";
import CartItem from "./Cart_Item/CartItem";
import { useCart } from "../../../context/CartContext";

export default function Cart() {
  const {cart} = useCart();
  
  function cartMapper() {
    return (cart.length > 0 ? (
      cart.map((cartItem) => (    
        <CartItem 
          key={cartItem.productId}
          productData = {{
            productId: cartItem.productId,
            image: cartItem.image,
            name: cartItem.name,
            price: cartItem.price,
            stock: cartItem.stock,
            quantity: cartItem.quantity
          }}/>
      ))) : (<h4 className={classes.clearMessage}>Tu carrito está vacío</h4>)
    ); 
  };
  
  return (
    <>
      <ul className={classes.cart_list}>   
        {cartMapper()}
      </ul>
    </>
)};