import ShipCell from "./shipcell";

/**
 * Class for ships which are placed on battlefield.
 */
class Ship {
  _vertical;

  _size;

  _coordinates;

  _life;

  _cellsArray = [];

  /**
   * Initialise ship object.
   * @param {int} size Number of cells on ship. Must be between `1` and `4` inclusive.
   * @param {boolean} verticallyOriented `True` if ship is vertical.
   * @param {[int, int]} coord Coordinates of ship.
   * `coord[0]` : board (`0` or`1`) on which ship is found.
   *
   * `coord[1]` : Position of ship on particular board. (`0`-`99`)
   */
  constructor(size, verticallyOriented, coord) {
    if (!(size > 0 && size < 5)) {
      throw new Error("Invalid ship size", size);
    }

    if (
      !(
        (coord[0] === 0 || coord[0] === 1) && // board index either 0 or 1
        coord[1] >= 0 &&
        coord[1] < 100
      )
    ) {
      throw new Error("Invalid ship coordinates", coord);
    }
    this._size = size;
    this._vertical = verticallyOriented;
    this._coordinates = coord;
    this._life = size;

    const headPos = coord[1];
    const BOARD_SIZE = 10;

    for (let i = 0; i < this._size; i++) {
      const cellPos = headPos + (this._vertical ? BOARD_SIZE * i : i);
      const cell = new ShipCell(cellPos);
      this._cellsArray.push(cell);
    }
  }

  get vertical() {
    return this._vertical;
  }

  get size() {
    return this._size;
  }

  get coordinates() {
    return this._coordinates;
  }

  get cellsArray(){
    return this._cellsArray;
  }

  rotate() {
    return this._coordinates;
  }
}

export default Ship;
