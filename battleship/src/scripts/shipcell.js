class ShipCell {
  _hit; // is cell destroyed ?

  _position; // position of cell on board

  constructor(position) {
    this._position = position;
    this._hit = false;
  }

  get hit() {
    return this._hit;
  }

  set hit(hitted) {
    this._hit = hitted;
  }

  set pos(pos) {
    this._position = pos;
  }
  
  get pos() {
    return this._position;
  }
}

export default ShipCell;
