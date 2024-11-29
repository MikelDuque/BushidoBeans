import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderChk from "../../components/Header/HeaderChk/HeaderChk.jsx";
import Footer from "../../components/Footer/Footer";
import classes from './Checkout.module.css';
import ChkCart from "../../components/CheckoutPages/ChkCart";
import ChkAddress from "../../components/CheckoutPages/ChkAddress";
import ChkConfirm from "../../components/CheckoutPages/Chkconfirm";

function Checkout() {
  const [currentView, setCurrentView] = useState('cart');
  const navigate = useNavigate();

  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  const isButtonDisabled = (button) => {
    if (currentView === 'cart' && button !== 'cart') return true;
    if (currentView === 'address' && button === 'confirm') return true;
    if (currentView === 'confirm') return false;
    return false;
  };

  const goToNextStep = () => {
    if (currentView === 'cart') {
      setCurrentView('address');
    } else if (currentView === 'address') {
      setCurrentView('confirm');
    } else if (currentView === 'confirm') {
      navigate('/catalogo');
    }
  };

  return (
    <>
      <HeaderChk />
      <div className={classes.checkoutContainer}>
        <div className={classes.buttonGroup}>

          <button
            className={currentView === 'cart' ? classes.activeButton : ''} onClick={() => handleButtonClick('cart')} disabled={isButtonDisabled('cart')}>
            Productos
          </button>

          <div className={`${classes.line} ${currentView !== 'cart' ? classes.lineActive : ''}`}/>

          <button
            className={currentView === 'address' ? classes.activeButton : ''} onClick={() => handleButtonClick('address')} disabled={isButtonDisabled('address')}>
            Dirección
          </button>

          <div className={`${classes.line} ${currentView === 'confirm' ? classes.lineActive : ''}`} />

          <button
            className={currentView === 'confirm' ? classes.activeButton : ''} onClick={() => handleButtonClick('confirm')} disabled={isButtonDisabled('confirm')}>
            Confirmación
          </button>

        </div>

        <div className={classes.content}>
          {currentView === 'cart' && <ChkCart />}
          {currentView === 'address' && <ChkAddress />}
          {currentView === 'confirm' && <ChkConfirm />}
        </div>

        <div className={classes.nextStepButtonContainer}>
          <button className={classes.nextStepButton} onClick={goToNextStep}>
            {(currentView === 'cart'||currentView === 'address') && 'Siguiente'}
            {currentView === 'confirm' && 'Volver al Catálogo'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
