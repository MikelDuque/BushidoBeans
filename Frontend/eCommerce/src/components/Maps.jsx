import React from "react"
import "../styles/SobreNosotros.css";

function Maps(direccion){
    return (
        <div className='map-container'>
            <iframe
                src={direccion.direccion}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
}
export default Maps;