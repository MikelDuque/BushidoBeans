import { useCheckout } from "../../context/CheckoutContext";
import classes from './Checkout.module.css';
import ChkCart from "../../components/CheckoutPages/ChkCart";
import ChkAddress from "../../components/CheckoutPages/ChkAddress";
import ChkConfirm from "../../components/CheckoutPages/ChkConfirm.jsx";

function Checkout() {
  const { currentView, handleButtonClick } = useCheckout('cart');

  const isButtonDisabled = (button) => {
    if (currentView === 'cart' && button !== 'cart') return true;
    if (currentView === 'address' && button === 'confirm') return true;
    if (currentView === 'confirm') return false;
    return false;
  };

  return (
    <>
      <div className={classes.checkoutContainer}>
        <div className={classes.buttonGroup}>
          <button
            className={currentView === 'cart' ? classes.activeButton : ''} onClick={() => handleButtonClick('cart')} disabled={isButtonDisabled('cart')}>
            Productos
          </button>
          <div className={`${classes.line} ${currentView !== 'cart' ? classes.lineActive : ''}`} />
          <button
            className={currentView === 'address' ? classes.activeButton : ''} onClick={() => handleButtonClick('address')} disabled={isButtonDisabled('address')}>
            Direcciones
          </button>
          <div className={`${classes.line} ${currentView === 'confirm' ? classes.lineActive : ''}`} />
          <button
            className={currentView === 'confirm' ? classes.activeButton : ''} onClick={() => handleButtonClick('confirm')} disabled={isButtonDisabled('confirm')}>
            Resumen
          </button>
        </div>

        <div className={classes.content}>
          {currentView === 'cart' && <ChkCart />}
          {currentView === 'address' && <ChkAddress />}
          {currentView === 'confirm' && <ChkConfirm/>}
        </div>
      </div>
    </>
  );
}

export default Checkout;
