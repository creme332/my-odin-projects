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

### `delete`

###  a `find` function which 
Accepts a value and returns the node with the given value.

### `levelOrder` 
Traverses the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given.

###  `inorder`, `preorder`, and `postorder`
Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.

### `height` 
Accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.

### `depth`
Accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.

###  `isBalanced`
Checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.

### `rebalance`  
Rebalances an unbalanced tree. 

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

Run tests:
```sh
npm test
```
# 🔨 To-Do
- [ ] Run babel in CLI.
- [ ] Add GUI.
- [ ] Gihub actions workflow.