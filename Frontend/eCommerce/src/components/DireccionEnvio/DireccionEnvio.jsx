import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";
function DireccionEnvio() {
    const direcciones = [
        {
            nombre: "David Andrino",
            calle: "Calle Jaen",
            ciudad: "Pueblo Tomate",
            telefono: "123456789",
        },
        {
            nombre: "Alonso Onsurbe Lopez",
            calle: "Avenida Torrox",
            ciudad: "Ciudad del Mal",
            telefono: "987654321",
        },
        {
            nombre: "Elias Robles Ruiz",
            calle: "Pasaje de Barcelona",
            ciudad: "Gotham",
            telefono: "555555555",
        },
    ];

    return (
        <div>
            <h1>Dirección de Envío</h1>
            <ListaDirecciones direcciones={direcciones} />
            <AnadirDireccion />
        </div>
    );
}

export default DireccionEnvio;
