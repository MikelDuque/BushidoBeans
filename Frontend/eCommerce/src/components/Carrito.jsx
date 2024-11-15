import { useState, useEffect} from 'react';

function Carrito(){

    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    console.log("carrito",carrito)

    return(

        <div>
        <h2>Carrito</h2>
        <ul>
            {carrito.map((producto, index) => (
                <li key={index}>
                    <h3>{producto.nombreP.nombre}</h3>
                    <p>Cantidad: {producto.cantidadP}</p>
                    <p>Precio: {producto.precioP.precio}€</p>
                    <p>ID Producto: {producto.idProductoP.id}</p>
                </li>
            ))}
        </ul>
    </div>

    );
    

    
}

export default Carrito;