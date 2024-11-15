import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
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
  const [totalPaginas, setTotalPaginas] = useState(1); // Total que se actualiza al recibir respuesta del backend

  
  useEffect(() => {
    // Llamada a la API cuando cambian el filtro, orden, o búsqueda
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // API del backend que retorna los productos ya filtrados y paginados

        const Url = 'https://localhost:7015/api/Product/Filtered_Products'
        const response = await fetch(`${Url}?Search=${productoBuscado}&Category=${filtro}&Order=${ordenar}&IncludeStockless=true&ProductsPerPage=${productosPorPagina}&CurrentPage=${paginaActual}`
          , {method: 'GET', headers:{'Content-Type':'aplication/json'}});
        
        if (!response.ok) throw new Error("Error al cargar los productos");
        setLoading (false);

        const data = await response.json();

        setDatosFiltrados(Array.isArray(data.filteredProducts)? data.filteredProducts:[]);  // Datos de productos recibidos
        setTotalPaginas(data.totalPages);       // Total de productos para paginación
        
        
        
      } catch (error) {
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productoBuscado, filtro, ordenar, paginaActual, productosPorPagina]);

  const handlePageChange = ({selected: selectedPage}) => {
    setPaginaActual(selectedPage+1); // Cambia la página actual según la selección del usuario
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
              imagen={dataP.image}
              nombre={dataP.name}
              intensidad={dataP.intensity}
              valoracion={dataP.score}
              precio={dataP.price}
              stock={dataP.stock}
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
        pageCount={totalPaginas} // Cálculo del número de páginas
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

BusquedaProductos.propTypes = {
  filtro: PropTypes.string.isRequired, // Ahora el id es requerido como prop
  ordenar: PropTypes.string.isRequired,
  productosPorPagina: PropTypes.number.isRequired,
};