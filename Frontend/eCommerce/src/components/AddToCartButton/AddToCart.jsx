import classes from './AddToCart.module.css';
import { useCart } from '../../context/CartContext'; 

const AddToCartButton = ({product, quantity}) => {
    const { cart, updateCartProduct } = useCart();

    function handleAddToCart() {
        const cartProduct = cart.find((cartItem) => cartItem.productId === product.id) || {...product, productId:product.id, quantity: 0}; 
        
        if (!quantity) {cartProduct.quantity++}
        else {cartProduct.quantity = quantity};
        
        updateCartProduct(cartProduct)
    };

    return (
        <button onClick={handleAddToCart} className={classes.button} disabled={product.stock <= 0}> Añadir al carrito </button>
    );
};

export default AddToCartButton;