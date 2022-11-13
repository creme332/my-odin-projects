// import my scripts
import view from "./view";
import model from "./model";

const controller = (() => {
  view.getPlayButton().addEventListener("click", () => {
    controller.animate();
  });

  function animate() {
    view.resetBoardColors();
    model.neighbourStorage.empty();

    const shortestPath = model.knightMoves(
      view.getHorsePosition(),
      view.getCarrotPosition()
    );
    const neighbours = model.neighbourStorage.get();
    console.log(
      prettyPrintPath(
        view.getHorsePosition(),
        view.getCarrotPosition(),
        shortestPath
      )
    );
    view.playMoves(shortestPath, neighbours);
  }

  function prettyPrintPath(start, end, shortestPath) {
    function indexToCoordinates(index) {
      const row = parseInt(index / 8, 10);
      const col = parseInt(index % 8, 10);
      return [row, col];
    }
    const startCoordinate = JSON.stringify(indexToCoordinates(start));
    const endCoordinate = JSON.stringify(indexToCoordinates(end));
    let str = `${startCoordinate} -> ${endCoordinate} in ${
      shortestPath.length - 1
    } moves:\n`;

    const coordinatesList = [];
    shortestPath.forEach((i) => {
      coordinatesList.push(indexToCoordinates(i));
    });
    str += JSON.stringify(coordinatesList);
    return str;
  }
  return { animate };
})();

export default controller;
