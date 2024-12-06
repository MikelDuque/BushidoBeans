import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useModal } from "../../context/ModalContext";
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

import Modal from '../Modals/Modal';
import Cart from "../Modals/Shopping_Cart/Cart";

import classes from './Header.module.css';
import { jwtDecode } from 'jwt-decode';

function Header() {
  //HOOKS
  const {
    isOpen,
    openModal,
    closeModal
  } = useModal();

  const navigate = useNavigate();

  const { eliminarContenidoCarrito, totalProducts } = useCarrito();

  function handleNavigateToCheckout() {
    navigate('/checkout')
  }

  const { isAuthenticated, logout, token } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <NavLink className={`${classes.nl} ${classes.hLogo}`} to="/" end />
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Café </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Té </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Tienda </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/sobreNosotros"> Nosotros </NavLink>

        {isAuthenticated ? (
          <Desplegable handleLogout={handleLogout} token={token} />
        ) : (
          <NavLink className={`${classes.nl} ${classes.btnc}`} to="/login"> Login </NavLink>
        )}
      
        <a onClick={openModal} className={`${classes.nl} ${classes.cesta}`} data-count={totalProducts}/>
      </nav>

        {isOpen && (
          <Modal type="cart" titulo={"Tu Carro"} cancelFnc={eliminarContenidoCarrito} continueFnc={handleNavigateToCheckout} buttonValues={{continueVal:"Procesar compra", cancelVal:"Vaciar carro"}}>
            <Cart closeCart={closeModal}/>
          </Modal>
        )}
    </header>
  );
}


// -----DESPLEGABLE----- //

const Desplegable = ({ handleLogout, token }) => {
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
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.role === "admin") {
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