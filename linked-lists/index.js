import LinkedList from "./singly-linked-list/linked-list-class.js";
import Node from "./singly-linked-list/node-class.js";

const n1 = new Node("🍕");
const n2 = new Node("🍿");
const n3 = new Node("🥚");
const n4 = new Node("🍆");
const list = new LinkedList();
list.output("Initial linked list:");
list.append(n1);
console.log(list);
list.prepend(n4);
list.append(n2);
list.prepend(n3);
console.log("Node at index 2:", list.at(2));
console.log("Index of node with value 🐓 :", list.find("🐓"));
list.insertAt("🐓", 1);
console.log("Index of node with value 🐓 :", list.find("🐓"));
list.removeAt(5);
