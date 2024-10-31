import Header from "../components/Header";
import Footer from "../components/Footer";
import { CardPrueba } from "../components/CardPrueba.jsx";
import '../styles/CardPrueba.css'
import productData from "../data/dataPrueba.js";
import CatalogoIntro from "../components/CatalagoIntro.jsx";


function Catalogo() {
  return (
    <>
      <head>
        <title>Bushido Beans</title>
      </head>

      <body>
        <Header />
        <main>
        <CatalogoIntro />
        <div className="inventario">
          
        {(productData.length > 0) ? (
            productData.map((dataP) => (
              //imagen, nombre, intensidad, precio, soldout
            <CardPrueba 
            imagen={dataP.imagen} 
            nombre={dataP.nombre} 
            intensidad={dataP.intensidad} 
            precio={dataP.precio}
            key={dataP.name}
            soldout={dataP.soldout}
            />
            
        ))
        ) : (
        <p>Estamos en mantenimiento</p>
        )}
        </div>
      
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Catalogo;