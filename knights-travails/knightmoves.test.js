/* eslint-disable */
import model from "./src/scripts/model.js";
const knightMoves = model.knightMoves;

test("0 moves", () => {
  const ans = knightMoves(3, 3);
  expect(ans).toStrictEqual([3]);
});

describe("1 move", () => {
  const start = 34;
  let end;
  // coordinates represent change in (row, col)
  test("(-2, -1)", () => {
    end = 17;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(-2, 1)", () => {
    end = 19;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(-1, 2)", () => {
    end = 28;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(1, 2)", () => {
    end = 44;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(2, 1)", () => {
    end = 51;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(2, -1)", () => {
    end = 49;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(1, -2)", () => {
    end = 40;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });

  test("(-1, -2)", () => {
    end = 44;
    expect(knightMoves(start, end)).toStrictEqual([start, end]);
  });
});

test("2 moves", () => {
  const ans = knightMoves(10, 37);
  expect(ans).toStrictEqual([10, 20, 37]);
});

test("3 moves", () => {
  const ans = knightMoves(0, 19);
  expect(ans).toStrictEqual([0, 10, 4, 19]);
});

test("4 moves", () => {
  const ans = knightMoves(7, 46);
  expect(ans).toStrictEqual([7,13,23,29,46]);
});

test("5 moves", () => {
  const ans = knightMoves(7, 63);
  expect(ans).toStrictEqual([7,13,23,29,46,63]);
});

test("6 moves", () => {
  const ans = knightMoves(0, 63);
  expect(ans).toStrictEqual([0, 10, 4, 14, 31, 46, 63]);
});
