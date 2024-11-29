import ListaDirecciones from "./ListaDirecciones/ListaDirecciones";
import AnadirDireccion from "./AñadirDireccion/AñadirDireccion";

function DireccionEnvio() {
    const direcciones = [
        {
            nombre: "David Andrino Ferrera",
            calle: "Calle Jaen N1 2ºB",
            ciudad: "Pueblo Tomate",
            provincia: "Málaga",
            codigopostal: 29700,
            telefono: "623456789"
        },
        {
            nombre: "Alonso Onsurbe Lopez",
            calle: "Avenida Torrox N25",
            ciudad: "Ciudad del Mal",
            provincia: "Málaga",
            codigopostal: 29700,
            telefono: "687654321",
        },
        {
            nombre: "Elias Robles Ruiz",
            calle: "Pasaje de Barcelona N8 5ºC",
            ciudad: "Gotham",
            provincia: "Málaga",
            codigopostal: 29700,
            telefono: "655555555",
        },
    ];

    return (
        <>
            <ListaDirecciones direcciones={direcciones} />
            <AnadirDireccion />
        </>
    );
}

export default DireccionEnvio;
