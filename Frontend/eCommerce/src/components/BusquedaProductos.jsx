import React, { useState, useEffect } from 'react';
import productData from '../data/dataPrueba';
import { CardPrueba } from "../components/Card-Producto.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";
import "../styles/Paginacion.css";

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina}) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    setLoading(true);
    try {
      // Filtrar productos según la búsqueda y el filtro
      const filteredProducts = productData.filter(dataP => {
        const matchesSearch = dataP.nombre.toLowerCase().includes(productoBuscado.toLowerCase());
        const matchesFiltro = filtro === '1' ? dataP.nombre.toLowerCase().includes('café') :
          filtro === '2' ? dataP.nombre.toLowerCase().includes('té') : true;
        return matchesSearch && matchesFiltro;
      });

      // Ordenar los productos filtrados
      const sortedProducts = filteredProducts.sort((a, b) => {
        if (ordenar === '0') return a.nombre.localeCompare(b.nombre);
        if (ordenar === '1') return b.nombre.localeCompare(a.nombre);
        if (ordenar === '2') return a.precio - b.precio;
        if (ordenar === '3') return b.precio - a.precio;
        return 0; // Sin orden específico
      });


      setDatosFiltrados(sortedProducts);
      setTotalProductos(sortedProducts.length);
    } catch (err) {
      setError("Hubo un error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, [productoBuscado, filtro, ordenar]); // Se vuelve a ejecutar cuando cambian estos valores


  // Paginación: Mostrar solo los productos correspondientes a la página actual
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
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : productosMostrados.length > 0 ? (
          productosMostrados.map(dataP => (
            <CardPrueba
              key={dataP.id}
              id={dataP.id}
              imagen={dataP.imagen}
              nombre={dataP.nombre}
              intensidad={dataP.intensidad}
              valoracion={dataP.valoracion}
              precio={dataP.precio}
              soldout={dataP.soldout}
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
        pageCount={Math.ceil(totalProductos / productosPorPagina)} // Calcula el total de páginas según productosPorPagina
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
