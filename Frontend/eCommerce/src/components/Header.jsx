import { NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import '../styles/header.css'

const isLogged = false;


// -----DESPLEGABLE----- //

const Desplegable = () => {
  const [abierto, setAbierto] = useState(false);
  const desplegableRef = useRef(null);
  const abrirDesplegable = () => { setAbierto((prev) => !prev); };

  const clickFuera = (event) => {
    if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
      setAbierto(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

  return (
    <div className="despl" ref={desplegableRef}>
      <div className={`desplToggle ${abierto ? 'active' : ''}`} onClick={abrirDesplegable} />
      {abierto && (
        <div className="desplMenu">
          <NavLink className="dnl" to=""><div className="desplOpcion">Ver Perfil</div></NavLink>
          <NavLink className="dnl" to=""><div className="desplOpcion">Administración</div></NavLink>
          <div className="desplOpcion">Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};


// -----HEADER----- //

function Header() {
  return (
    <header>
      <nav>
        <NavLink className="nl" to="/" end>
          <div className="hLogo" />
        </NavLink>
        <NavLink className="nl" to="/catalogo">
          <div className="btn">Café</div>
        </NavLink>
        <NavLink className="nl" to="/catalogo">
          <div className="btn">Té</div>
        </NavLink>
        <NavLink className="nl" to="/catalogo">
          <div className="btn">Tienda</div>
        </NavLink>
        <NavLink className="nl" to="">
          <div className="btn">Nosotros</div>
        </NavLink>

        {isLogged ? (
          <Desplegable />
        ) : (
          <NavLink className="nl" to="/login">
            <div className="btnc">Login</div>
          </NavLink>
        )}

        <NavLink className="nl" to="">
          <div className="cesta" />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;