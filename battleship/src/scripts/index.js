// import my styles
import "../styles/reset.css";
import "../styles/styles.css";
import "../styles/bebasneue.ttf";
import Ship from "./ship";
import Board from "./board";
// import Sortable from "sortablejs";

const model = (() => {
  const myBoard = new Board();
  const rivalBoard = new Board();

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
  myBoard.loadShips(getDefaultFleet(0));
  rivalBoard.loadShips(getDefaultFleet(1));

  return { getBasicBoard };
})();

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
   * Returns a new 10x10 empty board.
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
  function getCellElement(boardIndex, cellIndex) {
    // validate parameters
    if (!(boardIndex === 0 || boardIndex === 1)) {
      throw Error("Invalid board index");
    }
    if (!(cellIndex >= 0 && cellIndex < Board.BOARD_SIZE * Board.BOARD_SIZE)) {
      throw Error("Invalid cell index");
    }
    const boards = battlefields.querySelectorAll(".board");
    return [...boards[boardIndex].querySelectorAll("td")][cellIndex];
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

  function displayBasicBoard(basicBoard, boardIndex) {
    for (let row = 0; row < Board.BOARD_SIZE; row++) {
      for (let col = 0; col < Board.BOARD_SIZE; col++) {
        const pos = row * Board.BOARD_SIZE + col;
        const el = getCellElement(boardIndex, pos);
        if (basicBoard[row][col] === Board.SHIP_CELL) {
          el.style.backgroundColor = "grey";
        }
      }
    }
  }

  return {
    initialiseBoards,
    displayBasicBoard,
    displayGuess,
    listenGuess,
    getCellElement,
  };
})();

const controller = (() => {
  view.initialiseBoards();
  view.displayBasicBoard(model.getBasicBoard(0), 0);
  view.displayBasicBoard(model.getBasicBoard(1), 1);
})();

// view.displayGuess();
// view.listenGuess();