import React from 'react';
import PropTypes from 'prop-types';
import { useCarrito } from '../../context/CarritoContext'; 
import './BotonAgregarCarrito'; //

const AgregarCarrito = ({ producto }) => {
    const { agregarAlCarrito } = useCarrito(); 

    const handleAgregar = (event) => {
        event.preventDefault();
        agregarAlCarrito({
            id: producto.id,
            image: producto.imagen,
            name: producto.nombre,
            price: producto.precio,
            quantity: producto.cantidadP,
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

AgregarCarrito.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagen: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
    }).isRequired,
};

export default AgregarCarrito;
