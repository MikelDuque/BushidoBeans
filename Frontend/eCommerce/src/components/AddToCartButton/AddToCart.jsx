import classes from './AddToCart.module.css';
import { useCart } from '../../context/CartContext'; 

const AddToCartButton = ({product, quantity}) => {
    const { cart, updateCartProduct } = useCart();

    function handleAddToCart() {

        const existedProduct = cart.find((cartItem) => cartItem.productId === product.id);
        
        const cartProduct = {
            productId: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: existedProduct ? ++existedProduct.quantity : quantity
        }

        console.log("cart product", cartProduct);
        

        /*
        const cartProduct = cart.find((cartItem) => cartItem.id === product.id) || {...product, quantity: 0}; 
        
        if (!quantity) {cartProduct.quantity++}
        else {cartProduct.quantity = quantity};
        */

        updateCartProduct(cartProduct);
    };

    return (
        <button onClick={handleAddToCart} className={classes.button} disabled={product.stock <= 0}> Añadir al carrito </button>
    );
};

export default AddToCartButton;