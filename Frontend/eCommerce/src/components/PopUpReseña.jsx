import '../styles/CardPrueba.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
import '../styles/Popup.css';
import * as jwt_decode from 'jwt-decode';
import Modal from './Pop-Up';



//obtener producto
function PopupReseña() {
    const { id } = useParams();

    const [reviewError, setReviewError] = useState(null);
    const [producto, setProducto] = useState(null);
    const [user, setUser] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const reviewRef = useRef(null);
    const scoreRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwt_decode.jwtDecode(token);
                console.log(decodedToken)
                setUser(decodedToken.unique_name);  
                const idUserDecoded = jwt_decode.jwtDecode(decodedToken.id);
                setIdUser(idUserDecoded);
                
                
                
            } catch (error) {
                console.error("Error al decodificar el token", error);
              
            }
        } else {
            console.error("Error al decodificar el token");
 
            
        }
    }, []); 

    useEffect(() => {
        
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                const Url = 'https://localhost:7015/api/Product/Product_Details'
                const response = await fetch(`${Url}?id=${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) throw new Error('Error al cargar la respuesta');
                setLoading(false);

                const data = await response.json();
                setProducto(data);

                
  
            } catch (error) {
                setError('Error al cargar el producto (catch)');
                
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();
        
        
    },[id]);

    const handleReview = async (event) => {
        event.preventDefault();
        const review = reviewRef.current.value;
        const Score = parseInt(scoreRef.current.value);
        const prodId = producto.id;
        const UserId= 4;
        const User = user;


        if (review == "") {
            console.log("No has introducido ninguna review");
            return;
        }else if(parseInt(Score)>3||parseInt(Score)<1){
            console.log("La valoracion tiene que ser entre 0 y 3");
            return;
        }else if(user == null){
            console.log("Necesitas logearte");
            return;
        }


        await sendReview({score: Score, body: review, productId: prodId, userId: UserId, userName: User});
        
    };

    const sendReview = async (data)=>{

        try {
            const response = await fetch("https://localhost:7015/api/Review/InsertReview", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Review enviada correctamente");
                resetReview();
            } else {
                const errorText = await response.text();
                console.error(errorText);
                console.log("Error al enviar la review: " + reviewError);
            }
        } catch (error) {
            console.error("Error en el envio:", error.message);

        }
    }

    const resetReview = () => {
        reviewRef.current.value = "";
    };
    const closeModal = () => {
        setIsModalOpen(false);  // Cerrar el modal
      };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
                        <div className="valoracionInfo">Valoracion: {producto.score}</div>
                        <div className="precioInfo">Precio: {producto.price} €</div>
                    </div>
                </div>
            </div>


            <div className='usuario'>
                <img src="/recursos/iconUser.svg" alt="imagen usuario" />
                <h4 className='usuarioNombre'>{user}</h4>
            </div>

            <div className='formulario'>
            <form onSubmit={handleReview} onReset={resetReview}>
            <input type="number" ref={scoreRef} className='reviewScore'/>
            <input type="text" ref={reviewRef} className='reviewText'/>
            <div className='botones.container'>
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
              </form>
            </div>
            
        </>
        ) : (
            <p>No se encontraron productos.</p>
        )}
        
    </div>
    </Modal>
    );
};


export default PopupReseña;

