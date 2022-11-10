/**
 * Sorts an array using merge sort algorithm
 * @param {Array} array array of integers
 * @returns {Array} sorted array of integers
 */
 function mergeSort(array) {
  if (array.length <= 1) return array;

  // split array into 2 halves and sort
  const left = mergeSort(array.slice(0, parseInt(array.length / 2)));
  const right = mergeSort(
    array.slice(parseInt(array.length / 2), array.length)
  );

  //merge left and right halves
  let i = 0; //pointer for left
  let j = 0; //pointer for right
  let final_array = [];
  while (i < left.length && j < right.length) {
    final_array.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }

  // push any remaining elements to final_array
  if (i < left.length) {
    final_array.push(...left.slice(i, left.length));
  }
  if (j < right.length) {
    final_array.push(...right.slice(j, right.length));
  }

  return final_array;
}
console.log(mergeSort([1, 2, 4, 5, 5])); // [ 1, 2, 4, 5, 5 ]
console.log(mergeSort([1])); // [ 1 ]
console.log(mergeSort([])); // []
console.log(mergeSort([1, 10, 3, -1, 5])); // [ -1, 1, 3, 5, 10 ]
console.log(mergeSort([1, -10, 3, -1, 100, 5, 2, 1])); // [ -10, -1, 1, 1, 2, 3, 5, 100 ]
console.log(mergeSort([0, 0, 0, -0])); // [ 0, 0, 0, -0 ]
