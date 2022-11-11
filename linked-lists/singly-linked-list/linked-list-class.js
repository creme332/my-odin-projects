import Node from "./node-class.js";

class LinkedList {
  _root = null;

  constructor(array = []) {
    if (array.length > 0) {
      array.forEach((el) => {
        const node = new Node(el);
        this.append(node);
      });
    }
  }

  isEmpty() {
    return this._root === null;
  }

  head() {
    return this._root;
  }

  tail() {
    if (this.isEmpty()) return null;
    let current = this._root;
    while (current.next !== null) {
      current = current.next;
    }
    return current;
  }

  toString() {
    const rightArrow = "➔";
    const nullSymbol = "∅";
    let current = this._root;
    let stringRep = "";
    while (current !== null) {
      stringRep += `( ${current.data} ) ${rightArrow} `;
      current = current.next;
    }
    stringRep += nullSymbol;
    return stringRep;
  }

  output(description = "Performed an operation on linked list") {
    console.log(description);
    console.log(this.toString());
  }

  append(node) {
    if (this.isEmpty()) {
      this._root = node;
    } else {
      this.tail().next = node;
    }
    node.next = null;
    // this.output(`Append ${node.data}.`);
  }

  prepend(node) {
    if (this.isEmpty()) {
      // this.output(`Could not prepend ${node.data}.`);
      this._root = node;
      return;
    }
    node.next = this._root;
    this._root = node;

    // this.output(`Prepend ${node.data}.`);
  }

  size() {
    let size = 0;
    let current = this._root;
    while (current !== null) {
      size += 1;
      current = current.next;
    }
    return size;
  }

  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) {
      console.log(`Popped ${this._root.data}.`);

      this._root = null;
      // this.output();
      return;
    }
    let prev = this._root;
    let current = this._root.next;
    while (current.next !== null) {
      prev = current;
      current = current.next;
    }
    prev.next = null;
    console.log(`Popped ${current.data}.`);
    // this.output();
  }

  at(index) {
    let i = index;
    if (this.isEmpty() || i > this.size() - 1 || i < 0) return null;
    let current = this._root;
    while (i > 0) {
      current = current.next;
      i -= 1;
    }
    return current;
  }

  find(value) {
    let index = 0;
    let current = this._root;
    while (current !== null) {
      if (current.data === value) return index;
      current = current.next;
      index += 1;
    }
    return null;
  }

  contains(value) {
    return !this.find(value) === null;
  }

  insertAt(value, index) {
    if (
      (this.isEmpty() && index !== 0) ||
      index > this.size() - 1 ||
      index < 0
    ) {
      // this.output(`Could not insert ${value} at index ${index}`);
      return;
    }
    const newNode = new Node(value);
    if (index === 0) {
      this.prepend(newNode);
      return;
    }
    const currentNode = this.at(index); // node currently at index
    const beforeNode = this.at(index - 1); // node before currentNode
    newNode.next = currentNode;
    beforeNode.next = newNode;

    // this.output(`Inserted ${value} at index ${index}`);
  }

  removeAt(index) {
    if (this.isEmpty() || index > this.size() - 1 || index < 0) {
      // this.output(`Could not remove node at index ${index}`);
      return;
    }
    if (index === 0) {
      // remove first element
      this._root = this._root.next;
      // this.output(`Removed node at index ${index}`);
      return;
    }
    const currentNode = this.at(index); // node currently at index
    const beforeNode = this.at(index - 1); // node before currentNode
    beforeNode.next = currentNode.next;
    currentNode.next = null;

    // this.output(`Removed node at index ${index}`);
  }
}

export default LinkedList;
