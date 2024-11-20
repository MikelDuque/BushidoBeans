import { NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import classes from './Header.module.css';
import { useAuth } from '../../context/AuthContext';
import CartCounter from "../CartCounter";


function Header() {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const [totalProducts,setTotalProducts] = useState(0);

  return (
    <header>
      <nav>
        <NavLink className={`${classes.nl} ${classes.hLogo}`} to="/" end />
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Café </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Té </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Tienda </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/sobreNosotros"> Nosotros </NavLink>

        {isAuthenticated ? (
          <Desplegable handleLogout={handleLogout} />
        ) : (
          <NavLink className={`${classes.nl} ${classes.btnc}`} to="/login"> Login </NavLink>
        )}

        <NavLink className={`${classes.nl} ${classes.cesta}`} to="" data-count={totalProducts} />
        <CartCounter setTotalProducts={setTotalProducts} />
      </nav>
    </header>
  );
}


// -----DESPLEGABLE----- //

const Desplegable = ({ handleLogout }) => {
  const [abierto, setAbierto] = useState(false);
  const desplegableRef = useRef(null);

  const abrirDesplegable = () => {
    setAbierto((prev) => !prev);
  };

  const clickFuera = (event) => {
    if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
      setAbierto(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

  return (
    <div className={despl} ref={desplegableRef}>
      <div className={`desplToggle ${abierto ? 'active' : ''}`} onClick={abrirDesplegable} />
      {abierto && (
        <div className={desplMenu}>
          <NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="">Ver Perfil</NavLink>
          <NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="">Administración</NavLink>
          <div className={classes.desplOpcion} onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};

export default Header;