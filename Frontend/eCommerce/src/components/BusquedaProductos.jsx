import React, { useState, useEffect } from 'react';
import { CardPrueba } from "../components/Card-Producto.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";
import "../styles/Paginacion.css";

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina = 10 }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProductos, setTotalProductos] = useState(0); // Total que se actualiza al recibir respuesta del backend

  useEffect(() => {
    // Llamada a la API cuando cambian el filtro, orden, o búsqueda
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // API del backend que retorna los productos ya filtrados y paginados
        const response = await fetch(`/api/productos?buscar=${productoBuscado}&filtro=${filtro}&ordenar=${ordenar}&pagina=${paginaActual}&productosPorPagina=${productosPorPagina}`);
        
        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();

        setDatosFiltrados(data.productos);  // Datos de productos recibidos
        setTotalProductos(data.total);       // Total de productos para paginación
      } catch (err) {
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productoBuscado, filtro, ordenar, paginaActual, productosPorPagina]);

  const handlePageChange = (selectedPage) => {
    setPaginaActual(selectedPage.selected); // Cambia la página actual según la selección del usuario
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
        ) : datosFiltrados.length > 0 ? (
          datosFiltrados.map(dataP => (
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
        pageCount={Math.ceil(totalProductos / productosPorPagina)} // Cálculo del número de páginas
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
