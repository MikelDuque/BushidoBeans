import classes from './Average_Score.module.css'

function printAverageScore(score) {
  return score = 0 ? "–" : Math.ceil(score) + "/3";
}

function Average_Score({score}) {
  return (
    <div className={classes.average_score}>
        <h3>Puntuación Media</h3>
        <img src="https://cdn.pixabay.com/photo/2023/08/28/01/23/star-8218104_1280.png" alt="score star" />
        <h3>{printAverageScore(score)}</h3>
    </div>
  );
};

export default Average_Score;