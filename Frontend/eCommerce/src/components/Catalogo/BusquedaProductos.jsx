import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardProduct } from '../CardProduct/CardProduct.jsx';
import { CircleLoader } from 'react-spinners';
import '../../pages/Catalogo/Catalogo.css';
import { GET_FILTERED_PRODUCTS } from '../../endpoints/config.js';

const BusquedaProductos = ({
  filtro,
  ordenar,
  productosPorPagina,
  paginaActual,
  setTotalPaginas,
  onLoadingStateChange
}) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      onLoadingStateChange(true);

      try {
        const backendFilter = {
          search: productoBuscado,
          category: filtro,
          order: ordenar,
          includeStockless: true,
          productsPerPage: productosPorPagina,
          currentPage: paginaActual,
        };

        const response = await fetch(GET_FILTERED_PRODUCTS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendFilter),
        });

        if (!response.ok) throw new Error('Error al cargar los productos');

        const data = await response.json();

        setDatosFiltrados(Array.isArray(data.filteredProducts) ? data.filteredProducts : []);
        setTotalPaginas(data.totalPages);
      } catch (error) {
        setError('Hubo un error al cargar los productos: ', error);
      } finally {
        onLoadingStateChange(false);
      }
    };

    fetchData();
  }, [productoBuscado, filtro, ordenar, paginaActual, productosPorPagina]);

  return (
    <div className='busqueda-wrapper'>
      <div className='botonCentrado'>
        <input
          className='botonBusqueda'
          type='text'
          placeholder='Buscar...'
          value={productoBuscado}
          onChange={(e) => setProductoBuscado(e.target.value)}
        />
      </div>

      <div className='inventario'>
        {error ? (
          <p>{error}</p>
        ) : datosFiltrados.length > 0 ? (
          datosFiltrados.map((dataP) => (
            <CardProduct key={dataP.id} product={dataP} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

BusquedaProductos.propTypes = {
  filtro: PropTypes.string.isRequired,
  ordenar: PropTypes.string.isRequired,
  productosPorPagina: PropTypes.number.isRequired,
  paginaActual: PropTypes.number.isRequired,
  setTotalPaginas: PropTypes.func.isRequired,
  onLoadingStateChange: PropTypes.func.isRequired,
};

export default BusquedaProductos;
