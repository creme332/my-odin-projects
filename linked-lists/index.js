import LinkedList from "./singly-linked-list/linked-list-class.js";
import Node from "./singly-linked-list/node-class.js";

const list = new LinkedList(["🍕", "🍿", "🥚", "🍆"]);
list.output("Initial linked list:");

list.prepend(new Node("🍷"));
list.output("Prepended 🍷");

list.reverse();
list.output("Reversed linked list:");

/*
Initial linked list:
( 🍕 ) ➔ ( 🍿 ) ➔ ( 🥚 ) ➔ ( 🍆 ) ➔ ∅
Prepended 🍷
( 🍷 ) ➔ ( 🍕 ) ➔ ( 🍿 ) ➔ ( 🥚 ) ➔ ( 🍆 ) ➔ ∅
Reversed linked list:
( 🍆 ) ➔ ( 🥚 ) ➔ ( 🍿 ) ➔ ( 🍕 ) ➔ ( 🍷 ) ➔ ∅
*/
