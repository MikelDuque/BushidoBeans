import { useState, useEffect } from "react";
import classes from "./StarRating.module.css";

const StarRating = ({ maxStars = 5, onRatingChange, resetVal }) => {
  

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (resetVal) {
      setRating(0);
      if (onRatingChange) {
        onRatingChange(0);
      }
    }
  }, [resetVal, onRatingChange]);

  const handleStarClick = (index) => {
    setRating(index + 1);
    if (onRatingChange) onRatingChange(index + 1);
    
  };
  

  return (
    <div className={classes.starContainer}>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={`${classes.star} ${index < rating ? classes.filled : ""}`}
          onClick={() => handleStarClick(index)}

        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
