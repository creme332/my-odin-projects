// import my styles
import "../styles/reset.css";
import "../styles/styles.css";
import "../styles/bebasneue.ttf";

// import Sortable from "sortablejs";

const view = (() => {
  const myBoard = document.getElementById("myBoard");
  const rivalBoard = document.getElementById("rivalBoard");
  const boardSize = 10;

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

  function createMyBoard() {
    for (let row = 0; row < boardSize; row++) {
      const cellsArray = [];
      for (let col = 0; col < boardSize; col++) {
        const cell = createHtmlElement("td", null, null, null, null);
        cellsArray.push(cell);
      }
      const rowElement = createHtmlElement("tr", null, null, null, cellsArray);
      myBoard.appendChild(rowElement);
    }

    const x = [...myBoard.querySelectorAll("td")];
    x[0].classList.add("missed-hit");
    x[3].classList.add("missed-hit");

    x[10].classList.add("good-hit");
    x[20].classList.add("good-hit");
    x[30].classList.add("good-hit");
    console.log(x);
  }

  function createRivalBoard() {
    for (let row = 0; row < boardSize; row++) {
      const cellsArray = [];
      for (let col = 0; col < boardSize; col++) {
        const cell = createHtmlElement("td", null, null, null, null);
        cellsArray.push(cell);
      }
      const rowElement = createHtmlElement("tr", null, null, null, cellsArray);
      rivalBoard.appendChild(rowElement);
    }
  }
  return {
    createMyBoard,
    createRivalBoard,
  };
})();

view.createMyBoard();
view.createRivalBoard();
