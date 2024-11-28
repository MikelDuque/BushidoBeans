import classes from "./Cart.module.css";
import CartItem from "./Cart_Item/CartItem";
import { useCarrito } from "../../../context/CarritoContext";
import { API_BASE_URL } from "../../../endpoints/config";

export default function Cart() {
  // const {carrito} = useCarrito();
  const carrito = [
    { id: 1, name: "Producto 1", price: 10.99, quantity: 2 },
    { id: 2, name: "Producto 2", price: 5.49, quantity: 1 },
    { id: 3, name: "Producto 3", price: 20.0, quantity: 3 },
];    
  //DEFINIR CARTITEMS
  function cartMapper(cartItems) {
    console.log("Cart length", cartItems.length);
    console.log("carrito", cartItems);
    

    return (cartItems.length > 0 ? (
      console.log("cartItems", carrito),
      
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
      ))) : (<h4 className={classes.clearMessage}>Tu carrito está vacío</h4>)
    ); 
  };

  return (
    <>
      <ul className={classes.cart_list}>
        {/* <CartItem productData = {{
            id: 1,
            image: `https://pbs.twimg.com/profile_images/1859044378662027264/Km09QDjK_400x400.jpg`,
            name: "Este es un nombre provisional que hay que borrar",
            price: 25.67,
            stock: 20,
            quantity: 2
          }}/> */}
        {cartMapper(carrito)}
      </ul>
    </>
)};