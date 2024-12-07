import React from 'react';
import classes from './AddToCart.module.css';
import { useCart } from '../../context/CartContext'; 

const AddToCartButton = ({product, quantity}) => {
    const { agregarAlCarrito } = useCart(); 

    const handleAddToCart = (event) => {
        event.preventDefault();
        agregarAlCarrito({
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: quantity
        });
    };

    return (
        <button onClick={handleAddToCart} className={classes.button} disabled={quantity <= 0 || quantity >= product.stock}> Añadir al carrito </button>
    );
};

export default AddToCartButton;