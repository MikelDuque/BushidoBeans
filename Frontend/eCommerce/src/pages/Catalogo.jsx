import Header from "../components/Header";
import Footer from "../components/Footer";
import { CardPrueba } from "../components/CardPrueba.jsx";
import '../styles/CardPrueba.css'
import productData from "../data/dataPrueba.js";
import CatalogoIntro from "../components/CatalagoIntro.jsx";
import BusquedaProductos from "../components/BusquedaP.jsx";


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
        <BusquedaProductos />
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Catalogo;