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

export default Node;
