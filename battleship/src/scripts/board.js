/**
 * Class for boards on which ships are placed.
 */
class Board {
  _board; // a 2D grid containing only 0s and 1s

  _shipArray; // a list of Ship objects representing ships on board.

  _index; // index of board. 0 or 1

  constructor(boardIndex = 0) {
    this._board = [...Array(Board.BOARD_SIZE)].map(() =>
      Array(Board.BOARD_SIZE).fill(Board.EMPTY_CELL)
    );
    if (
      boardIndex !== Board.MY_BOARD_INDEX &&
      boardIndex !== Board.RIVAL_BOARD_INDEX
    ) {
      throw new Error(`Invalid board index ${boardIndex}`);
    }
    this._index = boardIndex;
  }

  get index() {
    return this._index;
  }

  static get MY_BOARD_INDEX() {
    return 0;
  }

  static get RIVAL_BOARD_INDEX() {
    return 1;
  }

  static get EMPTY_CELL() {
    return 0;
  }

  static get SHIP_CELL() {
    return 1;
  }

  static get BOARD_SIZE() {
    return 10;
  }

  /**
   * Returns a 2D matrix of 0s and 1s where the 1s represent ship cells.
   * @returns {[[]]}
   */
  get basicBoard() {
    return this._board;
  }

  setCellValue(cellPos, cellValue) {
    if (
      cellPos < 0 ||
      cellPos >= Board.BOARD_SIZE * Board.BOARD_SIZE ||
      !(cellValue === Board.EMPTY_CELL || cellValue === Board.SHIP_CELL)
    ) {
      throw new Error(`Cannot set cell value to ${cellValue} at ${cellPos}`);
    }
    const row = parseInt(cellPos / Board.BOARD_SIZE, 10);
    const col = cellPos % Board.BOARD_SIZE;
    this._board[row][col] = cellValue;
  }

  getCellValue(cellPos) {
    if (cellPos < 0 || cellPos >= Board.BOARD_SIZE * Board.BOARD_SIZE) {
      throw new Error(`Cannot get cell value at ${cellPos}`);
    }
    const row = parseInt(cellPos / Board.BOARD_SIZE, 10);
    const col = cellPos % Board.BOARD_SIZE;
    return this._board[row][col];
  }

  /**
   * Inserts ships on board only if `shipArray` is valid.
   * @param {[Ship]} shipArray An array of 10 ship objects
   */
  loadShips(shipArray) {
    // create a new basic board using shipArray
    const newBoard = [...Array(Board.BOARD_SIZE)].map(() =>
      Array(Board.BOARD_SIZE).fill(Board.EMPTY_CELL)
    );
    shipArray.forEach((ship) => {
      ship.getCellPositions().forEach((cellPos) => {
        newBoard[parseInt(cellPos / Board.BOARD_SIZE, 10)][
          cellPos % Board.BOARD_SIZE
        ] = Board.SHIP_CELL;
      });
    });

    // if board is valid, update true board.
    if (Board.validate(newBoard)) {
      this._board = newBoard;
      this._shipArray = shipArray;
    } else {
      console.log(newBoard, shipArray);
      throw new Error("Invalid board configuration given by shipArray");
    }
  }

  /**
   * Removes all ships from board.
   */
  resetBoard() {
    this._board = [...Array(Board.BOARD_SIZE)].map(() =>
      Array(Board.BOARD_SIZE).fill(Board.EMPTY_CELL)
    );
    this._shipArray = [];
  }

  /**
   * Returns the ship object of the ship having a ship cell at `pos`.
   * Returns `null` if there's no ship at given position.
   * Throws an error if ship corresponding to ship cell could not be found.
   * @param {int} pos Integer `0`-`99`
   * @returns {Ship}
   */
  getShipAt(pos) {
    // check if there is a ship cell at given position
    if (this.getCellValue(pos) !== Board.SHIP_CELL) {
      return null;
    }

    // find ship which has a cell at given pos
    for (let i = 0; i < this._shipArray.length; i++) {
      if (this._shipArray[i].getCellPositions().includes(pos)) {
        return this._shipArray[i];
      }
    }
    throw new Error(`Unknown ship cell found on board at ${pos}`, this._board);
  }

  /**
   * Moves a ship to a new position. If new position is invalid, function returns false.
   * @param {Ship} shipObj
   * @param {int} newHeadPos
   * @returns {bool} True if ship has changed position.
   */
  moveShip(shipObj, newHeadPos) {
    if (shipObj === null) throw new Error(`ShipObj cannot be null`);
    if (shipObj.headPos === newHeadPos) {
      return false;
    }

    const headRow = parseInt(newHeadPos / Board.BOARD_SIZE, 10);
    const headCol = newHeadPos % Board.BOARD_SIZE;

    // if new ship does not fit board
    const originalPos = shipObj.headPos;
    shipObj.headPos = newHeadPos;
    if (!shipObj.fitsBoard(shipObj.isVertical)) {
      shipObj.headPos = originalPos;
      return false;
    }
    shipObj.headPos = originalPos;

    // clear current ship from basic board
    shipObj.getCellPositions().forEach((pos) => {
      this.setCellValue(pos, Board.EMPTY_CELL);
    });

    // check that no other ship will touch/overlap my ship
    if (!shipObj.isVertical) {
      for (let row = headRow - 1; row <= headRow + 1; row++) {
        if (!(row < 0 || row >= Board.BOARD_SIZE)) {
          for (let col = headCol - 1; col <= headCol + shipObj.size; col++) {
            if (!(col < 0 || col >= Board.BOARD_SIZE)) {
              if (this._board[row][col] === Board.SHIP_CELL) {
                // new ship position is invalid.
                // put ship back to its initial position
                shipObj.getCellPositions().forEach((pos) => {
                  this.setCellValue(pos, Board.SHIP_CELL);
                });
                return false;
              }
            }
          }
        }
      }
    } else {
      for (let row = headRow - 1; row <= headRow + shipObj.size; row++) {
        if (!(row < 0 || row >= Board.BOARD_SIZE)) {
          for (let col = headCol - 1; col <= headCol + 1; col++) {
            if (!(col < 0 || col >= Board.BOARD_SIZE)) {
              if (this._board[row][col] === Board.SHIP_CELL) {
                // new ship position is invalid.
                // put ship back to its initial position
                shipObj.getCellPositions().forEach((pos) => {
                  this.setCellValue(pos, Board.SHIP_CELL);
                });
                return false;
              }
            }
          }
        }
      }
    }

    // place ship on basic board in its new position
    shipObj.moveTo(newHeadPos);

    shipObj.getCellPositions().forEach((pos) => {
      this.setCellValue(pos, Board.SHIP_CELL);
    });

    return true;
  }

  /**
   * Rotates the ship if possible.
   * @param {Ship} shipObj
   * @returns {boolean} rotation performed or not?
   */
  rotateShip(shipObj) {
    if (shipObj === null) throw new Error(`ShipObj cannot be null`);
    if (shipObj.size === 1) return false;

    const headRow = parseInt(shipObj.headPos / Board.BOARD_SIZE, 10);
    const headCol = shipObj.headPos % Board.BOARD_SIZE;

    // check surrounding cells of rotated version of ship
    if (shipObj.isVertical) {
      for (let col = headCol + 2; col <= headCol + shipObj.size; col++) {
        for (let row = headRow - 1; row <= headRow + 1; row++) {
          if (
            col >= 0 &&
            col < Board.BOARD_SIZE &&
            row >= 0 &&
            row < Board.BOARD_SIZE &&
            this._board[row][col] === Board.SHIP_CELL
          ) {
            return false;
          }
        }
      }
    } else {
      for (let col = headCol - 1; col <= headCol + 1; col++) {
        for (let row = headRow + 2; row <= headRow + shipObj.size; row++) {
          if (
            col >= 0 &&
            col < Board.BOARD_SIZE &&
            row >= 0 &&
            row < Board.BOARD_SIZE &&
            this._board[row][col] === Board.SHIP_CELL
          ) {
            return false;
          }
        }
      }
    }

    // clear current ship from basic board
    shipObj.getCellPositions().forEach((pos) => {
      this.setCellValue(pos, Board.EMPTY_CELL);
    });

    shipObj.rotate();

    // place rotated ship on basic board
    shipObj.getCellPositions().forEach((pos) => {
      this.setCellValue(pos, Board.SHIP_CELL);
    });

    return true;
  }

  /**
   * Verifies if given board is a valid board based on the rules of the game.
   * @param {[[]]} board 10x10 board where 0 indicates empty cell and 1 indicates ship cell
   * @returns {boolean}
   */
  static validate(board) {
    /**
     * Checks if ship cell at (row, col)
     * @param {[[]]} board 10x10 board where 0 indicates empty cell and 1 indicates ship cell
     * @param {*} row
     * @param {*} col
     * @returns {boolean}
     */
    function isSubmarine(row, col) {
      const rr = [-1, 0, 1, 0]; // translations for row
      const cc = [0, 1, 0, -1]; // translations for col

      for (let i = 0; i < 4; i++) {
        const newRow = row + rr[i];
        const newCol = col + cc[i];
        if (
          newRow > -1 &&
          newRow < Board.BOARD_SIZE &&
          newCol > -1 &&
          newCol < Board.BOARD_SIZE &&
          board[newRow][newCol] === Board.SHIP_CELL
        ) {
          return false;
        }
      }
      return true;
    }

    /**
     * Checks if the ship cell at (row, col) shares a corner
     *  with another ship cell.
     * @param {[[]]} board 10x10 board where 0 indicates empty cell and 1 indicates ship cell
     * @param {int} row
     * @param {int} col
     * @returns {boolean}
     */
    function illegalCell(row, col) {
      // translations to access all 4 corners
      const rr = [-1, -1, 1, 1]; // translations for row
      const cc = [-1, 1, -1, 1]; // translations for col

      for (let i = 0; i < 4; i++) {
        const r = row + rr[i];
        const c = col + cc[i];
        if (
          r > -1 &&
          r < Board.BOARD_SIZE &&
          c > -1 &&
          c < Board.BOARD_SIZE &&
          board[r][c] === 1
        ) {
          return true;
        }
      }
      return false;
    }

    let b = 0; // battleship count
    let c = 0; // cruiser count
    let d = 0; // destroyer count
    let s = 0; // submarine count

    let hcells = 1; // consecutive horizontal cells
    let vcells = 1; // consecutive vertical cells

    for (let i = 0; i < Board.BOARD_SIZE; i++) {
      hcells = 1;
      vcells = 1;

      for (let j = 0; j < Board.BOARD_SIZE; j++) {
        if (board[i][j] === Board.SHIP_CELL) {
          if (illegalCell(i, j)) {
            return false;
          }
          if (isSubmarine(i, j)) {
            s++;
          }
        }

        if (j > 0) {
          // count consecutive horizontal ship cells
          if (board[i][j] === Board.EMPTY_CELL) {
            // streak of consecutive cells ends
            if (hcells === 4) b++;
            if (hcells === 3) c++;
            if (hcells === 2) d++;
            hcells = 1;
          } else if (
            board[i][j] === Board.SHIP_CELL &&
            board[i][j - 1] === Board.SHIP_CELL
          ) {
            hcells++;
          }

          // count consecutive vertical ship cells
          if (board[j][i] === Board.EMPTY_CELL) {
            if (vcells === 4) b++;
            if (vcells === 3) c++;
            if (vcells === 2) d++;
            vcells = 1;
          } else if (
            board[j][i] === Board.SHIP_CELL &&
            board[j - 1][i] === Board.SHIP_CELL
          ) {
            vcells++;
          }
        }
      }
      if (hcells === 4) b++;
      if (vcells === 4) b++;
      if (hcells === 3) c++;
      if (vcells === 3) c++;
      if (hcells === 2) d++;
      if (vcells === 2) d++;
    }
    if (b === 1 && c === 2 && d === 3 && s === 4) {
      return true;
    }
    return false;
  }

  /**
   * Returns a  2D list of coordinates of all ships on board.
   * @returns {List}
   */
  getAllShipPositions() {
    const AllShipPositions = [];
    this._shipArray.forEach((ship) => {
      AllShipPositions.push(ship.getCellPositions());
    });
    return AllShipPositions;
  }
}
export default Board;
