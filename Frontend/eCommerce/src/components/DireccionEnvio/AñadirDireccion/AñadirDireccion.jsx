import "./AñadirDireccion.css";
import Input from "../../Input"
function AñadirDireccion() {

    const handleAñadirDireccion = () => {

    };
    return (
        <div className="container-añadir-direccion">
            <h1 className="titulo-añadir-direccion">Añadir Dirección</h1>
            <form className="form-añadir-direccion">
                <div className="form-group">
                    <label htmlFor="nombre" className="label" />
                    <Input type="text" id="nombre" name="nombre" className="input" placeholder={"Nombre"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="apellido" className="label" />
                    <Input type="text" id="apellido" name="apellido" className="input" placeholder={"Apellido"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="direccion" className="label" />
                    <Input type="text" id="direccion" name="direccion" className="input" placeholder={"Dirección"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="ciudad" className="label" />
                    <Input type="text" id="ciudad" name="ciudad" className="input" placeholder={"Ciudad"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="codigoPostal" className="label" />
                    <Input type="text" id="codigoPostal" name="codigoPostal" className="input" placeholder={"Código Postal"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="pais" className="label" />
                    <Input type="text" id="pais" name="pais" className="input" placeholder={"País"}/>
                </div>

                <div className="form-group">
                    <label htmlFor="telefono" className="label" />
                    <Input type="text" id="telefono" name="telefono" className="input" placeholder={"Teléfono"}/>
                </div>

                <button type="submit" className="btn-guardar" onClick={handleAñadirDireccion}>Guardar</button>
            </form>
        </div>
    );
}

export default AñadirDireccion;
