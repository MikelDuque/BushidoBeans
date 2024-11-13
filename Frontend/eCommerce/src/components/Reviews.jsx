
function Reviews(reviews) {

    return (
        <div className="container-review">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <p>{review.UserName}</p>
                        <p><strong>Fecha de publicación:</strong> {new Date(review.PubliDate).toLocaleDateString()}</p>
                        <p>{review.body}</p>
                        <p><strong>Puntuación:</strong> {review.score} / 3</p>
                    </div>
                ))
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );

}

export default Reviews; 