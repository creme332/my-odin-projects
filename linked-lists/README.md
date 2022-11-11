# 👉 Linked List
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![Jest shield](https://img.shields.io/badge/-Jest-red)
![Babel shield](https://img.shields.io/badge/-Babel-orange)

An object-oriented implementation of a singly-linked list in JavaScript.

```js
// singly linked list
( 🥚 ) ➔ ( 🐓 ) ➔ ( 🍗 ) ➔ ∅
```

# 🕶 Usage

## Singly linked list

```js
const list = new LinkedList(["🍕", "🍿", "🥚", "🍆"]);
list.output("Initial linked list:");

list.prepend(new Node("🍷"));
list.output("Prepended 🍷:");

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
```
### `append(value)`
Adds a new node containing value to the end of the list.

### `prepend(value)`
Adds a new node containing value to the start of the list.

### `output(message)`
Outputs stringified linked list to console. `message` is optional.

### `size()`
Returns the total number of nodes in the list.

### `head()`
Returns the first node in the list.

### `tail()`
returns the last node in the list.

### `at(index)`
Returns the node at the given index.

### `pop()`
Removes the last element from the list.

### `contains(value)`
Returns true if the passed in value is in the list and otherwise returns false.

### `find(value)`
Returns the index of the node containing value, or null if not found.

### `toString()`
Returns string representation of linked list.

### `insertAt(value, index)`
Inserts a new node with the provided value at the given index.

### `removeAt(index)`
Removes the node at the given index.

### `reverse()`
Reverses the linked list.

#  🛠 Installation
Clone repository:
```sh
git clone git@github.com:creme332/my-odin-projects.git
```

Go to project folder:
```sh
cd linked-list
```

Install dependencies:
```sh
npm install
```

Run tests using Jest:
```sh
npm test
```

Compile code for older browsers:
```sh
npm run babel
```
# 🔨 To-Do
- [x] Reverse linked list.
- [x] Use Jest.
- [x] Run babel in CLI.
- [ ] Add GUI.
- [ ] Doubly linked list.
- [ ] Set up a Gihub actions workflow to run tests.