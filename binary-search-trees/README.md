# 🌲 Binary Search Tree
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![Jest shield](https://img.shields.io/badge/-Jest-red)

An object-oriented implementation of a balanced binary search tree in JavaScript.

```
│       ┌── 40
│   ┌── 32
│   │   └── 25
└── 19
    │   ┌── 9
    └── -7
        └── -13
            └── -27
```

# 🕶 Usage
### `buildTree` 
Takes an array of data and turns it into a balanced binary tree. Returns the root node.

> ⚠ Duplicates are removed from the array.

### `insert` 
Inserts a node to the binary tree.

### `delete`
Deletes a node from the binary tree.

###  a `find` function which 
Accepts a value and returns the node with the given value.

### `levelOrder`, `recursiveLevelOrder`
Traverses the tree in breadth-first level order and returns an array of values.

###  `inorder`, `preorder`, and `postorder`
Each of these functions traverses the tree in their respective depth-first order and returns an array of values.

### `height` 
Accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.

### `depth`
Accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.

###  `isBalanced`
Checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.

### `rebalance`  
Rebalances an unbalanced tree. 

### `prettyPrint`
Prints tree to console.

### `invert`
Left and right children of all non-leaf nodes are interchanged. 

> ⚠ You must rebalance the tree before performing any tree operations (insert, delete, find) on the inverted tree.

#  🛠 Installation
Clone repository:
```sh
git clone git@github.com:creme332/my-odin-projects.git
```

Go to project folder:
```sh
cd binary-search-trees
```

Install dependencies:
```sh
npm install
```

Run tests:
```sh
npm test
```
# 🔨 To-Do
- [ ] Run babel in CLI.
- [ ] Add GUI.
- [x] Invert binary tree.
- [ ] Add Gihub actions workflow.