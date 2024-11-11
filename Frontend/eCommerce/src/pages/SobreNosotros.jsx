import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/SobreNosotros.css";
import Carrusel from "../components/Carrusel";
import logo from "../../public/recursos/logo2.png";
import Card from "../components/Card-Equipo";
import kirby from "../../public/recursos/kirby.svg";
import sonic from "../../public/recursos/sonic.svg";
import pikachu from "../../public/recursos/pikachu.svg";
import link from "../../public/recursos/link.svg";
import ig from "../../public/recursos/ig.svg";
import tw from "../../public/recursos/x.svg";
import fc from "../../public/recursos/fc.svg";
import Maps from "../components/Maps";
import imagen1 from "../../public/recursos/carrusel1.svg";
import imagen2 from "../../public/recursos/carrusel2.svg";
import imagen3 from "../../public/recursos/carrusel3.svg";
import imagen4 from "../../public/recursos/carrusel4.svg";

function SobreNosotros() {
    const imagenes = [imagen1, imagen2, imagen3, imagen4]
    return (
        <div className='container-sobre-nosotros'>

            <Header />

            <div className="carrusel"><Carrusel images={imagenes} /></div>
            <div className='container-descripcion'>
                <div className='imagen-logo-bushido-beans'><img src={logo} alt="" /></div>
                <p className='sobrenosotros texto'>En Bushido Beans, creemos que cada momento merece ser disfrutado con una taza de café o té de la más alta calidad. Fundada con la misión de ofrecer bebidas exquisitas y prácticas, nuestra marca está diseñada para aquellos que llevan un estilo de vida ajetreado y buscan un respiro en su día a día. <br /><br />
                    Nuestra selección incluye una variedad de cafés y tés cuidadosamente preparados, todos listos para beber y disfrutar en cualquier lugar y en cualquier momento. Ya sea que necesites un impulso de energía inmediata para afrontar una larga jornada, o simplemente desees saborear un momento de tranquilidad, Bushido Beans tiene la bebida perfecta para ti.<br /><br />
                    Cada producto que ofrecemos combina ingredientes de calidad premium con sabores únicos, presentados en formatos convenientes que se adaptan a tu ritmo de vida. Desde intensos cafés hasta delicados tés, nuestra variedad está diseñada para satisfacer todos los paladares.</p>
            </div>

            <hr className='separador' />

            <div className='container-mision'>
                <div className='container-imagen-mision'><img src="/recursos/mision.jpg" alt="" className='imagen-mision' /></div>
                <div className='container-texto-mision'>
                    <p className='titulo titulo-mision'>Mision</p><br />
                    <i><p className='titulo texto-mision'>"Ofrecer una experiencia de café excepcional que inspire y conecte, respetando los principios de calidad, sostenibilidad y pasión por el arte del café."</p></i></div>
            </div>

            <div className='container-vision'>
                <p className='titulo titulo-vision'>Vision</p>
                <p className='texto-vision'>Queremos posicionarnos como la marca de referencia en el mundo del café artesanal, creando una comunidad apasionada y educada sobre el arte del café. Visualizamos un futuro en el que Bushido Beans sea sinónimo de calidad y responsabilidad, ofreciendo un espacio acogedor para que nuestros clientes vivan una experiencia única y memorable, mientras contribuimos al bienestar de nuestros colaboradores y la sostenibilidad del planeta.</p>
            </div>


            <div className='container-valores'>
                <ul>
                <p className='titulo titulo-mision'>Valores</p>
                    <li className='subtitulo texto-mision'><span className='spanBeans'>B</span>ienestar: Fomentamos un entorno positivo y saludable, tanto para nuestros colaboradores como para los clientes, apoyando prácticas que generen bienestar en toda la cadena de producción.</li>
                    <li className='subtitulo texto-mision'><span className='spanBeans'>E</span>xcelencia: Nos comprometemos a ofrecer siempre el mejor café, desde el origen hasta el momento en que llega a la taza de cada cliente.</li>
                    <li className='subtitulo texto-mision'><span className='spanBeans'>A</span>utenticidad: Valoramos y celebramos la esencia del café, respetando su autenticidad en cada paso de nuestro proceso.</li>
                    <li className='subtitulo texto-mision'><span className='spanBeans'>N</span>aturaleza: Valoramos y respetamos el entorno natural, promoviendo prácticas que protejan los recursos y apoyen la biodiversidad en cada aspecto de nuestra operación.</li>
                    <li className='subtitulo texto-mision'><span className='spanBeans'>S</span>ostenibilidad: Priorizamos prácticas responsables que respetan el entorno y apoyan un futuro más verde, reduciendo el impacto ambiental de nuestras operaciones.</li>
                </ul>
                <div className='container-imagen-valores' ><img src="/recursos/valores.jpg" alt="" className='imagen-valores' /></div>

            </div>

            <hr className='separador' />

            <div className='container-equipo'>
                <div className='container-titulo'>
                    <p className='titulo titulo-equipo'>Nuestro Equipo</p>
                    <hr className='separador-secundario' />
                    <p className='subtitulo subtitulo-equipo'>Nos une la pasión por la tecnología, el aprendizaje continuo, el café y el té, con el fin de mejorar la vida de nuestros clientes</p>
                </div>
                <div className='container-componentes'>
                    <Card nombre="Ivan Montes" cargo="Marketing" imagen={kirby}></Card>
                    <Card nombre="David Andrino" cargo="Logistica" imagen={sonic}></Card>
                    <Card nombre="Yasir Bel Maalem" cargo="Full Stack Developer" imagen={pikachu}></Card>
                    <Card nombre="Mikel Duque" cargo="CEO & Fundador" imagen={link}></Card>
                </div>
            </div>

            <hr className='separador' />

            <div className='container-informacionAdicional'>
                <div className='container-informacion'>
                    <div className='container-dondeEstamos'>
                        <p className='titulo'>Donde estamos</p>
                        <hr className='separador-informacionAdicional' />
                        <div className='container-direccion-contacto'>
                            <p className='titulo'>Direcccion: </p> <span className='texto'>C. Charles Darwin, 3, Campanillas, 29590 Málaga</span>
                            <p className='titulo'>Contacto: </p> <span className='texto'>+34 785 641 462 , bushidobeans@gmail.es</span>
                        </div>
                    </div>

                    <div className='container-redesSociales'>
                        <p className='titulo'>Nuestras Redes</p>
                        <hr className='separador-informacionAdicional' />
                        <div className='container-img-redesSociales'>
                            <div className="redes-sociales-item">
                                <img src={ig} alt="Instagram" />
                                <p className='subtitulo ig'>@bushidobeans</p>
                            </div>
                            <div className="redes-sociales-item">
                                <img src={tw} alt="Twitter" />
                                <p className='subtitulo tw'>@bushidobeans</p>
                            </div>
                            <div className="redes-sociales-item">
                                <img src={fc} alt="Facebook" />
                                <p className='subtitulo fc'>@bushidobeans</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-maps'>
                    <Maps className="maps" direccion="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.447613777691!2d-4.558384723732234!3d36.74307277091706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f1d3dde02b7b%3A0x499336c8cdfb308a!2sC.%20Charles%20Darwin%2C%203%2C%20Campanillas%2C%2029590%20M%C3%A1laga!5e1!3m2!1sen!2ses!4v1730662620262!5m2!1sen!2ses"></Maps>
                </div>
            </div>



            <Footer />

        </div>
    );

}

export default SobreNosotros;