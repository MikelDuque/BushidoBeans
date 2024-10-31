import cardPic from  '../assets/pouchdrinkprueba.jpg'
import '../styles/CardPrueba.css'
function CardPrueba(){

    return(
        <div className="inventario">
           <div className="cardPrueba">
                <img className="imgPrueba" src={cardPic} alt="pouch drink prueba" />
                <h4 className="productName">Producto 1</h4>
                <div className="detallesDiv">
                    <p className="detalles">☕☕☕</p>
                    <p className="detalles">22,22€</p>
                </div>
            </div>
            <div className="cardPrueba">
                <img className="imgPrueba" src={cardPic} alt="pouch drink prueba" />
                <h4 className="productName">Producto 1</h4>
                <div className="detallesDiv">
                    <p className="detalles">☕☕☕</p>
                    <p className="detalles">22,22€</p>
                </div>
            </div>
            <div className="cardPrueba">
                <img className="imgPrueba" src={cardPic} alt="pouch drink prueba" />
                <h4 className="productName">Producto 1</h4>
                <div className="detallesDiv">
                    <p className="detalles">☕☕☕</p>
                    <p className="detalles">22,22€</p>
                </div>
            </div>
            <div className="cardPrueba">
                <img className="imgPrueba" src={cardPic} alt="pouch drink prueba" />
                <h4 className="productName">Producto 1</h4>
                <div className="detallesDiv">
                    <p className="detalles">☕☕☕</p>
                    <p className="detalles">22,22€</p>
                </div>
            </div>
        </div>
    );
}

export default CardPrueba;