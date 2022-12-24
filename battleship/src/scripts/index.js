// import my styles
import "../styles/reset.css";
import "../styles/styles.css";
import "../styles/bebasneue.ttf";
import Ship from "./ship";
import Board from "./board";

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

  myBoard.loadShips(getDefaultFleet(0));
  rivalBoard.loadShips(getDefaultFleet(1));

  return { getBasicBoard, getAllShipPositions, getShipObj, rotateShip };
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
      throw Error("Invalid board index");
    }
    if (!(cellIndex >= 0 && cellIndex < Board.BOARD_SIZE * Board.BOARD_SIZE)) {
      throw Error("Invalid cell index");
    }
    const boards = battlefields.querySelectorAll(".board");
    return [...boards[boardIndex].querySelectorAll("td")][cellIndex];
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
    console.log(basicBoard);
    for (let row = 0; row < Board.BOARD_SIZE; row++) {
      for (let col = 0; col < Board.BOARD_SIZE; col++) {
        const pos = row * Board.BOARD_SIZE + col;
        const el = getBoardCellElement(boardIndex, pos);
        if (basicBoard[row][col] === Board.SHIP_CELL) {
          const shipCell = createHtmlElement(
            "div",
            null,
            ["ship-cell"],
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

  return {
    initialiseBoards,
    initialiseShips,
    displayGuess,
    listenGuess,
    getBoardCellElement,
    getMyShipCells,
    getShipCellElement,
    moveShipCell,
  };
})();

const controller = (() => {
  view.initialiseBoards();
  view.initialiseShips(model.getBasicBoard(0), 0);
  view.initialiseShips(model.getBasicBoard(1), 1);
  console.log("Initial board", model.getBasicBoard(0));

  function rotateShip(e) {
    const cell = e.target;

    // get the index of the ship cell
    const shipCellPos = parseInt(
      cell.closest("td").getAttribute("data-index"),
      10
    );
    console.log(shipCellPos);
    console.log("Current board: ", model.getBasicBoard(0));

    const shipObj = model.getShipObj(0, shipCellPos);
    const intialCoords = shipObj.getCellPositions();

    // rotate ship in basic board
    const changeOccurred = model.rotateShip(shipCellPos, 0);

    if (changeOccurred) {
      console.log("New board: ", model.getBasicBoard(0));

      // render changes visually
      const finalCoords = shipObj.getCellPositions();
      for (let i = 0; i < finalCoords.length; i++) {
        view.moveShipCell(0, intialCoords[i], finalCoords[i]);
      }
    }
  }
  // make my ships rotatable
  const myShipCells = view.getMyShipCells();
  myShipCells.forEach((cell) => {
    cell.addEventListener("dblclick", rotateShip);
  });
})();
