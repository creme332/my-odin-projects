/**
 * Formats seconds in HH:MM:SS format
 * @param {int} sec Number of seconds
 * @returns {string} HH:MM:SS
 */
function dateFormat(sec) {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec % 3600) / 60);
  let seconds = sec % 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + " : " + minutes + " : " + seconds;
}
// console.log(dateFormat(900));
export default dateFormat;
