/**
 * A simple algorithm that returns a score out of 2000 based on user performance.
 */
function scoreCalculator(time, characterCount, difficulty, helpCount) {
  //Score decreases exponentially the more time player takes to find all characters
  const maxTimeScore = 800;
  const maxHelpScore = 1200;

  const exponent =
    (time - characterCount) / (30 + characterCount * difficulty * 10); // dictates how steep the exponential curve is
  const timeScore = Math.min(
    maxTimeScore,
    parseInt(maxTimeScore * Math.exp(-exponent), 10)
  );
  const helpScore = parseInt(
    maxHelpScore * (1 - Math.min(1, helpCount / Math.max(characterCount, 1)))
  );
  // console.log(`${timeScore} + ${helpScore}`);

  return timeScore + helpScore;
}
export default scoreCalculator;
// console.log(scoreCalculator(100,5,5,1));
