import Header from "../components/Header";
import Footer from "../components/Footer";
import CardPrueba from "../components/CardPrueba";

function Catalogo() {
  return (
    <>
      <head>
        <title>Bushido Beans</title>
      </head>

      <body>
        <Header />
        <main>
          <CardPrueba />
          <CardPrueba />
          <CardPrueba />
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Catalogo;