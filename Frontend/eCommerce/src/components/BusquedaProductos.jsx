import React, { useState, useEffect } from 'react';
import { CardPrueba } from "../components/Card-Producto.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";
import "../styles/Paginacion.css"; // Asegúrate de tener un archivo CSS para personalizar la paginación

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);  // Aquí almacenamos los productos recibidos del backend
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);  // Para controlar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores
  const [totalProductos, setTotalProductos] = useState(0);  // Para almacenar el total de productos

  // Realizar la solicitud a la API para obtener los productos filtrados y ordenados
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        // Construir los parámetros de búsqueda
        const params = new URLSearchParams({
          busqueda: productoBuscado,
          filtro: filtro,  // 'opcion2' para café, 'opcion3' para té, etc.
          ordenar: ordenar,  // 'opcion2' para precio ascendente, 'opcion3' para precio descendente, etc.
          pagina: paginaActual + 1,  // Asegúrate de enviar la página como 1-based
          productosPorPagina: productosPorPagina
        });

        // Reemplaza esta URL con la URL de tu API
        const response = await fetch(`/api/productos?${params.toString()}`);  // Cambia la URL según tu backend
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();  // Parsear la respuesta como JSON
        
        setDatosFiltrados(data.productos);  // Los productos recibidos se almacenan en el estado
        setTotalProductos(data.total); // Asegúrate de que tu API devuelva el total de productos
      } catch (error) {
        setError('Hubo un error al cargar los productos');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [productoBuscado, filtro, ordenar, paginaActual, productosPorPagina]);

  // Configura los productos mostrados en la página actual
  const productosMostrados = datosFiltrados;

  // Maneja el cambio de página
  const handlePageChange = ({ selected }) => {
    setPaginaActual(selected);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

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
        {productosMostrados.length > 0 ? (
          productosMostrados.map(dataP => (
            <CardPrueba 
              key={dataP.id}
              id={dataP.id}
              imagen={dataP.imagen}  // Usamos imagen del backend
              nombre={dataP.nombre}   // Usamos nombre del backend
              descripcion={dataP.description}  // Nueva propiedad
              intensidad={dataP.intensidad}  // Usamos intensidad del backend
              precio={dataP.precio}  // Usamos precio del backend
              stock={dataP.stock}   // Usamos stock del backend
              puntuacion={dataP.Score}  // Usamos Score del backend
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
