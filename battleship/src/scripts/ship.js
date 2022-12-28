import ShipCell from "./shipcell.js";
import Board from "./board.js";
/**
 * Class for ships which are placed on battlefield.
 */
class Ship {
  _vertical;

  _size;

  _headPos; // position of head of ship on board

  _boardIndex; // board in which ship is found

  _life; // number of alive ship cells

  _cellsArray = []; // array of ShipCell objects

  /**
   * Initialise ship object.
   * @param {int} size Number of cells on ship. Must be between `1` and `4` inclusive.
   * @param {boolean} verticallyOriented `True` if ship is vertical.
   * @param {int} boardIndex board (`0` or`1`) on which ship is found.
   * @param {int} head Position of ship on board. (`0`-`99`)
   */
  constructor(size, verticallyOriented, boardIndex, head) {
    if (!(size > 0 && size < 5)) {
      throw new Error("Invalid ship size", size);
    }

    if (
      !(
        (boardIndex === 0 || boardIndex === 1) && // board index either 0 or 1
        head >= 0 &&
        head < Board.BOARD_SIZE * Board.BOARD_SIZE
      )
    ) {
      throw new Error("Invalid ship coordinates", [boardIndex, head]);
    }

    this._size = size;
    this._boardIndex = boardIndex;
    this._headPos = head;
    this._vertical = verticallyOriented;
    this._life = size;

    this.moveTo(head);
  }

  /**
   * Checks if ship of given orientation will fit board.
   * @param {boolean} verticalOrientation new orientation of ship
   * @returns {boolean}
   */
  fitsBoard(verticalOrientation = true) {
    const row = parseInt(this.headPos / Board.BOARD_SIZE, 10);
    const col = this.headPos % Board.BOARD_SIZE;
    if (verticalOrientation) {
      if (row + this._size - 1 >= Board.BOARD_SIZE) return false;
    } else if (col + this._size - 1 >= Board.BOARD_SIZE) {
      return false;
    }
    return true;
  }

  get isVertical() {
    return this._vertical;
  }

  get size() {
    return this._size;
  }

  set headPos(newPos) {
    if (newPos >= 0 && newPos < Board.BOARD_SIZE * Board.BOARD_SIZE) {
      this._headPos = newPos;
    } else {
      throw new Error(`Cannot set headPos to ${newPos}`);
    }
  }

  get headPos() {
    return this._headPos;
  }

  get boardIndex() {
    return this._boardIndex;
  }

  /**
   * Returns an array of ShipCell objects
   */
  get cellsArray() {
    return this._cellsArray;
  }

  /**
   * Moves ship to a new position on board, preserving its orientation.
   * @param {int} newHeadPos
   */
  moveTo(newHeadPos) {
    this._headPos = newHeadPos;
    this._cellsArray = [];

    if (this.fitsBoard(this._vertical)) {
      for (let i = 0; i < this._size; i++) {
        const cellPos =
          newHeadPos + (this._vertical ? Board.BOARD_SIZE * i : i);
        const cell = new ShipCell(cellPos);
        this._cellsArray.push(cell);
      }
    } else {
      throw new Error(
        `Ship cannot be moved to #${newHeadPos} (Insufficient space)`
      );
    }
  }

  rotatable() {
    return this.fitsBoard(!this._vertical);
  }

  /**
   * Rotates a vertical ship anti-clockwise OR rotates a
   * horizontal ship clockwise. Fixed point is head position.
   */
  rotate() {
    if (!this.rotatable()) return;

    for (let i = 0; i < this._size; i++) {
      const currentCell = this._cellsArray[i];
      if (this._vertical) {
        // ship is currently vertical so convert to horizontal
        currentCell.pos = this._headPos + i;
      } else {
        // ship is currently horizontal so convert to vertical
        currentCell.pos = this._headPos + i * Board.BOARD_SIZE;
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

  /**
   * Checks if the entire ship is destroyed
   * @returns {boolean}
   */
  sunk() {
    return this._life === 0;
  }

  /**
   * Returns an list of indices representing the position of each ship cell on the board.
   */
  getCellPositions() {
    return this._cellsArray.map((el) => el.pos);
  }
}

export default Ship;
