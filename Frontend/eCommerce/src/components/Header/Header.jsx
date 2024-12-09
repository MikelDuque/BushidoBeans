import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useModal } from "../../context/ModalContext";
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

import Modal from '../Modals/Modal';
import Cart from "../Modals/Shopping_Cart/Cart";

import classes from './Header.module.css';

function Header() {

  /* ----- HOOKS Y CONSTS ----- */
  const navigateTo = useNavigate();

  const {token, decodedToken, handleLogout} = useAuth();
  const {openModal, closeModal} = useModal();

  const { deleteCart, totalProducts } = useCart();
  

  return (
    <header>
      <nav>
        <NavLink className={`${classes.nl} ${classes.hLogo}`} to="/" end />
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Café </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Té </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Tienda </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/sobreNosotros"> Nosotros </NavLink>
        
        {token ? (
          <Desplegable handleLogout={handleLogout} decodedToken={decodedToken} />
        ) : (
          <NavLink className={`${classes.nl} ${classes.btnc}`} to="/login_register"> Login </NavLink>
        )}
      
        <a onClick={() => openModal("cart")} className={`${classes.nl} ${classes.cesta}`} data-count={totalProducts}/>
      </nav>

      <Modal type="cart" titulo={"Tu Carro"} cancelFnc={deleteCart} continueFnc={() => navigateTo('/checkout')} buttonValues={{continueVal:"Procesar compra", cancelVal:"Vaciar carro"}}>
        <Cart closeCart={closeModal}/>
      </Modal>
  
    </header>
  );
}


// -----DESPLEGABLE----- //

const Desplegable = ({ handleLogout, decodedToken }) => {
  const [abierto, setAbierto] = useState(false);
  const desplegableRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

  const abrirDesplegable = () => {
    setAbierto((prev) => !prev);
  };

  const clickFuera = (event) => {
    if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
      setAbierto(false);
    }
  };

  function adminView() {
    if (decodedToken?.role === "admin") {
      return (<NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="/vistaAdmin">Administración</NavLink>);
    }
  }

  return (
    <div className={classes.despl} ref={desplegableRef}>
      <div className={`${classes.desplToggle} ${abierto ? 'active' : ''}`} onClick={abrirDesplegable} />
      {abierto && (
        <div className={classes.desplMenu}>
          <NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="/user">Ver Perfil</NavLink>
          {adminView()}
          <div className={classes.desplOpcion} onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};



export default Header;