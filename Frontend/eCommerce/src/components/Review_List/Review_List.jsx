import classes from './Review_List.module.css';
import Review from './Review/Review.jsx';
import Average_Score from './Average_Score/Average_Score.jsx';
import Modal from '../Pop-Up.jsx';
import PopupReseña from '../PopUpReseña.jsx';
import { useState } from 'react';

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