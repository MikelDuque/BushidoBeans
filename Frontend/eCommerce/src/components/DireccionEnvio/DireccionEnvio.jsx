import { useDirecciones } from "../../context/DireccionContext";

function DireccionEnvio() {
    const { direcciones, loading } = useDirecciones();

    if (loading) return <p>Cargando direcciones...</p>;

    return (
        <div>
            <h1>Dirección de Envío</h1>
            {direcciones.length > 0 ? (
                <ul>
                    {direcciones.map((direccion) => (
                        <li key={direccion.id}>
                            {direccion.nombre}, {direccion.calle}, {direccion.ciudad}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes direcciones guardadas.</p>
            )}
        </div>
    );
}

export default DireccionEnvio;
