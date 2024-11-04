import React, { useState, useEffect } from 'react';
import productData from '../data/dataPrueba'; 
import { CardPrueba } from "../components/Card-Producto.jsx";
import "../styles/Catalogo.css";

const BusquedaProductos = ({ filtro, ordenar }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(productData);

  useEffect(() => {
    const filteredProducts = productData.filter(dataP => {
      const matchesSearch = dataP.nombre.toLowerCase().includes(productoBuscado.toLowerCase());
      const matchesFiltro = filtro === 'opcion2' ? dataP.nombre.toLowerCase().includes('café') :
                            filtro === 'opcion3' ? dataP.nombre.toLowerCase().includes('té') : true;
      return matchesSearch && matchesFiltro;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (ordenar === 'opcion2') return a.precio - b.precio;
      if (ordenar === 'opcion3') return b.precio - a.precio;
      if (ordenar === 'opcion4') return a.nombre.localeCompare(b.nombre);
      if (ordenar === 'opcion5') return b.nombre.localeCompare(a.nombre);
      return 0; // Sin orden específico (Novedades)
    });

    setDatosFiltrados(sortedProducts);
  }, [productoBuscado, filtro, ordenar]);

  return (
    <div>
      <div className='botonCentrado'>
        <input
        className='botonBusqueda'
        type="text"
        placeholder="Buscar..."
        value={productoBuscado}
        onChange={e => setProductoBuscado(e.target.value)}
      />
      </div>
      
      <div className="inventario">
        {datosFiltrados.length > 0 ? (
          datosFiltrados.map(dataP => (
            <CardPrueba 
              key={dataP.nombre}
              imagen={dataP.imagen} 
              nombre={dataP.nombre} 
              intensidad={dataP.intensidad} 
              precio={dataP.precio}
              soldout={dataP.soldout}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default BusquedaProductos;
