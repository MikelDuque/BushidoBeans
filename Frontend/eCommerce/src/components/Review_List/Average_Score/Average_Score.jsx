import classes from './Average_Score.module.css'

function printAverageScore(score) {
  return score <= 0 ? "–" : `${Number(score).toFixed(2)} / 3`;
}

const valImg = "/recursos/star.svg";

function Average_Score({averageScore}) {
  return (
    <div className={classes.average_score}>
        <h3>Puntuación Media</h3>
        <img src={valImg} alt="score star" />
        <h3>{printAverageScore(averageScore)}</h3>
    </div>
  );
};

export default Average_Score;