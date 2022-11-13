// import my styles
import "./reset.css";
import "./styles.css";
import Sortable from "sortablejs";

const model = (() => {
  const neighbourStorage = (() => {
    const storage = [];
    function empty() {
      storage.splice(0, storage.length);
    }
    function save(list) {
      storage.push(list);
    }
    function output() {
      console.log(JSON.stringify(storage));
    }
    function get() {
      return storage;
    }
    return { empty, save, output, get };
  })();

  function knightMoves(start, end) {
    function getNeighbours(nodeIndex) {
      const dx = [-1, -1, -2, -2, 1, 1, 2, 2]; // change in row
      const dy = [-2, 2, -1, 1, 2, -2, 1, -1]; // change in col
      const x = parseInt(nodeIndex / 8, 10);
      const y = nodeIndex % 8;
      const neighbours = [];

      for (let i = 0; i < dx.length; i++) {
        const xx = x + dx[i];
        const yy = y + dy[i];

        // skip invalid coordinates
        if (!(xx < 0 || yy < 0 || xx > 7 || yy > 7)) {
          neighbours.push(8 * xx + yy);
        }
      }

      return neighbours;
    }

    if (start === end) {
      return [start];
    }

    const queue = [start]; // stores next node to be visited
    const visited = new Set(queue); // stores indices of nodes that have already been visited.
    const distanceFromStart = new Map([[start, 0]]); // distanceFromStart.get(nodeIndex) : shortest distance from start to node is k units.
    const parent = new Map([[start, -1]]); // parent.get(nodeIndex2) = nodeIndex1 : node1 is the parent of node2 for shortest path from start -> end.
    let done = false;

    while (queue.length > 0 && !done) {
      // get first element of queue and pop it.
      const currentPosition = queue.shift();

      // get unvisited neighbours of current
      const unvisitedNeighbours = getNeighbours(currentPosition).filter(
        (el) => !visited.has(el)
      );
      neighbourStorage.save(unvisitedNeighbours);
      console.log(unvisitedNeighbours);
      unvisitedNeighbours.forEach((nextPosition) => {
        visited.add(nextPosition);
        queue.push(nextPosition);
        distanceFromStart.set(
          nextPosition,
          1 + distanceFromStart.get(currentPosition)
        );
        parent.set(nextPosition, currentPosition);

        // optional optimisation : end loop as soon as we encounter destination
        if (nextPosition === end) done = true;
      });
    }

    // get all nodes from start -> end
    const path = []; // array of coordinates
    let current = end;
    while (current !== -1) {
      path.unshift(current);
      current = parent.get(current);
    }
    return path;
  }

  return { knightMoves, neighbourStorage };
})();

const view = (() => {
  const board = document.querySelector("#board");
  const boardSize = 8;
  const horse = createHtmlElement("div", "horse", null, "🐴", null);
  const carrot = createHtmlElement("div", "carrot", null, "🥕", null);
  const playBtn = document.getElementById("play-btn");

  playBtn.addEventListener("click", () => {
    resetBoardColors();
    model.neighbourStorage.empty();

    const moves = model.knightMoves(getHorsePosition(), getCarrotPosition());
    console.log(moves);
    playMoves(moves);
  });

  function showNeighbour(neighbours) {
    neighbours.forEach((n) => {
      getCell(n).classList.add("neighbour");
    });
  }

  async function traceWinningPath(shortestPathArray) {

    // hide cells not on shortest path and highlight shortest path
    for (let pos = 0; pos < boardSize * boardSize; pos++) {
      if (!shortestPathArray.includes(pos)) {
        getCell(pos).classList.add("hide");
      }else{
        getCell(pos).classList.add("shortest");
      }
    }

    // move horse along shortest path
    for await (const position of shortestPathArray) {
      moveHorse(position);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  async function playMoves(shortestPathMoves) {
    const neighbours = model.neighbourStorage.get();
    console.log("Minimum number of moves :", shortestPathMoves.length - 1);

    for await (const currentNeighbour of neighbours) {
      showNeighbour(currentNeighbour);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    traceWinningPath(shortestPathMoves);
  }

  function getCell(position) {
    const allCells = board.querySelectorAll(".droppable");
    return allCells[position];
  }

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

  function initialiseBoard() {
    for (let row = 0; row < boardSize; row++) {
      const cellsArray = [];
      for (let col = 0; col < boardSize; col++) {
        const index = 8 * row + col;
        const cell = createHtmlElement("td", null, ["droppable"], null, null);
        cell.setAttribute("data-index", index);
        cellsArray.push(cell);
        Sortable.create(cell, {
          group: "cell",
          emptyInsertThreshold: 0, // px, distance mouse must be from empty sortable to insert drag element into it
        });
      }
      const rowElement = createHtmlElement("tr", null, null, null, cellsArray);
      board.appendChild(rowElement);
    }
    board.querySelector(".droppable").appendChild(horse);
    board.querySelector(".droppable:nth-child(6)").appendChild(carrot);
  }

  /**
   * Resets board to its intial colours.
   */
  function resetBoardColors() {
    const allCells = board.querySelectorAll(".droppable");
    allCells.forEach(cell=>{
      cell.classList.remove('hide');
      cell.classList.remove('neighbour');
      cell.classList.remove('shortest');
    });
  }

  function moveHorse(newPositionIndex) {
    getCell(newPositionIndex).appendChild(horse);
  }

  function getHorsePosition() {
    const cell = horse.closest("td");
    return parseInt(cell.getAttribute("data-index"), 10);
  }

  function getCarrotPosition() {
    const cell = carrot.closest("td");
    return parseInt(cell.getAttribute("data-index"), 10);
  }

  return { initialiseBoard, moveHorse, getHorsePosition, getCarrotPosition };
})();

view.initialiseBoard();

const controller = (() => {})();
// model.neighbourStorage.output()
// model.neighbourStorage.save([1,2,3])
// model.neighbourStorage.output()
// model.neighbourStorage.save([5])
// model.neighbourStorage.output()
// model.neighbourStorage.empty()
// model.neighbourStorage.output()
