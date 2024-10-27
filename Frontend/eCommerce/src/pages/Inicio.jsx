import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollIntro from "../components/Intro";
import "./inicio.css"

function Inicio() {
  return (
    <>
      <head>
        <title>Bushido Beans</title>
      </head>

      <body>

        <ScrollIntro />

        <Header />
        <main>
          <div className="content">
            <div className="texto">
              <h2>Nueva forma de disfrutar tu café</h2>
              <p>¡Descubre la energía y el sabor de nuestra nueva lata de café bebible! Perfecta para esos momentos en los que necesitas un impulso rápido, nuestra bebida combina la intensidad del café recién hecho con la comodidad de un formato listo para llevar. Disfruta de un sabor rico y auténtico en cada sorbo, sin necesidad de preparación. Ya sea en casa, en la oficina o en movimiento, nuestra lata de café es tu compañera ideal para mantenerte alerta y productivo. ¡Prueba el café que se adapta a tu ritmo de vida y despierta tus sentidos en cualquier lugar!</p>
            </div>
            <img src="recursos/LataBushidoBInicio.jpg" /></div>

          <div className="content">
            <img src="recursos/TermoBushidoBInicio.jpg" />
            <div className="texto">
              <h2>¡Bienvenido!</h2>
              Para agradecerte por tus compras superiores a 20€, te regalamos un exclusivo termo. Este termo no solo es perfecto para mantener tus bebidas a la temperatura ideal, sino que también es un accesorio elegante y práctico que podrás llevar a donde quieras. No pierdas la oportunidad de disfrutar de este obsequio especial. ¡Haz tu compra hoy y recibe tu termo exclusivo como regalo de bienvenida!
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
}

export default Inicio;