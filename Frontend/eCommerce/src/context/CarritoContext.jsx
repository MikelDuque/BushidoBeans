import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras'));

        if (carritoGuardado) setCarrito(carritoGuardado);
        if (comprasGuardadas) setCompras(comprasGuardadas);
    }, []);

    useEffect(() => {
        if (carrito.length > 0) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        if (compras.length > 0) {
            localStorage.setItem('compras', JSON.stringify(compras));
        }
    }, [carrito, compras]);

    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            const nuevoCarrito = carrito.map(item =>
                item.id === producto.id ? { ...item, cantidadP: item.cantidadP + producto.cantidadP } : item
            );
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, { ...producto }]);
        }
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const completarCompra = () => {
        setCompras((prev) => [...prev, ...carrito]);
        setCarrito([]);
    };

    const eliminarDelCarrito = (productoId) => {
        const nuevoCarrito = carrito.filter(item => item.id !== productoId);
        setCarrito(nuevoCarrito);
    };

    return (
        <CarritoContext.Provider value={{ carrito, compras, agregarAlCarrito, vaciarCarrito, completarCompra, eliminarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;
