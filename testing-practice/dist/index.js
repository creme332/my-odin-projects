"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyzeArray = analyzeArray;
exports.caesarCipher = caesarCipher;
exports.calculator = void 0;
exports.capitalize = capitalize;
exports.reverseString = reverseString;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Takes a string and returns it with the first character capitalized.
 * @param {String} str
 * @returns {String}
 */
function capitalize(str) {
  return str.length === 0 ? str : str[0].toUpperCase() + str.substring(1);
}

/**
 * Takes a string and returns it reversed
 * @param {String} str
 * @returns {String}
 */
function reverseString(str) {
  return str.split("").reverse().join("");
}

/**
 * A calculator object that contains functions for the basic operations: add, subtract, divide, and multiply.
 *  Each of these functions take two numbers and return the correct calculation.
 * @returns
 */
var calculator = function () {
  var add = function add(a, b) {
    return +a + +b;
  };
  var subtract = function subtract(a, b) {
    return +a - +b;
  };
  var multiply = function multiply(a, b) {
    return +a * +b;
  };
  var divide = function divide(a, b) {
    return +a / +b;
  };
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  };
}();

/**
 * Takes a string and returns it with each character “shifted”.
 * @param {String} str
 * @returns {String}
 */
exports.calculator = calculator;
function caesarCipher(str) {
  var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var cipher = "";
  var _iterator = _createForOfIteratorHelper(str),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var letter = _step.value;
      var ascii = letter.charCodeAt();
      if (ascii > 64 && ascii < 91) {
        // lower case letter
        ascii = (ascii - 65 + shift) % 26 + 65;
      } else if (ascii > 96 && ascii < 123) {
        // upper case letter
        ascii = (ascii - 97 + shift) % 26 + 97;
      }
      cipher += String.fromCharCode(ascii);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return cipher;
}

/**
 * An analyzeArray function that takes an array of numbers and
 * returns an object with the following properties: average, min, max, and length.
 * @param {List} array
 * @returns
 */
function analyzeArray(array) {
  if (array.length === 0) return {
    average: undefined,
    min: undefined,
    max: undefined,
    length: 0
  };
  var sum = array.reduce(function (a, b) {
    return a + b;
  });
  array.sort(function (a, b) {
    return a - b;
  });
  var object = {
    average: sum / array.length,
    min: array[0],
    max: array[array.length - 1],
    length: array.length
  };
  return object;
}