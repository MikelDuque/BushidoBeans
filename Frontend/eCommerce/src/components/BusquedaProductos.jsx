import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { CardProduct } from "./CardProduct/CardProduct.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";
import "../styles/Paginacion.css";
import { CircleLoader } from 'react-spinners';
import { GET_FILTERED_PRODUCTS } from '../endpoints/config.js';

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina = 10 }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPaginas, setTotalPaginas] = useState(1); 


  useEffect(() => {
    // Llamada a la API cuando cambian el filtro, orden, o búsqueda
    const fetchData = async () => {
      setError(null);

      try {
        const Url = GET_FILTERED_PRODUCTS
        const response = await fetch(`${Url}?Search=${productoBuscado}&Category=${filtro}&Order=${ordenar}&IncludeStockless=true&ProductsPerPage=${productosPorPagina}&CurrentPage=${paginaActual}`
          , {method: 'GET', headers:{'Content-Type':'aplication/json'}});
        
        if (!response.ok) throw new Error("Error al cargar los productos");
        setLoading (false);

        const data = await response.json();

        setDatosFiltrados(Array.isArray(data.filteredProducts)? data.filteredProducts:[]);  
        setTotalPaginas(data.totalPages); 
        
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
    setPaginaSeleccionada(selectedPage);
    
  };
  
  useEffect(() => {
    setPaginaActual(0);
    setPaginaSeleccionada(0);
    
  }, [filtro, ordenar, productosPorPagina]);

  return (
    <div>
      <div className='botonCentrado'>
        <input
          className='botonBusqueda'
          type="text"
          placeholder="Buscar..."
          value={productoBuscado}
          onChange={e => {
            setProductoBuscado(e.target.value);
          }}
        />
      </div>
 
      <div className="inventario">
        {loading ? (
          <CircleLoader color='#295026' size={100}  />
        ) : error ? (
          <p>{error}</p>
        ) : datosFiltrados.length > 0 ? (
          datosFiltrados.map(dataP => (
            <CardProduct
              key={dataP.id}
              product={dataP}
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
          forcePage={paginaSeleccionada}
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