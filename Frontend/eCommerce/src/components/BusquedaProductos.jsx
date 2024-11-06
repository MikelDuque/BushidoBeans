import React, { useState, useEffect } from 'react';
import productData from '../data/dataPrueba';
import { CardPrueba } from "../components/Card-Producto.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);  // Aquí almacenamos los productos recibidos del backend
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);  // Para controlar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores
  const [totalProductos, setTotalProductos] = useState(0);  // Para almacenar el total de productos

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
    setTotalProductos(sortedProducts.length); // Establece el total de productos filtrados
  }, [productoBuscado, filtro, ordenar]);

  const productosMostrados = datosFiltrados.slice(paginaActual * productosPorPagina, (paginaActual + 1) * productosPorPagina);

  const handlePageChange = (selectedPage) => {
    setPaginaActual(selectedPage.selected);
  };

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
              imagen={dataP.imagen}  // Usamos imagen del backend
              nombre={dataP.nombre}   // Usamos nombre del backend
              intensidad={dataP.intensidad}  // Usamos intensidad del backend
              valoracion={dataP.valoracion}  // Usamos valoracion del backend
              precio={dataP.precio}  // Usamos precio del backend
              soldout={dataP.soldout}  // Usamos soldout del backend
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={Math.ceil(totalProductos / productosPorPagina)}  // Calcula el total de páginas basado en el total de productos
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
      />
    </div>
  );
};

export default BusquedaProductos;
