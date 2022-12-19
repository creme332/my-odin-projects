/**
 * Class for boards on which ships are placed.
 */
class Board {
  _board;

  constructor() {
    const EMPTY_CELL = 0;
    this._board = [...Array(Board.BOARD_SIZE)].map((_) =>
      Array(Board.BOARD_SIZE).fill(EMPTY_CELL)
    );
  }

  static get BOARD_SIZE() {
    return 10;
  }

  _shipArray;

  loadShips(shipArray) {
    const SHIP_CELL = 1;
    shipArray.forEach((ship) => {
      ship.getCellPositions().forEach((cellPos) => {
        const row = parseInt(cellPos / Board.BOARD_SIZE, 10);
        const col = cellPos % Board.BOARD_SIZE;
        this._board[row][col] = SHIP_CELL;
      });
    });
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
    const EMPTY_CELL = 0;
    const SHIP_CELL = 1;
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
          board[newRow][newCol] === SHIP_CELL
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
        if (board[i][j] === SHIP_CELL) {
          if (illegalCell(i, j)) {
            return false;
          }
          if (isSubmarine(i, j)) {
            s++;
          }
        }

        if (j > 0) {
          // count consecutive horizontal ship cells
          if (board[i][j] === EMPTY_CELL) {
            // streak of consecutive cells ends
            if (hcells === 4) b++;
            if (hcells === 3) c++;
            if (hcells === 2) d++;
            hcells = 1;
          } else if (
            board[i][j] === SHIP_CELL &&
            board[i][j - 1] === SHIP_CELL
          ) {
            hcells++;
          }

          // count consecutive vertical ship cells
          if (board[j][i] === EMPTY_CELL) {
            if (vcells === 4) b++;
            if (vcells === 3) c++;
            if (vcells === 2) d++;
            vcells = 1;
          } else if (
            board[j][i] === SHIP_CELL &&
            board[j - 1][i] === SHIP_CELL
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
