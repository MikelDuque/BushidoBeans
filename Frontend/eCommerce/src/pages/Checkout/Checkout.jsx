import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from './Checkout.module.css';
import Cart from "../../components/Modals/Shopping_Cart/Cart";


function Checkout() {

  return (
    <>
      <Header />
        <div className={classes.cart_container}>
          <div className={classes.cart_header}>
            <h4 className={classes.text}>Tu Carro</h4>
            <button className={classes.text}>Vaciar carro</button>
          </div>
          <Cart/>
        </div>
      <Footer />
    </>
  )
}

export default Checkout