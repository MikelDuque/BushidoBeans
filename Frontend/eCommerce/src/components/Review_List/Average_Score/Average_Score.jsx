import classes from './Average_Score.module.css'

function printAverageScore(score) {
  const valorationImg = "/recursos/star.svg";
  const realScore = Number(score).toFixed(2);
  const porcentageScore = 100-((realScore/3)*100);

  const scoreString = score <= 0 ? "–" : `${realScore} / 3`;

  return (
    <>
      <img src={valorationImg} className={classes.starImg} style={{clipPath: `inset(0 ${porcentageScore}% 0 0`}} />
      <h3>{scoreString}</h3>
    </>
  );
}

function Average_Score({averageScore}) {
  return (
    <div className={classes.average_score}>
        <h3>Puntuación Media</h3>
        {printAverageScore(averageScore)}
        {/*
        <img src={valImg} alt="score star" />
        <h3>{printAverageScore(averageScore)}</h3>
        */}
    </div>
  );
};

export default Average_Score;