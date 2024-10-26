import { NavLink } from "react-router-dom";
import './header.css'

const isLogged = true;

function Header() {
  if (isLogged == false){
    return (
      <header>
        <nav>
          <NavLink className="nl" to="/" end>
            <div className="hLogo" />
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Café</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Té</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Tienda</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Nosotros</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btnc">Login</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="cesta" />
          </NavLink>
        </nav>
      </header>
    );
  }
  else {
    return (
      <header>
        <nav>
          <NavLink className="nl" to="/" end>
            <div className="hLogo" />
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Café</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Té</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Tienda</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="btn">Nosotros</div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="hPerfil"></div>
          </NavLink>
          <NavLink className="nl" to="">
            <div className="cesta" />
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
