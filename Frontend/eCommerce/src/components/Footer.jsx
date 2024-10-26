import { NavLink } from "react-router-dom";
import './footer.css'

function Footer() {
  return (
    <footer>
      <NavLink to="/" end>
        <div className="fLogo" />
      </NavLink>
    </footer>
  );
}

export default Footer;
