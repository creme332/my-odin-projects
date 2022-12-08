// import my styles
import "../styles/reset.css";
import "../styles/styles.css";
import "../styles/bebasneue.ttf";

// import Sortable from "sortablejs";

const view = (() => {
  const battlefields = document.getElementById("battlefields");
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

  /**
   * Returns a new 10x10 empty board.
   * @param {string} boardID
   * @returns
   */
  function getNewBoard(boardID) {
    const newBoard = createHtmlElement("table", boardID, ["board"], null, null);
    for (let row = 0; row < boardSize; row++) {
      const cellsArray = [];
      for (let col = 0; col < boardSize; col++) {
        const index = row * boardSize + col;
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
    battlefields.appendChild(myBoard);
    battlefields.appendChild(rivalBoard);
  }

  function changeCellColor(cell, missed = true){
    if(missed){
      cell.classList.add('missed-hit');
    }else{
      cell.classList.add('good-hit');
    }
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
        changeCellColor(e.target,false);
        const clickedCell = e.target.getAttribute('data-index');
        console.log(clickedCell);
      });
    });
  }

  return {
    initialiseBoards,
    displayGuess,
  };
})();

view.initialiseBoards();
view.displayGuess();
