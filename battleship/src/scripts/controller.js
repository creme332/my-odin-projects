import Board from "./board";
import model from "./model";
import view from "./view";

const controller = (() => {
  // ! Order of initialisation is important here
  model.initialiseBoards();
  view.initialiseBoards();
  view.initialiseShips(model.getBasicBoard(0), 0);
  view.initialiseShips(model.getBasicBoard(1), 1);
  const myShipCells = view.getMyShipCells();
  console.log("Initial board", model.getBasicBoard(0));

  function rotateShip(e) {
    // prevent user from changing ship configuration when game is ongoing
    if (model.gameStarted()) return;
    // get the index of the ship cell
    const shipCellPos = view.getCellIndex(e.target);
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
  // double click to rotate ships
  myShipCells.forEach((cell) => {
    cell.addEventListener("dblclick", rotateShip);
  });

  (function addDragAndDrop() {
    // implement drag and drop
    let draggedShipObj = null; // ship obj of ship currently being dragged
    // previous board cell on which user hovered on while dragging
    let previousBoardCellIndex = -1;

    myShipCells.forEach((cell) => {
      cell.addEventListener("dragstart", () => {
        // ! prevent user from changing ship configuration when game is ongoing
        if (model.gameStarted()) return;

        // get the index of the ship cell
        const shipCellPos = view.getCellIndex(cell);
        draggedShipObj = model.getShipObj(0, shipCellPos);

        // change color of dragged ship
        draggedShipObj.getCellPositions().forEach((pos) => {
          view.getShipCellElement(0, pos).classList.add("dragging");
        });

        console.log("Ship currently being dragged", draggedShipObj);
        console.log("dragstart", cell);
      });
    });

    // when drag ends
    myShipCells.forEach((cell) => {
      cell.addEventListener("dragend", () => {
        // ! prevent user from changing ship configuration when game is ongoing
        if (model.gameStarted()) return;
        console.log("stopped dragging", cell);

        // reset transparency of dragged ship
        draggedShipObj.getCellPositions().forEach((pos) => {
          view.getShipCellElement(0, pos).classList.remove("dragging");
        });

        view.toggleGhostShip(
          false,
          previousBoardCellIndex,
          draggedShipObj.size,
          draggedShipObj.isVertical
        );

        console.log(
          "basic board before change in ship pos",
          model.getBasicBoard(0)
        );

        // get new ship position
        console.log("new pos", previousBoardCellIndex);
        const intialCoords = draggedShipObj.getCellPositions();
        // try to move ship
        const boardChanged = model.moveShip(
          draggedShipObj.headPos,
          previousBoardCellIndex,
          0
        );

        if (boardChanged) {
          console.log(
            "basic board after change in ship pos",
            model.getBasicBoard(0)
          );
          // render changes to board
          const finalCoords = draggedShipObj.getCellPositions();
          for (let i = 0; i < finalCoords.length; i++) {
            view.moveShipCell(0, intialCoords[i], finalCoords[i]);
          }
          console.log("Rendered new ship on board");
        }
        draggedShipObj = null;
      });
    });

    for (let pos = 0; pos < Board.BOARD_SIZE * Board.BOARD_SIZE; pos++) {
      const cell = view.getBoardCellElement(0, pos);
      cell.addEventListener("dragover", () => {
        // ! prevent user from changing ship configuration when game is ongoing
        if (model.gameStarted()) return;

        // remove previous ghost ship from board
        if (previousBoardCellIndex >= 0 && previousBoardCellIndex !== pos) {
          view.toggleGhostShip(
            false,
            previousBoardCellIndex,
            draggedShipObj.size,
            draggedShipObj.isVertical
          );
        }

        // add new ghost ship
        view.toggleGhostShip(
          true,
          pos,
          draggedShipObj.size,
          draggedShipObj.isVertical
        );
        previousBoardCellIndex = pos;
      });
    }
  })();

  function playComputerTurn() {
    if (model.getTurn()) return;
    const move = model.computerPlay();

    // display move of computer
    view.changeCellColor(
      view.getBoardCellElement(0, move),
      !model.isShip(0, move)
    );

    if (model.checkWinner()) {
      handleEndGame();
    } else {
      // computer's turn to play
      model.swapTurn();
      view.displayTurn(model.getTurn());
    }
  }

  function handleEndGame() {
    // winner found
    console.log("game ended");
    view.displayWinner(model.getTurn());

    // stop listening for user inputs
    view.getAllBoardCellElements().forEach((thiscell) => {
      thiscell.removeEventListener("click", playMyTurn);
    });

    // end game
    model.endGame();
  }

  function playMyTurn(e) {
    // check if it is actually my turn
    if (!model.getTurn()) return;

    const cellIndex = view.getCellIndex(e.target);
    const boardCell = view.getBoardCellElement(1, cellIndex);

    // check if i made a valid move
    const validMove = model.attackBoard(cellIndex);
    if (!validMove) return;

    view.changeCellColor(boardCell, !model.isShip(1, cellIndex));

    if (model.checkWinner()) {
      handleEndGame();
    } else {
      // computer's turn to play
      model.swapTurn();
      view.displayTurn(model.getTurn());
      playComputerTurn();
    }
  }

  view.getPlayButton().addEventListener(
    "click",
    () => {
      model.startGame();
      view.displayTurn(model.getTurn());
      view.changePlayButtonColour();

      view.getAllBoardCellElements().forEach((cell) => {
        cell.addEventListener("click", playMyTurn);
      });
    },
    { once: true }
  );
})();

export default controller;
