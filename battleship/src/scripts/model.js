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

export default model;
