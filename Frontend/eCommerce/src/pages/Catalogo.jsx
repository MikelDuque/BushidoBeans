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

  const mostrarOptions = [
    { value: 'opcion1', label: 'Todos los productos' },
    { value: 'opcion2', label: 'Café' },
    { value: 'opcion3', label: 'Té' }
  ];

  const ordenarPor = [
    { value: 'opcion1', label: 'Novedades' },
    { value: 'opcion2', label: 'Precio Ascendente' },
    { value: 'opcion3', label: 'Precio Descendente' },
    { value: 'opcion4', label: 'Alfabéticamente (A-Z)' },
    { value: 'opcion5', label: 'Alfabéticamente (Z-A)' }
  ];

  return (
    <>
    
    <Header />
    <div className="contenedor-catalogo">
      
      <section>
            <div className='carrusel-catalogo'>
              <Carrusel images={imagenes} />
            </div>
      </section>
            
      <aside>
          <div className="filtro">
              <Filtro options={mostrarOptions} label="Mostrar" onChange={setFiltro} />
              <Filtro options={ordenarPor} label="Ordenar por" onChange={setOrdenar} />
          </div>
      </aside>
      <section className="sectionFloat">
            <BusquedaProductos filtro={filtro} ordenar={ordenar} />
      </section>
      
      
      
    </div>
   
        <Footer />
    
    </>
  );
  
}

export default Catalogo;
