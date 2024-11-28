import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from './Checkout.module.css';
import Checkout_Cart from "../../components/Checkout/Checkout_Cart";


function Checkout() {

  return (
    <>
      <Header />
      <div>
        <Checkout_Cart/>
        </div>
      <Footer />
    </>
  )
}

export default Checkout