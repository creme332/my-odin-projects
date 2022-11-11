"use strict";

var _linkedListClass = _interopRequireDefault(require("./linked-list-class.js"));
var _nodeClass = _interopRequireDefault(require("./node-class.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable */

describe("Test methods for empty linked list", () => {
  let list;
  beforeEach(() => {
    list = new _linkedListClass.default();
  });
  test("toString()", () => {
    expect(list.toString()).toBe("∅");
  });
  test("head()", () => {
    const list = new _linkedListClass.default();
    expect(list.head()).toBe(null);
  });
  test("tail()", () => {
    expect(list.tail()).toBe(null);
  });
  test("isEmpty()", () => {
    expect(list.isEmpty()).toBe(true);
  });
  test("size()", () => {
    expect(list.size()).toBe(0);
  });
  test("prepend()", () => {
    const n1 = new _nodeClass.default("🍕");
    list.prepend(n1);
    expect(list.toString()).toBe("( 🍕 ) ➔ ∅");
  });
  test("append()", () => {
    const n1 = new _nodeClass.default("🍕");
    list.append(n1);
    expect(list.toString()).toBe("( 🍕 ) ➔ ∅");
  });
  test("pop()", () => {
    list.pop();
    expect(list.toString()).toBe("∅");
  });
  test("find()", () => {
    expect(list.find("🍕")).toBe(null);
  });
  test("reverse()", () => {
    list.reverse();
    expect(list.toString()).toBe("∅");
  });
});
describe("Test methods for non-empty linked list", () => {
  let list;
  beforeEach(() => {
    list = new _linkedListClass.default(["🍕", "🥟"]);
  });
  test("append 1 element to non-empty list", () => {
    const n1 = new _nodeClass.default("🍘");
    list.append(n1);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ( 🍘 ) ➔ ∅");
  });
  test("prepend 1 element to non-empty list", () => {
    const n1 = new _nodeClass.default("🍘");
    list.prepend(n1);
    expect(list.toString()).toBe("( 🍘 ) ➔ ( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Get node at a valid index", () => {
    const json = JSON.stringify(list.at(1));
    console.log(json);
    expect(json).toBe(`{"_data":"🥟","_next":null}`);
  });
  test("Get node at invalid index", () => {
    expect(list.at(3)).toBe(null);
  });
  test("pop()", () => {
    list.pop();
    expect(list.toString()).toBe("( 🍕 ) ➔ ∅");
  });
  test("contains() for a valid value", () => {
    expect(list.contains("🍕")).toBe(true);
  });
  test("contains() for an invalid value", () => {
    expect(list.contains("hello")).toBe(false);
  });
  test("insertAt() for an invalid value", () => {
    list.insertAt("🐓", 100);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Insert at start", () => {
    list.insertAt("🐓", 0);
    expect(list.toString()).toBe("( 🐓 ) ➔ ( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Insert between 2 elements", () => {
    list.insertAt("🐓", 1);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🐓 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Insert after end of list", () => {
    list.insertAt("🐓", 2);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ( 🐓 ) ➔ ∅");
  });
  test("Insert at invalid index", () => {
    list.insertAt("🐓", 100);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Remove at start", () => {
    list.removeAt(0);
    expect(list.toString()).toBe("( 🥟 ) ➔ ∅");
  });
  test("Remove at end", () => {
    list.removeAt(1);
    expect(list.toString()).toBe("( 🍕 ) ➔ ∅");
  });
  test("Remove at invalid index", () => {
    list.removeAt(100);
    expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
  });
  test("Reverse linked list", () => {
    list.reverse();
    expect(list.toString()).toBe("( 🥟 ) ➔ ( 🍕 ) ➔ ∅");
  });
  test("Reverse a larger list", () => {
    list = new _linkedListClass.default(["🍕", "🥟", "🧂", "yess", "last-node"]);
    list.reverse();
    expect(list.toString()).toBe("( last-node ) ➔ ( yess ) ➔ ( 🧂 ) ➔ ( 🥟 ) ➔ ( 🍕 ) ➔ ∅");
  });
});
test("Initialise list with array", () => {
  const list = new _linkedListClass.default(["🍕", "🥟", "🍘"]);
  expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ( 🍘 ) ➔ ∅");
});