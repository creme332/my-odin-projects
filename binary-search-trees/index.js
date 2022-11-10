class Node {
  _data;
  _left;
  _right;

  constructor(data) {
    this._data = data;
    this._left = null;
    this._right = null;
  }

  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }

  get left() {
    return this._left;
  }
  set left(left) {
    this._left = left;
  }

  get right() {
    return this._right;
  }
  set right(right) {
    this._right = right;
  }
}

class binaryTree {
  _root = null;

  /**
   * Sorts and removes duplicates from `array`
   * @param {*} array
   * @returns {array}
   */
  sanitiseArray(array) {
    // First sort array then remove duplicates.
    // function inside sort() is important : https://stackoverflow.com/questions/48082009/array-sort-is-not-working-correctly-in-javascript
    return [...new Set(array.sort((a, b) => a - b))];
  }

  get root() {
    return this._root;
  }

  constructor(array) {
    array = this.sanitiseArray(array);
    // console.log(array, "\n");
    this._root = this.buildTree(array);
  }

  prettyPrint(node = this._root, prefix = "", isLeft = true) {
    if (this._root === null) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  /**
   * Builds a balanced binary search tree from a sanitised `array`.
   * @param {*} array
   * @returns {Node} root node of BST
   */
  buildTree(array) {
    const n = array.length;
    if (n === 0) return null;
    if (n === 1) return new Node(array[0]);
    const mid = parseInt(n / 2);
    const rootNode = new Node(array[mid]);
    // console.log(array, mid);
    // console.log(array.slice(0, mid));
    // console.log(array.slice(mid + 1, n));
    const leftSubTree = this.buildTree(array.slice(0, mid));
    const rightSubTree = this.buildTree(array.slice(mid + 1, n));
    rootNode.left = leftSubTree;
    rootNode.right = rightSubTree;
    return rootNode;
  }

  inorder(root = this._root, accumulator = []) {
    if (root == null) return;
    this.inorder(root.left, accumulator);
    accumulator.push(root.data);
    this.inorder(root.right, accumulator);
    return accumulator;
  }

  preorder(root = this._root, accumulator = []) {
    if (root == null) return;
    accumulator.push(root.data);
    this.preorder(root.left, accumulator);
    this.preorder(root.right, accumulator);
    return accumulator;
  }

  postorder(root = this._root, accumulator = []) {
    if (root == null) return;
    this.postorder(root.left, accumulator);
    this.postorder(root.right, accumulator);
    accumulator.push(root.data);
    return accumulator;
  }

  /**
   *  Returns the number of edges on the longest path from a node to a leaf.
   * @param {*} node
   * @returns {Integer}
   */
  height(node = this._root) {
    if (node === null || (node.left === null && node.right === null)) {
      // leaf node or null node
      return 0;
    }
    return Math.max(1 + this.height(node.left), 1 + this.height(node.right));
  }

  /**
   * Returns the number of edges from the node to the tree's root node.
   * A root node will have a depth of 0.
   * @param {*} node
   * @returns {Integer}
   */
  depth(node = this.root) {
    let depth = 0;
    let current = this.root;
    while (JSON.stringify(node) !== JSON.stringify(current)) {
      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }
    return depth;
  }

  /**
   * Checks if the tree is balanced.
   * A balanced tree is one where the difference between heights of left
   *  subtree and right subtree of every node is not more than 1.
   * @param {Node} root
   * @returns {Boolean}
   */
  isBalanced(root = this.root) {
    if (root === null) return true;
    return (
      Math.abs(this.height(root.left) - this.height(root.right)) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    );
  }

  rebalance() {
    const nodeValues = this.sanitiseArray(this.preorder());

    this._root = this.buildTree(nodeValues);
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      // tree is initially empty
      this._root = newNode;
      return;
    }

    let turnedLeft = true;
    let current = this._root;
    let previous = null;
    while (current !== null) {
      previous = current;
      if (value <= current.data) {
        turnedLeft = true;
        current = current.left;
      } else {
        turnedLeft = false;
        current = current.right;
      }
    }
    if (turnedLeft) {
      previous.left = newNode;
    } else {
      previous.right = newNode;
    }
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (current.data === value) return current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  delete(value) {
    //search node to be deleted and its parent
    let turnedLeft = true;
    let deleteNode = this._root;
    let parentNode = null;
    while (deleteNode !== null && deleteNode.data !== value) {
      parentNode = deleteNode;
      if (value < deleteNode.data) {
        turnedLeft = true;
        deleteNode = deleteNode.left;
      } else {
        turnedLeft = false;
        deleteNode = deleteNode.right;
      }
    }

    // node to be deleted does not exist
    if (deleteNode === null) return;

    // case 1 : deleteNode has no children
    if (deleteNode.left === null && deleteNode.right === null) {
      if (parentNode === null) {
        // delete root node
        this._root = null;
      } else {
        if (turnedLeft) {
          //delete node is on left side of parent
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      }
      return;
    }

    // case 2.1 : deleteNode has only 1 right child
    if (deleteNode.left === null) {
      if (parentNode === null) {
        // delete root node
        this._root = deleteNode.right;
      } else {
        if (turnedLeft) {
          //deleteNode is the left child of parentNode
          parentNode.left = deleteNode.right;
        } else {
          parentNode.right = deleteNode.right;
        }
      }
      return;
    }

    // case 2.2 : deleteNode has only 1 left child
    if (deleteNode.right === null) {
      if (parentNode === null) {
        // delete root node
        this._root = deleteNode.left;
      } else {
        if (turnedLeft) {
          //delete node is on left side of parent
          parentNode.left = deleteNode.left;
        } else {
          parentNode.right = deleteNode.left;
        }
      }
      return;
    }

    // case 3 : deleteNode has 2 children
    if (deleteNode.left !== null && deleteNode.right !== null) {
      //find rightmost node of the left subtree of deleteNode
      let replacementNode = deleteNode.left;
      while (replacementNode.right !== null) {
        replacementNode = replacementNode.right;
      }

      this.delete(replacementNode.data);

      if (parentNode === null) {
        // delete root node
        replacementNode.left = this._root.left;
        replacementNode.right = this._root.right;
        this._root = replacementNode;
      } else {
        replacementNode.left = deleteNode.left;
        replacementNode.right = deleteNode.right;
        if (turnedLeft) {
          //delete node is on left side of parent
          parentNode.left = replacementNode;
        } else {
          parentNode.right = replacementNode;
        }
      }
    }
  }

  leverOrder() {
    if (this.root === null) return;
    let unvisited = [this.root];
    let accumulator = [];
    while (unvisited.length > 0) {
      let current = unvisited.shift();
      accumulator.push(current.data);
      if (current.left !== null) unvisited.push(current.left);
      if (current.right !== null) unvisited.push(current.right);
    }
    return accumulator;
  }

  recursiveLevelOrder(unvisited = [this.root], ans = []) {
    if (unvisited.length === 0) return ans;
    let current = unvisited.shift();
    ans.push(current.data);
    if (current.left !== null) unvisited.push(current.left);
    if (current.right !== null) unvisited.push(current.right);
    return this.recursiveLevelOrder(unvisited, ans);
  }
}

/**
 * Returns an array of size `n` with positive and negative integers. Greatest magnitude of elements is `max`.
 * @param {*} n 
 * @returns 
 */
function getRandomArray(n, max=40){
  const sign = [-1,1];
  return Array(n).fill().map(() => sign[Math.floor(Math.random()*2)] * Math.round(Math.random() * max))
}
function makeTreeUnbalanced(tree){
  for(let i=0;i<5;i++){
    tree.insert(Math.floor(500+Math.random()*100));
  }
}
const tree = new binaryTree(getRandomArray(10));
tree.prettyPrint();
console.log('Is tree balanced? ', tree.isBalanced());
console.log('Preorder: ', tree.preorder());
console.log('Inorder: ', tree.inorder());
console.log('Postorder: ', tree.postorder());

console.log('Called makeTreeUnbalanced()');
makeTreeUnbalanced(tree);
tree.prettyPrint();
console.log('Is tree balanced? ', tree.isBalanced());

console.log('Called rebalance()');
tree.rebalance();
tree.prettyPrint();
console.log('Is tree balanced? ', tree.isBalanced());

console.log('Preorder: ', tree.preorder());
console.log('Inorder: ', tree.inorder());
console.log('Postorder: ', tree.postorder());

