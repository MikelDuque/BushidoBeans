import React, { useState, useEffect } from 'react';
import {UPDATE_PRODUCT, GET_PRODUCTS } from "../../../endpoints/config";

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

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const productToUpdate = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            stock: selectedProduct.stock,
            Image: selectedProduct.image,
            description: selectedProduct.description,
            categoryId: selectedProduct.categoryId
        };

        try {
            const response = await fetch('https://localhost:7015/api/Product/Update_Product', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToUpdate),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            } else {
                // Actualiza la lista de productos localmente después de la actualización
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === selectedProduct.id ? selectedProduct : product
                    )
                );
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
                    <li key={product.id} onClick={() => handleProductSelect(product)}>
                        {product.id} - {product.name} - {product.price} €
                    </li>
                ))}
            </ul>

            {selectedProduct && (
                <div>
                    <h3>Editar Producto</h3>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={selectedProduct.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Precio:
                        <input
                            type="number"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        ID Categoría:
                        <input
                            type="text"
                            name="categoryId"
                            value={selectedProduct.categoryId}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Descripción:
                        <input
                            type="text"
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Imagen:
                        <input
                            type="text"
                            name="image"
                            value={selectedProduct.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={selectedProduct.stock}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleUpdate}>Actualizar</button>
                </div>
            )}
        </div>
    );
};

export default ProductAdmin;
