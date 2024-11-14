import classes from './Review.module.css';

function Review({reviewData}) {

  const review = {
    id: reviewData.id,
    publicationDate: reviewData.publicationDate,
    score: reviewData.score,
    body: reviewData.body,
    userName: reviewData.userName,
    avatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/315b1136-d62f-4ef9-aeeb-bf1738eba7e0/de9feyk-f10bf0db-7b73-4cb1-bb38-b0db7cdb1dba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxNWIxMTM2LWQ2MmYtNGVmOS1hZWViLWJmMTczOGViYTdlMFwvZGU5ZmV5ay1mMTBiZjBkYi03YjczLTRjYjEtYmIzOC1iMGRiN2NkYjFkYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SCl_4YhlDQDLf8WAU1gq0tmzq1nah0wb7YCI7d0qim8"
  }

  return (
    <li className={classes.review}>
      <img className={classes.review__avatar} src={review.avatar} alt="" />
      <div className={classes.review__textualData}>
        <div className={classes.review__basicInfo}>
          <h3>{review.userName}</h3>
          <figure>
            <img className={classes.review__individualImg} src="https://cdn.pixabay.com/photo/2023/08/28/01/23/star-8218104_1280.png" alt="review star" />
            <img className={classes.review__individualImg} src="https://cdn.pixabay.com/photo/2023/08/28/01/23/star-8218104_1280.png" alt="review star" />
            <img className={classes.review__individualImg} src="https://cdn.pixabay.com/photo/2023/08/28/01/23/star-8218104_1280.png" alt="review star" />
          </figure>
        </div>
        <p>{review.publicationDate}</p>
        <p className={classes.review__body}>{review.body}</p>
      </div>
    </li>
  );
};

export default Review;