import ShipCell from "./shipcell.js";

/**
 * Class for ships which are placed on battlefield.
 */
class Ship {
  _vertical;

  _size;

  _coordinates; // a list containing board index and head position

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
    const BOARD_SIZE = 10;

    if (!(size > 0 && size < 5)) {
      throw new Error("Invalid ship size", size);
    }

    if (
      !(
        (coord[0] === 0 || coord[0] === 1) && // board index either 0 or 1
        coord[1] >= 0 &&
        coord[1] < BOARD_SIZE * BOARD_SIZE
      )
    ) {
      throw new Error("Invalid ship coordinates", coord);
    }
    this._size = size;
    this._vertical = verticallyOriented;
    this._coordinates = coord;
    this._life = size;

    const headPos = coord[1];

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

  /**
   * Returns an array of ShipCell objects
   */
  get cellsArray() {
    return this._cellsArray;
  }

  rotatable() {
    const headPos = this._coordinates[1];
    const BOARD_SIZE = 10;
    const row = parseInt(headPos.pos / BOARD_SIZE, 10);
    const col = headPos.pos % BOARD_SIZE;

    if (this._vertical) {
      // check if last cell of ship is on board if ship is horizontal
      if (col + this._size >= BOARD_SIZE) return false;
    } else if (row + this._size >= BOARD_SIZE) {
      // check if last cell of ship is on board if ship is vertical
      return false;
    }

    return true;
  }

  /**
   * Rotates a vertical ship anti-clockwise OR rotates a
   * horizontal ship clockwise. Fixed point is head position.
   */
  rotate() {
    if (!this.rotatable()) return;
    const headPos = this._coordinates[1];
    const BOARD_SIZE = 10;

    for (let i = 0; i < this._size; i++) {
      const currentCell = this._cellsArray[i];
      if (this._vertical) {
        // ship is currently vertical so convert to horizontal
        currentCell.pos = headPos + i;
      } else {
        // ship is currently horizontal so convert to vertical
        currentCell.pos = headPos + i * BOARD_SIZE;
      }
    }

    this._vertical = !this._vertical;
  }

  /**
   * Destroys a particular cell of the ship
   * @param {int} pos
   */
  attack(pos) {
    this._cellsArray.forEach((cell) => {
      if (cell.pos === pos) {
        cell.hit = true;
        this._life = Math.max(this._life - 1, 0);
      }
    });
  }

  sunk() {
    return this._life === 0;
  }
}

export default Ship;
