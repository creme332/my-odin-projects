/* eslint-disable */
import mergeSort from "./index.js";

test("empty array", () => {
  const list = [];
  expect(mergeSort(list)).toStrictEqual(list);
});

test("array with a single element", () => {
  const list = [-1];
  expect(mergeSort(list)).toStrictEqual(list);
});

test("already sorted array", () => {
  const list = [-1, 2, 4, 5];
  expect(mergeSort(list)).toStrictEqual(list);
});

test("array with positive and negative integers", () => {
  const list = [1, -10, 3, -1, 100, 5, 2, 1];
  expect(mergeSort(list)).toStrictEqual([-10, -1, 1, 1, 2, 3, 5, 100]);
});

test("array of zeroes", () => {
  const list = [0, 0, 0, -0];
  expect(mergeSort(list)).toStrictEqual(list);
});

test("array of alphabets", () => {
  const list = ["c", "z", "e", "k", "a"];
  expect(mergeSort(list)).toStrictEqual(["a", "c", "e", "k", "z"]);
});

test("array of integers as strings", () => {
  const list = ["10", "01", "-1", "0", "6"];
  // list should get sorted by ASCII value not numerical value
  expect(mergeSort(list)).toStrictEqual(["-1", "0", "01", "10", "6"]);
});

test("array with non-exact numbers", () => {
  const list = [0.11, 0.53, 5, -0.99];
  console.log(list.sort());
  expect(mergeSort(list)).toStrictEqual([-0.99, 0.11, 0.53, 5]);
});

test("arbitrarily large array of integers", () => {
  function getRandomArray(n, max = 40) {
    const sign = [-1, 1];
    return Array(n)
      .fill()
      .map(
        () =>
          sign[Math.floor(Math.random() * 2)] * Math.round(Math.random() * max)
      );
  }
  //create random array
  const size = 99999 + parseInt(Math.random() * 1000, 10);
  const list = getRandomArray(size, 10000);
  const mySortedList = mergeSort(list);
  expect(mySortedList).toStrictEqual(list.sort((a, b) => a - b));
});
