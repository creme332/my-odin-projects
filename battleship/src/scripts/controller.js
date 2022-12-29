import Board from "./board";
import model from "./model";
import view from "./view";

const controller = (() => {
  view.initialiseBoards();
  view.initialiseShips(model.getBasicBoard(0), 0);
  view.initialiseShips(model.getBasicBoard(1), 1);
  console.log("Initial board", model.getBasicBoard(0));

  function rotateShip(e) {
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
  const myShipCells = view.getMyShipCells();
  myShipCells.forEach((cell) => {
    cell.addEventListener("dblclick", rotateShip);
  });

  // implement drag and drop
  let draggedShipObj = null; // ship obj of ship currently being dragged
  // previous board cell on which user hovered on while dragging
  let previousBoardCellIndex = -1;

  myShipCells.forEach((cell) => {
    cell.addEventListener("dragstart", () => {
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
      // remove current ghost ship from board
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

export default controller;
