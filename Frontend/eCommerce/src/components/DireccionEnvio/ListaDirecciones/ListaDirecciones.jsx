import "./ListaDirecciones.css";

function ListaDirecciones({ direcciones }) {
    return (
        <div className="container-lista-direcciones">
            <h2 className="titulo-direcciones">Lista de Direcciones</h2>
            {direcciones.length > 0 ? (
                <ul className="lista-direcciones">
                    {direcciones.map((direccion, index) => (
                        <li className="item-direccion" key={index}>
                            <p className="texto nombre-direccion">{direccion.nombre}</p>
                            <p className="texto calle-direccion">{direccion.calle}</p>
                            <p className="texto ciudad-direccion"> {direccion.ciudad}</p>
                            <p className="texto ciudad-direccion"> {direccion.telefono}</p>

                        </li>
                    ))}
                </ul>
            ) : (
                <p className="texto lista-vacia">No tienes direcciones guardadas.</p>
            )}
        </div>
    );
}

export default ListaDirecciones;
