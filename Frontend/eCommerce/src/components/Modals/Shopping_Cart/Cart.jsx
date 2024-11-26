import classes from "./Cart.module.css";
import CartItem from "./Cart_Item/CartItem";
import { useCarrito } from "../../../context/CarritoContext";
import { API_BASE_URL } from "../../../endpoints/config";

export default function Cart({}) {
  const {carrito} = useCarrito();

  //DEFINIR CARTITEMS
  function cartMapper(cartItems) {
    console.log("Cart length", cartItems.length);
    

    return (cartItems.length > 0 ? (
      cartItems.map((cartItem) => (
        console.log("Cart Item", cartItem),
        
        <CartItem 
          key={cartItem.id}
          productData = {{
            id: cartItem.id,
            image: `${API_BASE_URL}${cartItem.image}`,
            name: cartItem.name,
            price: cartItem.price,
            stock: cartItem.stock,
            quantity: cartItem.quantity
          }}/>
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