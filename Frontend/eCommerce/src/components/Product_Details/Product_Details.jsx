import classes from './Product_Details.module.css';
import { useState } from 'react';
import { getIntensidadImg } from '../../utils/intensidad';
import Quantity_Counter from '../Quantity_Counter/Counter';
import AddToCartButton from '../AddToCartButton/AddToCart';

export default function Product_Details({product}) {
    const [cantidad, setCantidad] = useState(1);

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
                
                <Quantity_Counter quantity={cantidad} setQuantity={setCantidad} stock={product.stock}/>

                <AddToCartButton product={product} quantity={cantidad}/>

                {/*
                <div className={classes.counter_container}>
                    <button className={classes.quantity_button} onClick={decrementCounter} disabled={cantidad <= 0}>-</button>
                    <p>{cantidad}</p>
                    <button className={classes.quantity_button} onClick={incrementCounter} disabled={cantidad >= product.stock}>+</button>
                </div>

                <button onClick={handleCarrito} className={classes.boton_agregar_carrito} disabled={product.stock <= 0 || cantidad > product.stock}>
                    {product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
                */}
            </div>  
        </div>
    ); 
}

