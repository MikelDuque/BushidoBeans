import React from 'react';
import { useCarrito } from '../../context/CarritoContext'; 
import './BotonAgregarCarrito';

const AgregarCarrito = ({productId}) => {
    const { agregarAlCarrito } = useCarrito(); 

    const handleAgregar = (event) => {
        event.preventDefault();
        agregarAlCarrito({
            id: productId,
            quantity: 1
        });
    };

    return (
        <button onClick={handleAgregar} className="boton"> Añadir al carrito </button>
    );
};

export default AgregarCarrito;