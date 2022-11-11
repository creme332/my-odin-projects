"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Sorts an array using merge sort algorithm
 * @param {Array} array array of integers
 * @returns {Array} sorted array of integers
 */
function mergeSort(array) {
  if (array.length <= 1) return array;

  // split array into 2 halves and sort
  const left = mergeSort(array.slice(0, parseInt(array.length / 2, 10)));
  const right = mergeSort(array.slice(parseInt(array.length / 2, 10), array.length));

  // merge left and right halves
  let i = 0; // pointer for left
  let j = 0; // pointer for right
  const finalArray = [];
  while (i < left.length && j < right.length) {
    finalArray.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }

  // push any remaining elements to final_array
  if (i < left.length) {
    finalArray.push(...left.slice(i, left.length));
  }
  if (j < right.length) {
    finalArray.push(...right.slice(j, right.length));
  }
  return finalArray;
}
var _default = mergeSort;
exports.default = _default;