/**
 * Takes a string and returns it with the first character capitalized.
 * @param {String} str
 * @returns {String}
 */
export function capitalize(str) {
  return str.length === 0 ? str : str[0].toUpperCase() + str.substring(1);
}

/**
 * Takes a string and returns it reversed
 * @param {String} str
 * @returns {String}
 */
export function reverseString(str) {
  return str.split("").reverse().join("");
}

/**
 * A calculator object that contains functions for the basic operations: add, subtract, divide, and multiply.
 *  Each of these functions take two numbers and return the correct calculation.
 * @returns
 */
export const calculator = (() => {
  const add = (a, b) => +a + +b;
  const subtract = (a, b) => +a - +b;
  const multiply = (a, b) => +a * +b;
  const divide = (a, b) => +a / +b;
  return {
    add,
    subtract,
    multiply,
    divide,
  };
})();

/**
 * Takes a string and returns it with each character “shifted”.
 * @param {String} str
 * @returns {String}
 */
export function caesarCipher(str, shift = 1) {
  let cipher = "";
  for (const letter of str) {
    let ascii = letter.charCodeAt();
    if (ascii > 64 && ascii < 91) {
      // lower case letter
      ascii = ((ascii - 65 + shift) % 26) + 65;
    } else if (ascii > 96 && ascii < 123) {
      // upper case letter
      ascii = ((ascii - 97 + shift) % 26) + 97;
    }
    cipher += String.fromCharCode(ascii);
  }
  return cipher;
}

/**
 * An analyzeArray function that takes an array of numbers and
 * returns an object with the following properties: average, min, max, and length.
 * @param {List} array
 * @returns
 */
export function analyzeArray(array) {
  if (array.length === 0)
    return {
      average: undefined,
      min: undefined,
      max: undefined,
      length: 0,
    };
  const sum = array.reduce((a, b) => a + b);
  array.sort((a, b) => a - b);
  const object = {
    average: sum / array.length,
    min: array[0],
    max: array[array.length - 1],
    length: array.length,
  };

  return object;
}
