import React from 'react';
import PropTypes from 'prop-types';
import { useCarrito } from '../../context/CarritoContext'; 
import './BotonAgregarCarrito';

export default function AddButton ({ product }) {
    const { agregarAlCarrito } = useCarrito(); 

    const handleAgregar = (event) => {
        event.preventDefault();
        agregarAlCarrito({
            id: product.id,
            quantity: product.quantity,
        });
    };

    return (
        <button
            onClick={handleAgregar}
            className="boton"
            aria-label={`Añadir ${producto.nombre} al carrito`}
        >
            Añadir al carrito
        </button>
    );
};

/* AgregarCarrito.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagen: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
    }).isRequired,
}; */