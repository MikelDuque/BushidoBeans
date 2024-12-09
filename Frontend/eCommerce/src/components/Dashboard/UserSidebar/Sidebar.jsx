import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <aside className="user-sidebar">
            <ul>
                <li className="titulo" onClick={() => handleNavigation("/user")}>Mis Datos</li>
                <li className="titulo" onClick={() => handleNavigation("/user/address")}>Direcciones de Envío</li>
                <li className="titulo" onClick={() => handleNavigation("")}>Métodos de Pago</li>
                <li className="titulo" onClick={() => handleNavigation("/user/orders")}>Mis Pedidos</li>
            </ul>
        </aside>
    );
}

export default Sidebar;
