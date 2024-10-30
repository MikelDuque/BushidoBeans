import { NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import '../styles/header.css';


// -----HEADER----- //

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => { setIsLogged(true); };
  const handleLogout = () => { setIsLogged(false); };

  return (
    <header>
      <nav>
        <NavLink className="nl hLogo" to="/" end />
        <NavLink className="nl btn" to="/catalogo"> Café </NavLink>
        <NavLink className="nl btn" to="/catalogo"> Té </NavLink>
        <NavLink className="nl btn" to="/catalogo"> Tienda </NavLink>
        <NavLink className="nl btn" to=""> Nosotros </NavLink>

        {isLogged ? (
          <Desplegable handleLogout={handleLogout} />
        ) : (
          <NavLink className="nl btnc" to="/login"> Login </NavLink>
        )}

        <NavLink className="nl cesta" to="" />
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
    <div className="despl" ref={desplegableRef}>
      <div className={`desplToggle ${abierto ? 'active' : ''}`} onClick={abrirDesplegable} />
      {abierto && (
        <div className="desplMenu">
          <NavLink className="dnl desplOpcion" to="">Ver Perfil</NavLink>
          <NavLink className="dnl desplOpcion" to="">Administración</NavLink>
          <div className="desplOpcion" onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};

export default Header;