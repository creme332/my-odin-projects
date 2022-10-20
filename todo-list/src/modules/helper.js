/**
 * Creates and returns an HTML element.
 * @param {string} type HTML type : div, nav, ul, ...
 * @param {string} id HTML ID
 * @param {[string]} arrayClasses 
 * @param {string} txtContent 
 * @param {[HTMLElement]} arrayChildren HTML elements which must be appended to newly created element
 * @returns {HTMLElement} HTML element
 */
export function createHtmlElement(type, id, arrayClasses, txtContent, arrayChildren) {
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
 * Returns an HTML card storing todo item main details.
 * @param {Task} cardObj 
 * @returns {HTMLElement}
 */
export function createCardElement(cardObj) {
  const title = createHtmlElement('div', null, ['card-title'], cardObj.title, null);

  let priorityClass = ['card-priority', 'highlight'];
  let priorityLevel = cardObj.getPriorityIndex();
  if (priorityLevel == 0) {
    priorityClass.push('high-priority');
  }
  if (priorityLevel == 1) {
    priorityClass.push('medium-priority');
  }
  if (priorityLevel == 2) {
    priorityClass.push('low-priority');
  }
  const priority = createHtmlElement('div', null, priorityClass, cardObj.priority, null);

  const date = createHtmlElement('div', null, ['card-date'], cardObj.duedate, null);
  const editBtn  = createHtmlElement('i',null,['fa-solid', 'fa-pen-to-square', 'edit-btn' ],null,null);
  return createHtmlElement('div', null, ['card'], null, [title, priority, date, editBtn]);
}