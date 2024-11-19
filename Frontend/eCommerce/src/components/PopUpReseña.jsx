import '../styles/CardPrueba.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
import '../styles/Popup.css';
import * as jwt_decode from 'jwt-decode';
import StarRating from './Review_List/StarRating/StarRating';

//obtener producto
function PopupReseña() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [user, setUser] = useState(null);
    const reviewRef = useRef(null);
    const [selectedScore, setSelectedScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [boolReset, setBoolReset] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    console.log(boolReset)

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwt_decode.jwtDecode(token);
                console.log(decodedToken)
                setUser(decodedToken.unique_name);  
                
                
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

    const review = reviewRef.current.value.trim();
    const score = selectedScore;
    const prodId = producto?.id;
    const userId = 4; 

    if (!review) {
        console.log("No has introducido ninguna review");
        return;
    }

    if (score < 1 || score > 3) {
        console.log("La valoración tiene que ser entre 1 y 3");
        return;
    }

    if (!user) {
        console.log("Necesitas logearte");
        return;
    }

    await sendReview({ score, body: review, productId: prodId, userId });
};


const sendReview = async (data) => {
    try {
        const response = await fetch("https://localhost:7015/InsertReview", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Review enviada correctamente");
            resetReview();
        } else {
            const errorText = await response.text();
            console.error("Error al enviar la review:", errorText);
        }
    } catch (error) {
        console.error("Error en el envío:", error.message);
    }
};


    const resetReview = () => {
        
        reviewRef.current.value = "";
        setBoolReset(true);
        setTimeout(() => {
            setBoolReset(false);
        }, 100);
        
        
        

    };
    const closeModal = () => {
        setIsModalOpen(false);  // Cerrar el modal
      };

    return (
    isModalOpen && (
        <div className="modal">
            <div className="modalContent">
                <button className="closeButton" onClick={closeModal}>
                    &times;
                </button>
                <div className="cardReseña">
                    {loading ? (
                        <p>Cargando producto...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : producto != null ? (
                        <>
                            <div className="productoInfo">
                                <img
                                    className="imgInfo"
                                    src={`https://localhost:7015/${producto.image}`}
                                    alt={producto.name}
                                />
                                <div className="infoDerecha">
                                    <h4 className="nombreInfo">{producto.name}</h4>
                                    <div className="precioValoracion">
                                        <div className="valoracionInfo">Valoración: {producto.score}</div>
                                        <div className="precioInfo">Precio: {producto.price} €</div>
                                    </div>
                                </div>
                            </div>

                            <div className="usuario">
                                <img src="/recursos/iconUser.svg" alt="imagen usuario" />
                                <h4 className="usuarioNombre">{user}</h4>
                            </div>

                            <div className="formulario">
                                <form onSubmit={handleReview} onReset={resetReview}>
                                    <StarRating resetVal={boolReset} maxStars={3} onRatingChange={(rating) =>{
                                        setSelectedScore(rating);
                                        
                                    }}
                                    
                                    />
                                    <input type="text" ref={reviewRef} className="reviewText" />
                                    <div className="botonesContainer">
                                        <input type="submit" className="botonAgregar" value="Agregar" />
                                        <input type="reset" className="botonCancelar" value="Cancelar" />
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </div>
            </div>
        </div>
    )
);

};


export default PopupReseña;

