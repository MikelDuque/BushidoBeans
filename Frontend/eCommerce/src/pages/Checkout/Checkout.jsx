import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from './Checkout.module.css';
import Checkout_Cart from "../../components/Checkout/Checkout_Cart";
import Subtotal from "../../components/Subtotal/Subtotal";
import { useCarrito } from "../../context/CarritoContext";



function Checkout() {
    // const { carrito } = useCarrito();
    const carrito = [
      { id: 1, name: "Producto 1", price: 10.99, quantity: 2 },
      { id: 2, name: "Producto 2", price: 5.49, quantity: 1 },
      { id: 3, name: "Producto 3", price: 20.0, quantity: 3 },
  ];    
    return (
        <>
            <Header />
            <Checkout_Cart />
            <Subtotal carrito={carrito} view={Checkout}/>
            <Footer />
        </>
    );
}

export default Checkout;
