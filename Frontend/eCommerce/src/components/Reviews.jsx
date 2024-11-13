import { useState } from "react";

function Reviews() {
    const [reviews, setReview] = useState([])
    const fetchReviews = async () => {
        try {
            const response = await fetch('');
            const data = await response.json();
            setReview(data);

        }catch (error) {
            console.error('Error al obtener las reseñas:', error);
        }
        console.log(data);
    }

    return (
        <div className="container-review">
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <p>{review.autor}</p>
                        <p><strong>Fecha de publicación:</strong> {new Date(review.fechaPublicacion).toLocaleDateString()}</p>
                        <p>{review.cuerpo}</p>
                        <p><strong>Puntuación:</strong> {review.puntuacion} / 3</p>
                    </div>
                ))
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );

}

export default Reviews; 