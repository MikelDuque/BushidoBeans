//import '../styles/CardConfirmacion.css';
export function CardConfirmacion({ userId, totalprice, totalProducts, purchaseDate}) {

    return (
        <>
        <div>
            <h4>Usuario: {userId}</h4>
            <p>Fecha del pedido: {purchaseDate}</p>
            <div>
            <p>Productos totales:{totalProducts}</p>
            </div>
            <h4>Precio total: {totalprice}</h4>
        </div>
        </>
    );
}

export default CardConfirmacion;