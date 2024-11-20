import "../styles/Carrito.css";
import  useCarrito  from "./../context/CarritoContext"; 

function Carrito() {
    const { carrito, vaciarCarrito, eliminarDelCarrito, completarCompra } = useCarrito();

    const handleReset = (event) => {
        event.preventDefault();
        vaciarCarrito();  
    };

    const handleEliminar = (productoId) => {
        eliminarDelCarrito(productoId);  
    };

    const handleCompletarCompra = () => {
        completarCompra(); 
    };

    return (
        <div className="Carrito">
            <h2 className="CarritoHead">Carrito</h2>
            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>  // Mensaje cuando el carrito está vacío
            ) : (
                <ul className="ProductosGrid">
                    {carrito.map((producto, index) => (
                        <li className="producto" key={index}>
                            <h3 className="productoName">{producto.nombreP}</h3>
                            {producto.img ? (  // Verificar si el producto tiene una imagen
                                <img
                                    className="productoImg"
                                    src={`https://localhost:7015/${producto.img}`}
                                    alt={producto.nombreP}
                                />
                            ) : (
                                <p>Imagen no disponible</p>  // Mensaje si la imagen no existe
                            )}
                            <div className="productoDetalles">
                                <p>Cantidad: {producto.cantidadP}</p>
                                <p>Precio: {producto.precioP}€</p>
                                <button onClick={() => handleEliminar(producto.idProductoP)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleCompletarCompra}
                className="botonAgregar"
                disabled={carrito.length === 0} 
            >
                Proceder a la compra
            </button>

            <button
                onClick={handleReset}
                className="botonCancelar"
            >
                Vaciar carrito
            </button>
        </div>
    );
}
export default Carrito;
