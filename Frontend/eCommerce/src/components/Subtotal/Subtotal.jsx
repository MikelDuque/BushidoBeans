import "./Subtotal.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function Subtotal({ carrito, view }) {
    const navigate = useNavigate(); 

    const handleSubtotal = () => {
        if (!carrito || carrito.length === 0) return 0;
        return carrito.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Calcula los gastos de envío
    const calculateShipping = () => {
        const subtotal = handleSubtotal();
        return subtotal > 35 ? 0 : 2.99;
    };

    // Redirige al componente de dirección
    const handleRedirect = () => {
        navigate('/direccion'); 
    };

    // Renderiza según la vista
    return (
        <div className="container-subtotal">
            <p className="texto-subtotal titulo">SUBTOTAL</p>
            <p className="subtitulo">{handleSubtotal().toFixed(2)} €</p> 

            {view === "direccion" && (
                <p className="envio">
                    {handleSubtotal() > 35
                        ? "Envío gratis"
                        : `Gastos de envío: ${calculateShipping().toFixed(2)} €`}
                </p>
            )}

            <button className="btn-direccion" onClick={handleRedirect}>
            {view === "checkout" ? "Continuar" : "Pago"}            
            </button>
        </div>
    );
}

export default Subtotal;
