/* eslint-disable */

import LinkedList from "./linked-list-class.js";
import Node from "./node-class.js";

describe("Test methods for empty linked list", () => {
  const list = new LinkedList();

  test("toString()", () => {
    expect(list.toString()).toBe("∅");
  });

  test("head()", () => {
    const list = new LinkedList();
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
    const newList = new LinkedList();
    const n1 = new Node("🍕");
    newList.prepend(n1);
    expect(newList.toString()).toBe("( 🍕 ) ➔ ∅");
  });

  test("append()", () => {
    const newList = new LinkedList();
    const n1 = new Node("🍕");
    newList.append(n1);
    expect(newList.toString()).toBe("( 🍕 ) ➔ ∅");
  });

  test("pop()", () => {
    list.pop();
    expect(list.toString()).toBe("∅");
  });
});

test("Initialise list with array", () => {
  const list = new LinkedList(["🍕", "🥟"]);
  expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
});

test("append 1 element to non-empty list", () => {
  const list = new LinkedList();
  const n1 = new Node("🍕");
  const n2 = new Node("🥟");
  list.append(n1);
  list.append(n2);
  expect(list.toString()).toBe("( 🍕 ) ➔ ( 🥟 ) ➔ ∅");
});

test("prepend 1 element to non-empty list", () => {
  const list = new LinkedList();
  const n1 = new Node("🍕");
  const n2 = new Node("🥟");
  list.prepend(n1);
  list.prepend(n2);
  expect(list.toString()).toBe("( 🥟 ) ➔ ( 🍕 ) ➔ ∅");
});

test("prepend 1 element to non-empty list", () => {
  const list = new LinkedList();
  const n1 = new Node("🍕");
  const n2 = new Node("🥟");
  list.prepend(n1);
  list.prepend(n2);
  expect(list.toString()).toBe("( 🥟 ) ➔ ( 🍕 ) ➔ ∅");
});

test("Get node at valid index", () => {
  const list = new LinkedList();
  const n1 = new Node("🍕");
  const n2 = new Node("🥟");
  list.append(n1);
  list.append(n2);
  expect(list.at(1)).toBe(n2);
});

test("Get node at invalid index", () => {
  const list = new LinkedList(["🍕", "🥟"]);
  expect(list.at(3)).toBe(null);
});
