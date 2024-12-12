import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BusquedaProductos from '../../components/Catalogo/BusquedaProductos.jsx';
import Carrusel from '../../components/Catalogo/Carrusel/Carrusel.jsx';
import Filtro from '../../components/Catalogo/Filtro/Filtro.jsx';
import "./Paginacion.css"
import './Catalogo.css';

function Catalogo() {
  const imagenes = [
    "../../public/recursos/imgCarrusel1.png",
    "../../public/recursos/imgCarrusel2.jpg",
    "../../public/recursos/imgCarrusel3.jpg",
    "../../public/recursos/imgCarrusel4.jpg",
  ];

  const [filtro, setFiltro] = useState('0');
  const [ordenar, setOrdenar] = useState('0');
  const [productosPorPagina, setProductosPorPagina] = useState(5);

  const [paginaActual, setPaginaActual] = useState(0);
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = ({ selected }) => {
    setPaginaActual(selected + 1);
    setPaginaSeleccionada(selected);
  };

  return (
    <>
      <div className='contenedor-catalogo'>
        <section>
          <div className='carrusel-catalogo'>
            <Carrusel images={imagenes} />
          </div>
        </section>
        <aside>
          <div className='filtro'>
            <Filtro
              options={[
                { value: '0', label: 'Todos los productos' },
                { value: '1', label: 'Café' },
                { value: '2', label: 'Té' },
                { value: '3', label: 'Otros' },
              ]}
              label='Mostrar'
              onChange={setFiltro}
            />
            <Filtro
              options={[
                { value: '0', label: 'Alfabéticamente (A-Z)' },
                { value: '1', label: 'Alfabéticamente (Z-A)' },
                { value: '2', label: 'Precio Ascendente' },
                { value: '3', label: 'Precio Descendente' },
              ]}
              label='Ordenar por'
              onChange={setOrdenar}
            />
            <Filtro
              options={[
                { value: '5', label: '5 productos' },
                { value: '10', label: '10 productos' },
                { value: '20', label: '20 productos' },
                { value: '30', label: '30 productos' },
              ]}
              label='Mostrar'
              onChange={setProductosPorPagina}
            />
          </div>
        </aside>
        <section className='sectionFloat'>
          <BusquedaProductos
            filtro={filtro}
            ordenar={ordenar}
            productosPorPagina={productosPorPagina}
            paginaActual={paginaActual}
            setTotalPaginas={setTotalPaginas}
            onLoadingStateChange={setLoading}
          />
        </section>
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          pageCount={totalPaginas}
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
    </>
  );
}

export default Catalogo;
