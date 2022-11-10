class Node {
    _data;
    _next;
    constructor(data = null, next = null) {
      this._data = data;
      this._next = next;
    }
  
    set data(data) {
      this._data = data;
    }
  
    get data() {
      return this._data;
    }
  
    set next(next) {
      this._next = next;
    }
  
    get next() {
      return this._next;
    }
  }
  
  class LinkedList {
    _root;
  
    constructor() {
      this._root = null;
    }
  
    isEmpty() {
      return this._root === null ? true : false;
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
      let current = this._root;
      let stringRep = "";
      while (current !== null) {
        stringRep += `( ${current.data} ) ➡ `;
        current = current.next;
      }
      stringRep += "⭕";
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
      this.output(`Append ${node.data}.`);
    }
  
    prepend(node) {
      if (this.isEmpty()) {
        this.output(`Could not prepend ${node.data}.`);
        this._root = node;
        return;
      }
      node.next = this._root;
      this._root = node;
  
      this.output(`Prepend ${node.data}.`);
    }
  
    size() {
      let size = 0;
      let current = this._root;
      while (current !== null) {
        size++;
        current = current.next;
      }
      return size;
    }
  
    pop() {
      if (this.size() === 0) return;
      if (this.size() === 1) {
        console.log(`Popped ${this._root.data}.`);
  
        this._root = null;
        this.output();
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
      this.output();
    }
  
    at(index) {
      if (this.isEmpty() || index > this.size() - 1 || index < 0) return null;
      let current = this._root;
      while (index > 0) {
        current = current.next;
        index--;
      }
      return current;
    }
  
    find(value) {
      let index = 0;
      let current = this._root;
      while (current !== null) {
        if (current.data === value) return index;
        current = current.next;
        index++;
      }
      return null;
    }
  
    contains(value) {
      return this.find(value) === null ? false : true;
    }
  
    insertAt(value, index) {
      if (
        (this.isEmpty() && index != 0) ||
        index > this.size() - 1 ||
        index < 0
      ) {
        this.output(`Could not insert ${value} at index ${index}`);
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
  
      this.output(`Inserted ${value} at index ${index}`);
    }
  
    removeAt(index) {
      if (this.isEmpty() || index > this.size() - 1 || index < 0) {
        this.output(`Could not remove node at index ${index}`);
        return;
      }
      if (index === 0) {
        // remove first element
        this._root = this._root.next;
        this.output(`Removed node at index ${index}`);
        return;
      }
      const currentNode = this.at(index); // node currently at index
      const beforeNode = this.at(index - 1); // node before currentNode
      beforeNode.next = currentNode.next;
      currentNode.next = null;
  
      this.output(`Removed node at index ${index}`);
    }
  }
  
  const n1 = new Node("🍕");
  const n2 = new Node("🍿");
  const n3 = new Node("🥚");
  const n4 = new Node("🍆");
  const list = new LinkedList();
  list.output("Initial linked list:");
  list.append(n1);
  list.prepend(n4);
  list.append(n2);
  list.prepend(n3);
  console.log("Node at index 2:", list.at(2));
  console.log("Index of node with value 🐓 :", list.find("🐓"));
  list.insertAt("🐓", 1);
  console.log("Index of node with value 🐓 :", list.find("🐓"));
  list.removeAt(5);
  