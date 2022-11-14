"use strict";

var _index = require("./index.js");
/* eslint-disable */

describe("capitalize", function () {
  test("empty string", function () {
    expect((0, _index.capitalize)("")).toBe("");
  });
  test("letter", function () {
    expect((0, _index.capitalize)("a")).toBe("A");
  });
  test("multiple repeating letters", function () {
    expect((0, _index.capitalize)("aaaAaaA")).toBe("AaaAaaA");
  });
  test("digit", function () {
    expect((0, _index.capitalize)("4")).toBe("4");
  });
  test("punctuation", function () {
    expect((0, _index.capitalize)(".")).toBe(".");
  });
  test("word", function () {
    expect((0, _index.capitalize)("hello")).toBe("Hello");
  });
  test("words", function () {
    expect((0, _index.capitalize)("hello world")).toBe("Hello world");
  });
});
describe("reverseString", function () {
  test("empty string", function () {
    expect((0, _index.reverseString)("")).toBe("");
  });
  test("letter", function () {
    expect((0, _index.reverseString)("a")).toBe("a");
  });
  test("word", function () {
    expect((0, _index.reverseString)("hello")).toBe("olleh");
  });
  test("palindrome", function () {
    expect((0, _index.reverseString)("racecar")).toBe("racecar");
  });
  test("comma-separated words", function () {
    expect((0, _index.reverseString)("hello, world")).toBe("dlrow ,olleh");
  });
  test("number", function () {
    expect((0, _index.reverseString)("1234")).toBe("4321");
  });
});
describe("calculator", function () {
  describe("add", function () {
    test("single digit", function () {
      expect(_index.calculator.add(1, 2)).toBe(3);
    });
    test("negative and positive ", function () {
      expect(_index.calculator.add(-1, 2)).toBe(1);
    });
    test("large numbers", function () {
      expect(_index.calculator.add(999999999, 999999999)).toBe(1999999998);
    });
    test("stringified positive numbers", function () {
      expect(_index.calculator.add("10", "52")).toBe(62);
    });
    test("stringified negative numbers", function () {
      expect(_index.calculator.add("-10", "-52")).toBe(-62);
    });
    test("numbers with exponents", function () {
      expect(_index.calculator.add(1e2, -5)).toBe(95);
    });
    test("floating point numbers", function () {
      expect(_index.calculator.add(10 / 3, 4 / 3)).toBeCloseTo(14 / 3);
    });
  });
  describe("subtract", function () {
    test("single digit", function () {
      expect(_index.calculator.subtract(1, 2)).toBe(-1);
    });
    test("negative and positive ", function () {
      expect(_index.calculator.subtract(-1, 2)).toBe(-3);
    });
    test("large negative numbers", function () {
      expect(_index.calculator.subtract(-9999999, -2313232)).toBe(-7686767);
    });
    test("stringified numbers", function () {
      expect(_index.calculator.subtract("10", "52")).toBe(-42);
    });
    test("stringified negative numbers", function () {
      expect(_index.calculator.subtract("-10", "-52")).toBe(42);
    });
    test("numbers with exponents", function () {
      expect(_index.calculator.subtract(1e2, -5)).toBe(105);
    });
    test("floating point numbers", function () {
      expect(_index.calculator.subtract(10 / 3, 5 / 3)).toBeCloseTo(5 / 3);
    });
  });
  describe("multiply", function () {
    test("zero", function () {
      expect(_index.calculator.multiply(0, 2)).toBe(0);
    });
    test("negative and positive ", function () {
      expect(_index.calculator.multiply(-1, 2)).toBe(-2);
    });
    test("large negative numbers", function () {
      expect(_index.calculator.multiply(-9999999, -2313232)).toBe(23132317686768);
    });
    test("stringified numbers", function () {
      expect(_index.calculator.multiply("10", "52")).toBe(520);
    });
    test("stringified negative numbers", function () {
      expect(_index.calculator.multiply("-10", "-52")).toBe(520);
    });
    test("numbers with exponents", function () {
      expect(_index.calculator.multiply(1e2, -5)).toBe(-500);
    });
    test("floating point numbers", function () {
      expect(_index.calculator.multiply(10 / 3, 5 / 3)).toBeCloseTo(50 / 9);
    });
  });
  describe("divide", function () {
    test("by zero", function () {
      expect(_index.calculator.divide(2, 0)).toBe(Infinity);
    });
    test("negative and positive ", function () {
      expect(_index.calculator.divide(-1, 2)).toBeCloseTo(-0.5);
    });
    test("stringified numbers", function () {
      expect(_index.calculator.divide("10", "52")).toBeCloseTo(10 / 52);
    });
    test("stringified negative numbers", function () {
      expect(_index.calculator.divide("-10", "-52")).toBeCloseTo(10 / 52);
    });
    test("numbers with exponents", function () {
      expect(_index.calculator.divide(1e2, -5)).toBe(-20);
    });
    test("floating point numbers", function () {
      expect(_index.calculator.divide(10 / 3, 5 / 3)).toBe(2);
    });
  });
});
describe("caesarCipher", function () {
  test("empty string", function () {
    expect((0, _index.caesarCipher)("")).toBe("");
  });
  test("letter", function () {
    expect((0, _index.caesarCipher)("a")).toBe("b");
  });
  test("loop", function () {
    expect((0, _index.caesarCipher)("z", 5)).toBe("e");
  });
  test("lowercase word", function () {
    expect((0, _index.caesarCipher)("hello", 1)).toBe("ifmmp");
  });
  test("sentence with upper and lowercase", function () {
    expect((0, _index.caesarCipher)("Jean is FAT", 5)).toBe("Ojfs nx KFY");
  });
  test("sentence with punctuation and numbers", function () {
    expect((0, _index.caesarCipher)("elon musketeer said gleefully:\"call me on +432 432903 for free robux\". Sam replied a resounding \"NO!\".", 25)).toBe("dknm ltrjdsddq rzhc fkddetkkx:\"bzkk ld nm +432 432903 enq eqdd qnatw\". Rzl qdokhdc z qdrntmchmf \"MN!\".");
  });
  test("number", function () {
    expect((0, _index.caesarCipher)("1234")).toBe("1234");
  });
});
describe("analyzeArray", function () {
  test("empty", function () {
    expect((0, _index.analyzeArray)([])).toStrictEqual({
      average: undefined,
      min: undefined,
      max: undefined,
      length: 0
    });
  });
  test("single element", function () {
    expect((0, _index.analyzeArray)([1])).toStrictEqual({
      average: 1,
      min: 1,
      max: 1,
      length: 1
    });
  });
  test("unsorted array", function () {
    expect((0, _index.analyzeArray)([1, 0, 5, 4])).toStrictEqual({
      average: 2.5,
      min: 0,
      max: 5,
      length: 4
    });
  });
});