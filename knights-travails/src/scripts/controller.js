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
    console.log(shortestPath);
    view.playMoves(shortestPath, neighbours);
  }
  return { animate };
})();

export default controller;
