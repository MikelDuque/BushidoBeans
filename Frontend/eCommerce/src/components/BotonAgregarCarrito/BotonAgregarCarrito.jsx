import React from 'react';
import { useCarrito } from '../../context/CarritoContext'; 
import './BotonAgregarCarrito';

const AgregarCarrito = ({product}) => {
    const { agregarAlCarrito } = useCarrito(); 

    const handleAgregar = (event) => {
        event.preventDefault();
        agregarAlCarrito({
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1
        });
    };

    return (
        <button onClick={handleAgregar} className="boton"> Añadir al carrito </button>
    );
};

export default AgregarCarrito;