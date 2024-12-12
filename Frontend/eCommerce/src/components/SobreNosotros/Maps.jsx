import "../../pages/sobreNosotros/SobreNosotros.css";

function Maps(direccion){
    return (
        <div className='map-container'>
            <iframe
                src={direccion.direccion}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
}
export default Maps;