/* eslint-disable */

import BinaryTree from "./src/binary-tree-class";
import Node from "./src/node-class";

describe("BinaryTree.sanitiseArray()", () => {
  test("Empty array", () => {
    const list = [];
    expect(BinaryTree.sanitiseArray(list)).toStrictEqual(list);
  });

  test("Array with no duplicates", () => {
    const list = [4, 5, 6, 0, -1];
    expect(BinaryTree.sanitiseArray(list)).toStrictEqual(
      list.sort((a, b) => a - b)
    );
  });

  test("Array with duplicates", () => {
    const list = [4, 4, 5, 5, -10, 1, 1, 6, 0, -1];
    expect(BinaryTree.sanitiseArray(list)).toStrictEqual([
      -10, -1, 0, 1, 4, 5, 6,
    ]);
  });
});

describe("Tree traversal", () => {
  const tree1 = new BinaryTree([1, 1, -1, 2, 5, 3, 0, 10]);
  /*
  │       ┌── 10
  │   ┌── 5
  │   │   └── 3
  └── 2
      │   ┌── 1
      └── 0
          └── -1
  */

  const emptyTree = new BinaryTree([]);
  const singleElementTree = new BinaryTree([0]);

  // beforeEach(() => {
  // });
  describe("inorder", () => {
    test("tree1", () => {
      expect(tree1.inorder()).toStrictEqual([-1, 0, 1, 2, 3, 5, 10]);
    });

    test("empty tree", () => {
      expect(emptyTree.inorder()).toStrictEqual([]);
    });

    test("single node tree", () => {
      expect(singleElementTree.inorder()).toStrictEqual([0]);
    });
  });

  describe("preorder", () => {
    test("preorder for tree1", () => {
      expect(tree1.preorder()).toStrictEqual([2, 0, -1, 1, 5, 3, 10]);
    });

    test("preorder for empty tree", () => {
      expect(emptyTree.preorder()).toStrictEqual([]);
    });

    test("single node tree", () => {
      expect(singleElementTree.preorder()).toStrictEqual([0]);
    });
  });

  describe("postorder", () => {
    test("postorder for tree1", () => {
      expect(tree1.postorder()).toStrictEqual([-1, 1, 0, 3, 10, 5, 2]);
    });

    test("postorder for empty tree", () => {
      expect(emptyTree.postorder()).toStrictEqual([]);
    });

    test("single node tree", () => {
      expect(singleElementTree.postorder()).toStrictEqual([0]);
    });
  });

  describe("levelorder", () => {
    test("levelorder for tree1", () => {
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10]);
    });

    test("levelorder for empty tree", () => {
      expect(emptyTree.levelOrder()).toStrictEqual([]);
    });

    test("single node tree", () => {
      expect(singleElementTree.levelOrder()).toStrictEqual([0]);
    });
  });

  describe("recursive levelorder", () => {
    test("recursive levelorder", () => {
      expect(tree1.recursiveLevelOrder()).toStrictEqual([
        2, 0, 5, -1, 1, 3, 10,
      ]);
    });
    test("recursive levelOrder for empty tree", () => {
      expect(emptyTree.recursiveLevelOrder()).toStrictEqual([]);
    });
    test("single node tree", () => {
      expect(singleElementTree.recursiveLevelOrder()).toStrictEqual([0]);
    });
  });
});

describe("Tree operations", () => {
  describe("insertion", () => {
    let tree1;
    beforeEach(() => {
      tree1 = new BinaryTree([1, 1, -1, 2, 5, 3, 0, 10]);
    });
    /*
    │       ┌── 10
    │   ┌── 5
    │   │   └── 3
    └── 2
        │   ┌── 1
        └── 0
            └── -1
    */
    test("insert root node to empty tree", () => {
      tree1 = new BinaryTree();
      tree1.insert(0);
      expect(tree1.levelOrder()).toStrictEqual([0]);
    });

    test("insert a left child", () => {
      tree1.insert(1);
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10, 1]);
    });

    test("insert a right child", () => {
      tree1.insert(100);
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10, 100]);
    });

    test("insert multiple unique values", () => {
      tree1.insert(100);
      tree1.insert(200);
      tree1.insert(150);
      tree1.insert(300);
      tree1.insert(-100);
      expect(tree1.levelOrder()).toStrictEqual([
        2, 0, 5, -1, 1, 3, 10, -100, 100, 200, 150, 300,
      ]);
    });
  });

  describe("deletion", () => {
    let tree1;
    beforeEach(() => {
      tree1 = new BinaryTree([1, 1, -1, 0, 10]);
      /*
      │   ┌── 10
      └── 1
          └── 0
              └── -1
      */
    });

    test("delete a leaf", () => {
      tree1.delete(-1);
      expect(tree1.levelOrder()).toStrictEqual([1, 0, 10]);
    });

    test("delete a node having only 1 left child", () => {
      tree1.delete(0);
      expect(tree1.levelOrder()).toStrictEqual([1, -1, 10]);
    });

    test("delete a node having only 1 right child", () => {
      tree1.insert(100);
      tree1.delete(10);
      expect(tree1.levelOrder()).toStrictEqual([1, 0, 100, -1]);
    });

    test("delete a node with 2 children", () => {
      tree1.delete(1);
      expect(tree1.levelOrder()).toStrictEqual([0,-1,10]);
    });

    test("delete all values", () => {
      tree1.delete(1);
      tree1.delete(0);
      tree1.delete(-1);
      tree1.delete(10);
      expect(tree1.levelOrder()).toStrictEqual([]);
    });

    test("delete a node not found in tree", () => {
      const originalTree = tree1.levelOrder();
      tree1.delete(500);
      const finalTree = tree1.levelOrder();
      expect(originalTree).toStrictEqual(finalTree);
    });
  });

  describe("find",()=>{
    let tree1;
    beforeEach(() => {
      tree1 = new BinaryTree([1, 1, -1, 0, 10]);
      /*
      │   ┌── 10
      └── 1
          └── 0
              └── -1
      */
    });

    test("root", () => {
      expect(tree1.find(1).data).toStrictEqual(1);
    });

    test("left leaf", () => {
      expect(tree1.find(-1).data).toStrictEqual(-1);
    });

    test("left child", () => {
      expect(tree1.find(0).data).toStrictEqual(0);
    });

    test("right leaf", () => {
      tree1.insert(500);
      expect(tree1.find(10).data).toStrictEqual(10);
    });

    test("right child", () => {
      expect(tree1.find(10).data).toStrictEqual(10);
    });

    test("non-existent node", () => {
      expect(tree1.find(999)).toStrictEqual(null);
    });
  })
});

describe("Tree properties", () => {

  describe("height", () => {
    test("empty tree", () => {
      tree1 = new BinaryTree();
      expect(tree1.levelOrder()).toStrictEqual([0]);
    });

    test("tree of height 1", () => {
      tree1.insert(1);
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10, 1]);
    });

    test("left node", () => {
      tree1.insert(1);
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10, 1]);
    });

    test("node with 1 child", () => {
      tree1.insert(1);
      expect(tree1.levelOrder()).toStrictEqual([2, 0, 5, -1, 1, 3, 10, 1]);
    });
  });

  describe("depth", () => {
    test("empty tree", () => {
      const tree1 = new BinaryTree();
      expect(tree1.depth()).toStrictEqual(0);
    });

    test("depth of root node", () => {
      const tree1 = new BinaryTree();
      const node  = new Node(2);
      tree1.insert(node.data);
      expect(tree1.depth(node)).toStrictEqual(0);
    });

    test("left node of depth 1", () => {
      const tree1 = new BinaryTree([5,4]);
      const node =  new Node(6);
      tree1.insert(node.data);
      expect(tree1.depth(node)).toStrictEqual(1);
    });

    test("leaf with depth 2", () => {
      const tree1 = new BinaryTree([1, 1, -1, 2, 5, 3, 0, 10]);
      const node = tree1.find(10);
      tree1.insert(node.data);
      expect(tree1.depth(node)).toStrictEqual(2);
    });
  });
});