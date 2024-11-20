import classes from './Carrito.module.css';
import  useCarrito  from "../../context/CarritoContext"; 

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
        <div className={classes.Carrito}>
            <h2 className={classes.CarritoHead}>Carrito</h2>
            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>  // Mensaje cuando el carrito está vacío
            ) : (
                <ul className={classes.ProductosGrid}>
                    {carrito.map((producto, index) => (
                        <li className={classes.producto} key={index}>
                            <h3 className={classes.productoName}>{producto.nombreP}</h3>
                            {producto.img ? (  // Verificar si el producto tiene una imagen
                                <img
                                    className={classes.productoImg}
                                    src={`https://localhost:7015/${producto.img}`}
                                    alt={producto.nombreP}
                                />
                            ) : (
                                <p>Imagen no disponible</p>  // Mensaje si la imagen no existe
                            )}
                            <div className={classes.productoDetalles}>
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
                className={classes.botonAgregar}
                disabled={carrito.length === 0} 
            >
                Proceder a la compra
            </button>

            <button
                onClick={handleReset}
                className={classes.botonCancelar}
            >
                Vaciar carrito
            </button>
        </div>
    );
}
export default Carrito;
