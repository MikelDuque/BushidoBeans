import { useDirecciones } from "../../../context/DireccionContext";

function ListaDirecciones() {
    const { direcciones } = useDirecciones();

    return (
        <div>
            <h2>Lista de Direcciones</h2>
            {direcciones.map((direccion) => (
                <CardDireccion key={direccion.id} direccion={direccion} />
            ))}
        </div>
    );
}

export default ListaDirecciones;
