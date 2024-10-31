//import cardPic from  '../assets/pouchdrinkprueba.jpg'
import '../styles/CardPrueba.css'
import Proptypes from "prop-types"
export function CardPrueba({imagen, nombre, intensidad, precio, soldout}){

    return(
        <div className="inventario">
           <div className={`cardPrueba ${soldout && "sold-out"}`}>
                <img className="imgPrueba" src={imagen} alt={nombre} />
                <h4 className="productName">{nombre}</h4>
                <div className="detallesDiv">
                    <p className="detalles">{intensidad}</p>
                    <p className="detalles">{precio} €</p>
                </div>
            </div>
        </div>
    );
}

CardPrueba.propTypes = {
    imagen : Proptypes.string,
    nombre : Proptypes.string,
    intensidad : Proptypes.string,
    precio : Proptypes.number,
    soldout : Proptypes.bool

}