import model from "./model";
import view from "./view";

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

export default controller;
