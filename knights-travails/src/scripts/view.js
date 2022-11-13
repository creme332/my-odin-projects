import Sortable from "sortablejs";

const view = (() => {
  const board = document.querySelector("#board");
  const boardSize = 8;
  const horse = createHtmlElement("div", "horse", null, "🐴", null);
  const carrot = createHtmlElement("div", "carrot", null, "🥕", null);
  const playBtn = document.getElementById("play-btn");

  function getPlayButton(){
    return playBtn;
  }

  /**
   * Displays neighbours of a cell.
   * @param {List} neighbours List of neighbours at a particular point in time
   */
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
      } else {
        getCell(pos).classList.add("shortest");
      }
    }

    // move horse along shortest path
    for await (const position of shortestPathArray) {
      moveHorse(position);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  async function playMoves(shortestPathMoves, neighbours) {
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
    allCells.forEach((cell) => {
      cell.classList.remove("hide");
      cell.classList.remove("neighbour");
      cell.classList.remove("shortest");
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

  return {
    initialiseBoard,
    moveHorse,
    getHorsePosition,
    getCarrotPosition,
    playMoves,
    resetBoardColors,
    getPlayButton
  };
})();

export default view;
