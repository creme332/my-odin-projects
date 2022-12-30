// import Ship from "./ship.js";
// import Board from "./board.js";

import Ship from "./ship";
import Board from "./board";

const model = (() => {
  let gameOngoing = false;
  let myTurn = true;
  const myBoard = new Board();
  const rivalBoard = new Board();
  const myGuesses = [];
  const rivalGuesses = [];

  function initialiseBoards() {
    // reset boards
    myBoard.resetBoard();
    rivalBoard.resetBoard();

    // load ships
    myBoard.loadShips(getDefaultFleet(0));
    rivalBoard.loadShips(getRandomFleet(1));
  }

  function gameStarted() {
    return gameOngoing;
  }
  function startGame() {
    if (gameOngoing) {
      throw new Error("Cannot start an ongoing game twice");
    }
    gameOngoing = true;
    myTurn = true;

    // empty guesses
    myGuesses.length = 0;
    rivalGuesses.length = 0;
  }

  /**
   * Check if a player has won yet.
   * @returns {boolean}
   */
  function checkWinner() {
    let iWon = true;
    let rWon = true;
    for (let pos = 0; pos < Board.BOARD_SIZE * Board.BOARD_SIZE; pos++) {
      // check if i have not won
      if (
        myBoard.getCellValue(pos) === Board.SHIP_CELL &&
        !myGuesses.includes(pos)
      ) {
        iWon = false;
      }
      // check if rival has not won
      if (
        rivalBoard.getCellValue(pos) === Board.SHIP_CELL &&
        !rivalGuesses.includes(pos)
      ) {
        rWon = false;
      }
    }
    return iWon || rWon;
  }

  /**
   * Returns `true` if it is left player's turn to attack.
   * @returns {boolean}
   */
  function getTurn() {
    return myTurn;
  }

  function endGame() {
    if (!gameOngoing) {
      throw new Error("Cannot end a game twice");
    }
    gameOngoing = false;
  }

  function swapTurn() {
    if (gameOngoing) {
      myTurn = !myTurn;
    } else {
      throw new Error("Cannot change turn when game has not started");
    }
  }

  function isShip(boardIndex, pos) {
    if (boardIndex === 0) return myBoard.getCellValue(pos) === Board.SHIP_CELL;
    return rivalBoard.getCellValue(pos) === Board.SHIP_CELL;
  }

  function computerPlay() {
    if (getTurn()) throw new Error("Not computer turn to play");
    let randomMove = 0;
    while (!attackBoard(randomMove)) {
      randomMove++;
    }
    return randomMove;
  }

  /**
   * Updates list of guesses. Returns `true` only if board position is valid
   * and has not been previously attacked.
   * @param {int} pos position of guess : 0 - 99
   * @returns {boolean}
   */
  function attackBoard(pos) {
    if (pos < 0 || pos >= Board.BOARD_SIZE * Board.BOARD_SIZE) {
      throw new Error(`Cannot attack invalid coordinates ${pos}`);
    }
    if (myTurn) {
      if (myGuesses.includes(pos)) {
        return false;
      }
      myGuesses.push(pos);
    } else {
      if (rivalGuesses.includes(pos)) {
        return false;
      }
      rivalGuesses.push(pos);
    }
    return true;
  }

  /**
   * Returns a valid fleet of ship.
   * @param {int} boardIndex
   * @returns {[Ship]}
   */
  function getRandomFleet(boardIndex) {
    /**
     * Returns a valid ship that fits board and does not touch other ships.
     * @param {int} shipSize Integer 1 - 4 inclusive
     * @param {int} boardIndex Integer 0 - 1 inclusive
     * @returns {Ship}
     */
    function getRandomShip(shipSize, boardNum, freePositions, shipsPositions) {
      let validShip = false;
      let ship;
      const size = freePositions.length;
      while (!validShip) {
        const randomOrientation = Math.random() < 0.5;
        const randomPos = freePositions[Math.floor(Math.random() * size)];
        try {
          ship = new Ship(shipSize, randomOrientation, boardNum, randomPos);

          // is there any ship cell which is not free
          const shipCellsAvailable = !ship
            .getCellPositions()
            .some((pos) => !freePositions.includes(pos));

          // A ship is isolated iff all surrounding cells are not ship cells
          const shipIsIsolated = !ship
            .getCellPositions()
            .some((pos) =>
              getTouchingCells(pos).some((x) => shipsPositions.includes(x))
            );

          validShip = shipCellsAvailable && shipIsIsolated;
        } catch (err) {
          validShip = false;
        }
      }
      return ship;
    }

    /**
     * Returns the positions of all cells surrounding current cell.
     * @param {int} pos cell position 0 - 99
     * @returns {[int]} array of positions
     */
    function getTouchingCells(pos) {
      if (pos < 0 || pos >= Board.BOARD_SIZE * Board.BOARD_SIZE) {
        throw new Error(`Invalid cell position: ${pos}`);
      }
      const cells = [];
      const row = parseInt(pos / Board.BOARD_SIZE, 10);
      const col = pos % Board.BOARD_SIZE;
      const translation = [
        [-1, -1, -1, 0, 1, 1, 1, 0],
        [-1, 0, 1, 1, 1, 0, -1, -1],
      ];
      for (let i = 0; i < translation[0].length; i++) {
        const r = row + translation[0][i];
        const c = col + translation[1][i];
        if (r >= 0 && c >= 0 && r < Board.BOARD_SIZE && c < Board.BOARD_SIZE) {
          cells.push(r * Board.BOARD_SIZE + c);
        }
      }
      return cells;
    }
    const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    let freePositions = Array.from(
      Array(Board.BOARD_SIZE * Board.BOARD_SIZE).keys()
    ); // All positions where ship can be placed [0, 1, 2, 3, ... , 99]
    let shipPositions = [];
    const fleet = [];

    shipSizes.forEach((shipSize) => {
      // displayBoard(shipPositions);
      // console.log(`Solving ${shipSize}`);
      // get a random valid ship
      const shipObj = getRandomShip(
        shipSize,
        boardIndex,
        freePositions,
        shipPositions
      );
      // console.log(`Solved ${shipSize}`);

      fleet.push(shipObj);

      shipPositions = [...shipPositions, ...shipObj.getCellPositions()];

      // update isFree (remove ship cell positions and surrounding cells)
      shipObj.getCellPositions().forEach((pos) => {
        const surroundingCells = getTouchingCells(pos);
        freePositions = freePositions.filter(
          (el) => el !== pos && !surroundingCells.includes(el)
        );
        // console.log(freePositions);
      });
    });

    return fleet;
  }

  function getDefaultFleet(boardIndex) {
    return [
      new Ship(4, true, boardIndex, 0),
      new Ship(3, true, boardIndex, 3),
      new Ship(3, false, boardIndex, 5),
      new Ship(2, false, boardIndex, 38),
      new Ship(2, true, boardIndex, 60),
      new Ship(2, true, boardIndex, 84),
      new Ship(1, false, boardIndex, 99),
      new Ship(1, true, boardIndex, 19),
      new Ship(1, true, boardIndex, 90),
      new Ship(1, false, boardIndex, 59),
    ];
  }

  function getBasicBoard(boardIndex) {
    return boardIndex === 0 ? myBoard.basicBoard : rivalBoard.basicBoard;
  }

  function getAllShipPositions(boardIndex) {
    return boardIndex === 0
      ? myBoard.getAllShipPositions()
      : rivalBoard.getAllShipPositions();
  }

  function getShipObj(boardIndex, pos) {
    return boardIndex === 0
      ? myBoard.getShipAt(pos)
      : rivalBoard.getShipAt(pos);
  }

  function rotateShip(shipCellPos, boardIndex) {
    return boardIndex === 0
      ? myBoard.rotateShip(myBoard.getShipAt(shipCellPos))
      : rivalBoard.rotateShip(rivalBoard.getShipAt(shipCellPos));
  }

  /**
   *
   * @param {Ship} shipObj
   * @param {int} newHeadPos
   * @param {int} boardIndex
   * @returns {boolean}
   */
  function moveShip(oldHeadPos, newHeadPos, boardIndex) {
    return boardIndex === 0
      ? myBoard.moveShip(myBoard.getShipAt(oldHeadPos), newHeadPos)
      : rivalBoard.moveShip(rivalBoard.getShipAt(oldHeadPos), newHeadPos);
  }

  return {
    getBasicBoard,
    getAllShipPositions,
    getShipObj,
    rotateShip,
    moveShip,
    startGame,
    swapTurn,
    endGame,
    attackBoard,
    checkWinner,
    getTurn,
    gameStarted,
    initialiseBoards,
    isShip,
    computerPlay,
    getRandomFleet,
  };
})();

// function displayBoard(shipPos) {
//   const board = [...Array(10)].map(() => Array(10).fill(0));
//   for (let i = 0; i < 100; i++) {
//     if (shipPos.includes(i)) {
//       board[parseInt(i / 10, 10)][i % 10] = 1;
//     }
//   }
//   console.log(board);
// }
export default model;
// const y = model.getRandomFleet(0);
// const t = new Board();
// t.loadShips(y);
// console.log(y);

// function getTouchingCells(pos) {
//   if (pos < 0 || pos >= 100) {
//     throw new Error(`Invalid cell position: ${pos}`);
//   }
//   const cells = [];
//   const row = parseInt(pos / 10, 10);
//   const col = pos % 10;
//   const translation = [
//     [-1, -1, -1, 0, 1, 1, 1, 0],
//     [-1, 0, 1, 1, 1, 0, -1, -1],
//   ];
//   for (let i = 0; i < translation[0].length; i++) {
//     const r = row + translation[0][i];
//     const c = col + translation[1][i];
//     if (r >= 0 && c >= 0 && r < 10 && c < 10) {
//       cells.push(r * 10 + c);
//     }
//   }
//   return cells;
// }

// const shipPositions = [245];

// const p = [11, 12].some((pos) => {
//   const surroundingCells = getTouchingCells(pos);
//   console.log(`For ship cell ${pos}: `);

//   // is there a surrounding cell which is a ship
//   const ans = getTouchingCells(pos).some((x) => {
//     // is surrounding cell free?
//     const isShip = shipPositions.includes(x);
//     if (isShip) {
//       console.log(`${x} is a ship`);
//     }
//     return isShip;
//   });
//   if (ans) {
//     console.log(`Surrounding cells of ${pos} contain ship`);
//   }
//   return ans;
// });
// console.log("ship invalid: ", p);
