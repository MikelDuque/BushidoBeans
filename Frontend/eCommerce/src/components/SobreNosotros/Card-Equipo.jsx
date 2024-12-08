import './Card.css';
function Card({ cargo, nombre, imagen }) {
    return (
        <div className='card'>
            <div className='imagen-card'><img src={imagen} alt="" /></div>
            <div className='cargo-card titulo'>{cargo}</div>
            <hr className='separador-card '/>
            <div className='nombre-card subtitulo'>{nombre}</div>
        </div>
    );
}

export default Card;
