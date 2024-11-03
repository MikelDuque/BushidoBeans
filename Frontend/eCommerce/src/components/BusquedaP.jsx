import React, { useState, useEffect } from 'react';
import productData from '../data/dataPrueba'; 
import { CardPrueba } from "../components/CardPrueba.jsx"; 
import "../styles/catalogoIntro.css"

const BusquedaProductos = () => {
  const [productoBuscado, setPorductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(productData);

  useEffect(() => {
    const results = productData.filter(dataP =>
      dataP.nombre.toLowerCase().includes(productoBuscado.toLowerCase())
    );
    setDatosFiltrados(results);
  }, [productoBuscado]);

  return (
    <div>
      <input className='botonBusqueda'
        type="text"
        placeholder="Buscar..."
        value={productoBuscado}
        onChange={e => setPorductoBuscado(e.target.value)}
      />
      <div className="inventario">
        {datosFiltrados.length > 0 ? (
          datosFiltrados.map((dataP) => (
            <CardPrueba 
              key={dataP.name}
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