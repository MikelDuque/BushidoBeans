import Subtotal from "../../components/Subtotal/Subtotal";
import Checkout_Cart from "../Checkout/Checkout_Cart";

function ChkCart(){
  return(
    <>
    <Checkout_Cart />
    <Subtotal />
    </>
  )
}

export default ChkCart;