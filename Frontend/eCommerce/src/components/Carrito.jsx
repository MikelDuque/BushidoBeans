import { useState, useEffect} from 'react';
import "../styles/Carrito.css";

function Carrito(){

    const [carrito, setCarrito] = useState([]);

    const handleReset = async(event)=>{
        event.preventDefault();
        localStorage.removeItem('carrito');
        window.location.reload();
    }

    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    console.log("carrito",carrito)

    return(
        <>
        
        <div className='Carrito'>
        <h2 className='CarritoHead'>Carrito</h2>
        <ul className='ProductosGrid'>
            {carrito.map((producto, index) => (
                <li className='producto' key={index}>
                    <h3 className='productoName'>{producto.nombreP.nombre}</h3>
                    <img  className='productoImg' src={`https://localhost:7015/${producto.img.imagen}`} alt="nada" />
                    
                    <div className='productoDetalles'>
                        <p>Cantidad: {producto.cantidadP}</p>
                        <p>Precio: {producto.precioP.precio}€</p>
                        <p>ID Producto: {producto.idProductoP.id}</p>
                    </div>
                    
                </li>
            ))}
        </ul>
        <input
            type="submit"
            className="botonAgregar"
            value="Proceder a la compra"
              />
        <input
            onClick={handleReset}
            type="reset"
            className="botonCancelar"
            value="Cancelar"
              />
    </div>
    </>

    );
    

    
}

export default Carrito;