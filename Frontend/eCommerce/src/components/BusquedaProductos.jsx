import React, { useState, useEffect } from 'react';
import { CardPrueba } from "../components/Card-Producto.jsx";
import ReactPaginate from 'react-paginate';
import "../styles/Catalogo.css";
import "../styles/Paginacion.css";

const BusquedaProductos = ({ filtro, ordenar, productosPorPagina }) => {
  const [productoBuscado, setProductoBuscado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Iniciando solicitud de productos...");
        const response = await fetch(`https://localhost:7015/FilteredProducts?Search=${productoBuscado}&Category=${filtro}&Order=${ordenar}&ThereStock=true&ProductsPerPage=${productosPorPagina}&CurrentPage=${paginaActual}`);
        
        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();
        console.log("Datos recibidos:", data);

        setDatosFiltrados(data.productos || []);
        setTotalProductos(data.total || 0);
      } catch (err) {
        console.error("Error en la solicitud:", err);
        setError("Hubo un error al cargar los productos.");
        setDatosFiltrados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productoBuscado, filtro, ordenar, paginaActual, productosPorPagina]);


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
        pageCount={Math.ceil(totalProductos / productosPorPagina)}
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