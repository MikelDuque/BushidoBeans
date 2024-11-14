import '../styles/CardPrueba.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import '../styles/Popup.css';


//obtener producto
function PopupReseña() {
    console.log("hola")
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const valImg = "/recursos/star.svg";
 
    useEffect(() => {
        console.log("adios")
        
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("hola")
                const Url = 'https://localhost:7015/api/Product/Product_Details'
                const response = await fetch(`${Url}?id=${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                console.log("respuesta", response)
                if (!response.ok) throw new Error('Error al cargar la respuesta');
                setLoading(false);

                const data = await response.json();
                

                console.log("data:", data)
                setProducto(data);

                
  
            } catch (error) {
                setError('Error al cargar el producto (catch)');
                
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();

        
        
    }, [id]);


    return (
        <div className='cardReseña'>
        {loading ? (
            <p>Cargando producto...</p>
        ) : error ? (
            <p>{error}</p>
        ) : producto != null ? (
        <>
            <div className='productoInfo'>
                <img className='imgInfo' src={`https://localhost:7015/${producto.image}`} alt={producto.name} />
                <div className="infoDerecha">
                    <h4 className="nombreInfo">{producto.name}</h4>
                    <div className="precioValoracion">
                        <div className="valoracionInfo">{producto.score}</div>
                        <div className="precioInfo">{producto.price} €</div>
                    </div>
                </div>
            </div>


            <div className='usuario'>
                <img src="/recursos/iconUser.svg" alt="imagen usuario" />
                <h4 className='usuarioNombre'>nombre usuario</h4>
            </div>

            <div className='formulario'>
            
              <textarea id="review" className="reviewText"></textarea>
              <input
                type="submit"
                className="botonAgregar"
                value="Agregar"
              />
              <input
                type="reset"
                className="botonCancelar"
                value="Cancelar"
              />
            </div>
        </>
        ) : (
            <p>No se encontraron productos.</p>
        )}
        
    </div>
    );
};

export default PopupReseña;