import classes from './Product_Details.module.css';
import { useState, useEffect } from 'react';
import { getIntensidadImg } from '../../utils/intensidad';
import { useCarrito } from '../../context/CarritoContext';

export default function Product_Details({product}) {
    const { agregarAlCarrito } = useCarrito();
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
            id: product.id,
            image: product.image,
            name : product.name,
            price : product.price,
            stock: product.stock,
            quantity: {cantidad}
        };
    
        console.log("producto: ", nuevoProducto);
        await sendCarrito(nuevoProducto);

        agregarAlCarrito(nuevoProducto)
    }


    const sendCarrito = async (producto)=>{

        const carritoActualizado = [...carrito, producto];
        setCarrito(carritoActualizado);
        
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    }

    const intensidadImg = getIntensidadImg("café");

    function handleQuantity(newQuantity) {
        setCantidad(newQuantity)
    };

    const incrementCounter = () => {
        if(cantidad < product.stock) {
          handleQuantity(cantidad+1)
        }
      };
    
      const decrementCounter = () => {
        if(cantidad > 0) {
          handleQuantity(cantidad-1)
        }
      };

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
                
                <div className={classes.counter_container}>
                    <button className={classes.quantity_button} onClick={decrementCounter} disabled={cantidad <= 0}>-</button>
                    <p>{cantidad}</p>
                    <button className={classes.quantity_button} onClick={incrementCounter} disabled={cantidad >= product.stock}>+</button>
                </div>

                <button onClick={handleCarrito} className={classes.boton_agregar_carrito} disabled={product.stock <= 0 || cantidad > product.stock}>
                    {product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
            </div>  
        </div>
    ); 
}

