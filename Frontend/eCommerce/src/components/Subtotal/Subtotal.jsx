import "./Subtotal.css";
import { useCheckout } from "../../context/CheckoutContext"; // Importa el contexto

function Subtotal({ carrito, view }) {

    // Usa el contexto Checkout para cambiar el `currentView`
    const {handleButtonClick} = useCheckout();

    const sendReview = async (data) => {
            const response = await fetch("https://localhost:7015/api/Order", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                    
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                alert("Order enviada correctamente");
                               
            } else {
                setError("Error al enviar la review:");
            }
      
    };

    const handleSubtotal = () => {
        if (!carrito || carrito.length === 0) return 0;
        return carrito.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Calcula los gastos de envío
    const calculateShipping = () => {
        const subtotal = handleSubtotal();
        return subtotal > 35 ? 0 : 2.99;
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

            <button className="btn-direccion" onSubmit={sendReview} onClick={() => handleButtonClick('address')}>
                {view === "checkout" ? "Continuar" : "Pago"}    
                  
            </button>
        </div>
    );
}

export default Subtotal;
