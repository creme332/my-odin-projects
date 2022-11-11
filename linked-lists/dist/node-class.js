"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = Node;
exports.default = _default;