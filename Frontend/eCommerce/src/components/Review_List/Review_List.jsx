import classes from './Review_List.module.css';
import Review from './Review/Review';
import Average_Score from './Average_Score/Average_Score';
import Modal from './../Pop-Up.jsx';
import PopupReseña from './../PopUpReseña.jsx';
import { useState } from 'react';

//----- CONSTRUCTOR -----//
function ReviewObj(productId, userId, score, body) {
  if (score === undefined) {
    throw new Error("Elige una puntuación");
  }

  return {
    productId,
    userId,
    score,
    body: body || ""
  };
}



//----- OBJETO DE PRUEBA -----//
const productId = 1;
const userId = 2;
const score = 1;
const body = "Más malo que pegarle a un padre con un calcetín sudado";


//----- FUNCIÓN PARA MANDAR LA REVIEW AL BACK -----//

const newReview = ReviewObj(productId, userId, score, body);

const sendReview = async () => {
  try {
    const response = await fetch("https://localhost:7015/api/InsertReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReview)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Review enviada exitosamente:", data);
      
    } else {
      console.error("Error al enviar la review:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};

function reviewMapper(reviews) {
  return (reviews.length > 0 ? (
    reviews.map((review) => (
      <Review 
        key={review.id}
        reviewData = {{
          id: review.id,
          publicationDate: review.publiDate,
          score: review.score,
          body: review.body,
          userName: review.userName,
          avatar: review.avatar
        }}/>
    ))) : (<p>"No existen reviews de este producto"</p>)
  ); 
};

function Review_List({ data }) {
  const [open, setOpen] = useState(false);  

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className={classes.reviews_container}>
      <div className={classes.leftSide}>
        <button onClick={openModal}>Añadir Reseña</button>
        <Average_Score averageScore={data.score} />
      </div>
      <ul className={classes.review_list}>
        {reviewMapper(data.reviews)}
      </ul>
      <Modal isOpen={open} onClose={closeModal}>
                <PopupReseña/>
      </Modal>
    </div>
  );
  
};

export default Review_List;