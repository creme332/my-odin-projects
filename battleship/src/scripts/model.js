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
    rivalBoard.loadShips(getDefaultFleet(1));
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
    initialiseBoards
  };
})();

export default model;
