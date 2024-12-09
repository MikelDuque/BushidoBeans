function CardDireccion({ direccion }) {
    return (
        <div className="card">
            <h3>{direccion.nombre}</h3>
            <p>{direccion.calle}</p>
            <p>{direccion.ciudad}, {direccion.codigoPostal}</p>
        </div>
    );
}

export default CardDireccion;
