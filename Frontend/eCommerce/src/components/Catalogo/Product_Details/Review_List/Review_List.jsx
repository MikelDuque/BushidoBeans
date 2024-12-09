import classes from './Review_List.module.css';
import Review from './Review/Review.jsx';
import Average_Score from './Average_Score/Average_Score.jsx';
import Modal from '../../../Modals/Modal.jsx'
import PostReview from '../../../Modals/PostReview/PostReview.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { useModal } from '../../../../context/ModalContext.jsx';

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
    ))) : (<p>No existen reviews de este producto</p>)
  ); 
};

export default function Review_List({ data }) {
  const {token} = useAuth();
  const {openModal} = useModal();

  function shouldIOpen() {
    if(token) openModal("postReview");
  }

  return (
    <>
      <Modal type="postReview" titulo="Escribe una reseña" buttonValues={null}>
        <PostReview/>
      </Modal>
      
      <div className={classes.reviews_container}>
        <div className={classes.leftSide}>
          <button onClick={shouldIOpen}>Añadir Reseña</button>
          <Average_Score averageScore={data.score} />
        </div>
        <ul className={classes.review_list}>
          {reviewMapper(data.reviews)}
        </ul>
      </div>
    </>
  );
};