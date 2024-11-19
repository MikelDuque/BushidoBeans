import classes from './Product_Details.module.css';
import { useState, useEffect } from 'react';
import { getIntensidadImg } from '../../utils/intensidad';

export default function Product_Details({product}) {
    const [cantidad, setCantidad] = useState(1);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    const handleCarrito = async (event) => {
        event.preventDefault();

        const nuevoProducto = {
            nombreP : product.name,
            precioP : product.price,
            cantidadP: {cantidad},
            idProductoP: product.id
          };
    
        console.log("producto: ", nuevoProducto);
        await sendCarrito(nuevoProducto);
    }


    const sendCarrito = async (producto)=>{

        const carritoActualizado = [...carrito, producto];
        setCarrito(carritoActualizado);
        
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    }

    const aumentarCantidad = () => {
        if (cantidad < product.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const intensidadImg = getIntensidadImg("café");

    return (   
        <div className={classes.container_info_producto}>
            <div className={classes.imagen_producto}>
                <img src={`https://localhost:7015/${product.image}`} alt={product.name} />
            </div>

            <div>
                <p className={`${classes.nombreProducto} ${classes.titulo}`}>{product.name}</p>
                <p className={`${classes.subtitulo} ${classes.intensidad}`}>
                    Intensidad:
                    <span className={classes.texto}>
                        {Array(product.intensity).fill(
                            <img src={intensidadImg} alt="Intensidad" className={classes.intensidadIcono} />
                        )}
                    </span>
                </p>
                <p className={`${classes.subtitulo} ${classes.precio}`}>
                    Precio: <span className={classes.texto}>{product.price}</span>€
                </p>
                <p className={`${classes.subtitulo} ${classes.disponibilidad}`}>
                    Disponibilidad: <span className={classes.texto}>{product.stock > 0 ? 'En Stock' : 'Sin stock'}</span>
                </p>
                <p className={`${classes.subtitulo} ${classes.descripcion}`}>
                    <span className={classes.texto}>{product.description}</span>
                </p>

                <div className={classes.container_boton_cantidad}>
                    <button className={classes.boton_cantidad} onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                    <span>{cantidad}</span>
                    <button className={classes.boton_cantidad} onClick={aumentarCantidad} disabled={cantidad >= product.stock}>+</button>
                </div>

                <button onClick={handleCarrito} className={classes.boton_agregar_carrito} disabled={product.stock <= 0 || cantidad > product.stock}>
                    {product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
            </div>  
        </div>
    ); 
}

