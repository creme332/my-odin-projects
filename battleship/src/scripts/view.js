import Board from "./board";
import Ship from "./ship";

const view = (() => {
  const battlefields = document.getElementById("battlefields");

  /**
   * Creates and returns an HTML element.
   * @param {string} type HTML type : div, nav, ul, ...
   * @param {string} id HTML ID
   * @param {[string]} arrayClasses
   * @param {string} txtContent
   * @param {[HTMLElement]} arrayChildren HTML elements which must be appended to newly created element
   * @returns {HTMLElement} HTML element
   */
  function createHtmlElement(
    type,
    id,
    arrayClasses,
    txtContent,
    arrayChildren
  ) {
    const element = document.createElement(type);

    if (id) element.id = id;

    if (arrayClasses)
      arrayClasses.forEach((myClass) => element.classList.add(myClass));

    if (txtContent) element.textContent = txtContent;

    if (arrayChildren) {
      arrayChildren.forEach((child) => element.appendChild(child));
    }

    return element;
  }

  /**
   * Returns a new 10x10 empty board HTML element.
   * @param {string} boardID
   * @returns
   */
  function getNewBoard(boardID) {
    const newBoard = createHtmlElement("table", boardID, ["board"], null, null);
    for (let row = 0; row < Board.BOARD_SIZE; row++) {
      const cellsArray = [];
      for (let col = 0; col < Board.BOARD_SIZE; col++) {
        const index = row * Board.BOARD_SIZE + col;
        const cell = createHtmlElement("td", null, null, null, null);
        cell.setAttribute("data-index", index);
        cellsArray.push(cell);
      }
      const rowElement = createHtmlElement("tr", null, null, null, cellsArray);
      newBoard.appendChild(rowElement);
    }
    return newBoard;
  }

  function getMyBoard() {
    return battlefields.querySelector("#myBoard");
  }

  function getRivalBoard() {
    return battlefields.querySelector("#rivalBoard");
  }

  function initialiseBoards() {
    const myBoard = getNewBoard("myBoard");
    const rivalBoard = getNewBoard("rivalBoard");
    // ! Do not change order of appending:
    battlefields.appendChild(myBoard);
    battlefields.appendChild(rivalBoard);
  }

  function changeCellColor(cell, missed = true) {
    if (missed) {
      cell.classList.add("missed-hit");
    } else {
      cell.classList.add("good-hit");
    }
  }

  /**
   * Returns the cell at a given `boardIndex` and `cellIndex`
   * @param {int} boardIndex `0` for my board and `1` for rival board.
   * @param {int} cellIndex values between 0-99
   * @returns HTMLTableCellElement
   */
  function getBoardCellElement(boardIndex, cellIndex) {
    // validate parameters
    if (!(boardIndex === 0 || boardIndex === 1)) {
      throw Error(`Invalid board index: ${boardIndex}`);
    }
    if (!(cellIndex >= 0 && cellIndex < Board.BOARD_SIZE * Board.BOARD_SIZE)) {
      throw Error(`Invalid cell index: ${cellIndex}`);
    }
    const boards = battlefields.querySelectorAll(".board");
    return [...boards[boardIndex].querySelectorAll("td")][cellIndex];
  }

  function getAllBoardCellElements(boardIndex) {
    if (boardIndex === 0) {
      return getMyBoard().querySelectorAll("td");
    }
    return getRivalBoard().querySelectorAll("td");
  }

  function getShipCellElement(boardIndex, cellIndex) {
    const shipCell = getBoardCellElement(boardIndex, cellIndex).querySelector(
      ".ship-cell"
    );
    if (shipCell === null) {
      throw new Error(`No ship cell at ${cellIndex}`);
    }
    return shipCell;
  }

  function moveShipCell(boardIndex, initialPos, finalPos) {
    if (initialPos === finalPos) return;
    const shipCell = getShipCellElement(boardIndex, initialPos);
    const destination = getBoardCellElement(boardIndex, finalPos);
    console.log(shipCell, destination);
    destination.appendChild(shipCell);
  }

  function listenGuess() {
    // move this function to controller.
    const cells = getRivalBoard().querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        changeCellColor(e.target);
      });
    });
  }

  function changePlayButtonColour() {
    getPlayButton().classList.add("started");
  }

  /**
   * Returns the index of a cell on board.
   * @param {HTMLElement} el cell element or ship element
   * @returns {int} 0-99
   */
  function getCellIndex(el) {
    return parseInt(el.closest("td").getAttribute("data-index"), 10);
  }

  function displayGuess() {
    const x = [...getMyBoard().querySelectorAll("td")];
    x[0].classList.add("missed-hit");
    x[3].classList.add("missed-hit");

    x[10].classList.add("good-hit");
    x[20].classList.add("good-hit");
    x[30].classList.add("good-hit");

    const rivalCells = getRivalBoard().querySelectorAll("td");
    rivalCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        changeCellColor(e.target, false);
        const clickedCell = e.target.getAttribute("data-index");
        console.log(clickedCell);
      });
    });
  }

  function initialiseShips(basicBoard, boardIndex) {
    for (let row = 0; row < Board.BOARD_SIZE; row++) {
      for (let col = 0; col < Board.BOARD_SIZE; col++) {
        const pos = row * Board.BOARD_SIZE + col;
        const el = getBoardCellElement(boardIndex, pos);
        if (basicBoard[row][col] === Board.SHIP_CELL) {
          const shipClasses =
            boardIndex === 0 ? ["ship-cell"] : ["ship-cell", "hidden"];
          const shipCell = createHtmlElement(
            "div",
            null,
            shipClasses,
            null,
            null
          );
          el.appendChild(shipCell);
        }
      }
    }
  }

  function getMyShipCells() {
    return getMyBoard().querySelectorAll(".ship-cell");
  }

  function toggleGhostShip(addShip, headPos, size, isVertical) {
    let ghostShip;
    try {
      ghostShip = new Ship(size, isVertical, 0, headPos);
    } catch (err) {
      return;
    }
    ghostShip.getCellPositions().forEach((pos) => {
      if (addShip) {
        getBoardCellElement(0, pos).classList.add("ghost-cell");
      } else {
        getBoardCellElement(0, pos).classList.remove("ghost-cell");
      }
    });
  }

  function getPlayButton() {
    return document.querySelector("#playButton");
  }
  /**
   * Displays a message about winner to user.
   * @param {boolean} iWon `true` if I won the game
   */
  function displayWinner(iWon) {
    getPlayButton().textContent = iWon ? "You won!" : "You lost";
  }

  function displayTurn(myTurn) {
    getPlayButton().textContent = myTurn ? "Your turn" : "...";
  }

  return {
    initialiseBoards,
    changePlayButtonColour,
    initialiseShips,
    displayGuess,
    listenGuess,
    getBoardCellElement,
    getMyShipCells,
    getShipCellElement,
    moveShipCell,
    getCellIndex,
    toggleGhostShip,
    displayWinner,
    displayTurn,
    getPlayButton,
    getAllBoardCellElements,
    changeCellColor,
  };
})();

export default view;
