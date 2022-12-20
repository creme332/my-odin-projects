/**
 * Class for boards on which ships are placed.
 */
class Board {
  _board;

  _shipArray;

  static get EMPTY_CELL() {
    return 0;
  }

  static get SHIP_CELL() {
    return 1;
  }

  static get BOARD_SIZE() {
    return 10;
  }

  get basicBoard() {
    return this._board;
  }

  loadShips(shipArray) {
    const newBoard = [...Array(Board.BOARD_SIZE)].map((_) =>
      Array(Board.BOARD_SIZE).fill(Board.EMPTY_CELL)
    );
    shipArray.forEach((ship) => {
      ship.getCellPositions().forEach((cellPos) => {
        const row = parseInt(cellPos / Board.BOARD_SIZE, 10);
        const col = cellPos % Board.BOARD_SIZE;
        newBoard[row][col] = Board.SHIP_CELL;
      });
    });

    if (Board.validate(newBoard)) {
      this._board = newBoard;
      this._shipArray = shipArray;
    } else {
      throw new Error("Invalid board configuration given by shipArray");
    }
  }

  resetBoard() {
    return Board.BOARD_SIZE;
  }

  getShipAt(pos) {
    return Board.BOARD_SIZE;
  }

  moveShipTo(ship, pos) {
    return Board.BOARD_SIZE;
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
    // console.log(b, c, d, s);
    if (b === 1 && c === 2 && d === 3 && s === 4) {
      return true;
    }
    return false;
  }
}
export default Board;
