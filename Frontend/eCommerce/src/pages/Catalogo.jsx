import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { CardPrueba } from "../components/Card-Producto.jsx";
import productData from "../data/dataPrueba.js";
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

  const mostrarOptions = [
    { value: 'opcion1', label: 'Café' },
    { value: 'opcion2', label: 'Té' },
    { value: 'opcion3', label: 'Todos los productos' }
  ];
  
  const ordenarPor = [
    { value: 'opcion1', label: 'Novedades' },
    { value: 'opcion2', label: 'Precio Ascendente' },
    { value: 'opcion3', label: 'Precio Descendente' },
    { value: 'opcion4', label: 'Alfabéticamente (A-Z)' },
    { value: 'opcion5', label: 'Alfabéticamente (Z-A)' }
  ];

  const [filtro, setFiltro] = useState('opcion3');
  const [ordenar, setOrdenar] = useState('opcion1');

  const handleFiltroChange = (value) => {
    setFiltro(value);
  };

  const handleOrdenarChange = (value) => {
    setOrdenar(value);
  };

  const filteredProducts = productData.filter((dataP) => {
    if (filtro === 'opcion1') return dataP.nombre.toLowerCase().includes('café');
    if (filtro === 'opcion2') return dataP.nombre.toLowerCase().includes('té');
    return true; // Mostrar todos los productos
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (ordenar === 'opcion2') return a.precio - b.precio; // Precio Ascendente
    if (ordenar === 'opcion3') return b.precio - a.precio; // Precio Descendente
    if (ordenar === 'opcion4') return a.nombre.localeCompare(b.nombre); // A-Z
    if (ordenar === 'opcion5') return b.nombre.localeCompare(a.nombre); // Z-A
    return 0; // Sin orden específico (Novedades)
  });

  return (
    <div className="contenedor-catalogo">
      <Header />
      <div className="barraBusqueda"><BusquedaProductos></BusquedaProductos></div>
        <div className='carrusel-catalogo'>
          <Carrusel images={imagenes} />
        </div>
        <div className="filtro">
          <div className="mostrar"><Filtro options={mostrarOptions} label="Mostrar" onChange={handleFiltroChange}/></div>
          <div className="ordenar"><Filtro options={ordenarPor} label="Ordenar por" onChange={handleOrdenarChange} /></div>
        </div>
        <div className="inventario">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((dataP) => (
              <CardPrueba
                imagen={dataP.imagen}
                nombre={dataP.nombre}
                intensidad={dataP.intensidad}
                precio={dataP.precio}
                key={dataP.nombre}
                soldout={dataP.soldout}
              />
            ))
          ) : (
            <p>Estamos en mantenimiento</p>
          )}
        </div>
      <Footer />
    </div>
  );
}

export default Catalogo;
