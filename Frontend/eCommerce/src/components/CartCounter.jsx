import React, { useState, useEffect } from "react";

// Productos iniciales en el carrito 
const initialCartProducts = [
  { id: 1, name: "Producto 1", quantity: 2 },
  { id: 2, name: "Producto 2", quantity: 1 },
  { id: 3, name: "Producto 2", quantity: 7 },
  { id: 3, name: "Producto 2", quantity: 7 }
];

// Función para calcular la cantidad total de productos
function getTotalProducts(products) {
  return products.reduce((total, product) => total + product.quantity, 0);
}

const CartCounter = ({ setTotalProducts }) => {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  // Actualizar el total de productos
  useEffect(() => {
    const totalCount = getTotalProducts(cartProducts);
    setTotalProducts(totalCount); // Pasar el total al componente padre
  }, [cartProducts, setTotalProducts]);
};

export default CartCounter;
