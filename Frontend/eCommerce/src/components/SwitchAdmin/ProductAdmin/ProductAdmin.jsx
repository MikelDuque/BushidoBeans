import React, { useState, useEffect } from 'react';
import { GET_PRODUCTS, UPDATE_PRODUCT } from "../endpoints/config";

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(GET_PRODUCTS);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleUpdate = async (product) => {
        try {
            const response = await fetch(`${UPDATE_PRODUCT}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            {error && <p>Error: {error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <input
                            type="text"
                            value={product.name}
                            onChange={(e) => setSelectedProduct({ ...product, name: e.target.value })}
                        />
                        <input
                            type="number"
                            value={product.price}
                            onChange={(e) => setSelectedProduct({ ...product, price: parseFloat(e.target.value) })}
                        />
                        {/* Otros campos... */}
                        <button onClick={() => handleUpdate(selectedProduct)}>Actualizar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductAdmin;
