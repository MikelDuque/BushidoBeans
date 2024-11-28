//import '../styles/CardConfirmacion.css';
export function CardConfirmacion({ userId, totalprice, totalProducts, Date}) {

    return (
        <>
        <div>
            <h4>Usuario: {userId}</h4>
            <p>Fecha del pedido: {Date}</p>
            <div>
                <p>{totalProducts}</p>
            </div>
            <h4>Precio total: {totalprice}</h4>
        </div>
        </>
    );
}

export default CardConfirmacion;