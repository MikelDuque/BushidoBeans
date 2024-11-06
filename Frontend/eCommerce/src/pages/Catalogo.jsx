import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Carrusel from "../components/Carrusel.jsx";
import Filtro from "../components/Filtro.jsx";
import "../styles/Catalogo.css";
import { useState } from "react";
import BusquedaProductos from "../components/BusquedaProductos.jsx";


function Catalogo() {
  const imagenes = [
    "../../public/recursos/imgCarrusel1.png",
    "../../public/recursos/imgCarrusel2.jpg",
    "../../public/recursos/imgCarrusel3.jpg",
    "../../public/recursos/imgCarrusel4.jpg",
  ];
  const [filtro, setFiltro] = useState('opcion3');
  const [ordenar, setOrdenar] = useState('opcion1');
  const [pagina, setPagina] = useState(0);
  const [productos, setProductos] = useState(10);

  const mostrarOptions = [
    { value: '0', label: 'Todos los productos' },
    { value: '1', label: 'Café' },
    { value: '2', label: 'Té' },
    { value: '3', label: 'Otros' }

  ];

  const ordenarPor = [
    { value: '0', label: 'Alfabéticamente (A-Z)' },
    { value: '1', label: 'Alfabéticamente (Z-A)' },
    { value: '2', label: 'Precio Descendente' },
    { value: '3', label: 'Precio Ascendente' },
  ];
  
  const mostrarProductos =[
    { value: '0', label: '3 productos' },
    { value: '1', label: '5 productos' },
    { value: '2', label: '10 productos' },
    { value: '3', label: '20 productos' },
  ];
  // Función para manejar el cambio en la cantidad de productos por página
  const handleProductosPorPaginaChange = (e) => {
    setProductos(Number(e.target.value));  // Cambia el número de productos por página
    setPagina(0);  // Reinicia la página actual a la primera página
  };
  return (
    <>
    <div className="contenedor-catalogo">
      <Header />
      <div className='carrusel-catalogo'>
        <Carrusel images={imagenes} />
      </div>
      <div className="filtro">
        <Filtro options={mostrarOptions} label="Mostrar" onChange={setFiltro} />
        <Filtro options={ordenarPor} label="Ordenar por" onChange={setOrdenar} />
        <Filtro options={mostrarProductos} label="Mostrar" onChange={handleProductosPorPaginaChange}></Filtro>
      </div>

      <div>
        <BusquedaProductos filtro={filtro} ordenar={ordenar} productosPorPagina={productos} />
      </div>
      
    </div>
   
        <Footer />
    
    </>
  );
  
}

export default Catalogo;
