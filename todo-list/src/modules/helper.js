import { format, formatDistance } from 'date-fns';

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
 * Returns an HTML card with a todo item's details.
 * @param {Task} taskObj 
 * @returns {HTMLElement}
 */
export function createCardElement(taskObj) {
  const title = createHtmlElement('div', null, ['card-title'], taskObj.title, null);

  let priorityClass = ['card-priority', 'highlight'];
  let priorityLevel = taskObj.getPriorityIndex();
  if (priorityLevel == 0) {
    priorityClass.push('high-priority');
  }
  if (priorityLevel == 1) {
    priorityClass.push('medium-priority');
  }
  if (priorityLevel == 2) {
    priorityClass.push('low-priority');
  }

  const priority = createHtmlElement('div', null, priorityClass, taskObj.priority, null);

  const formattedDate = formatDistance(taskObj.duedate, new Date(), { addSuffix: true });
  const date = createHtmlElement('div', null, ['card-date'], formattedDate, null);
  const editBtn = createHtmlElement('i', null, ['fa-solid', 'fa-trash'], null, null);
  const editBtnContainer = createHtmlElement('div', null, ['delete-btn'], null, [editBtn]);
  return createHtmlElement('div', null, ['card'], null, [title, priority, date, editBtnContainer]);
}

export function createSidebarProjectElement(projectObj){
  const titleContainer = createHtmlElement('div', null, ['project-title'], projectObj.title, null);
  const deleteIcon = createHtmlElement('i', null, ['fa-solid', 'fa-trash'], null, null);
  const deleteIconContainer = createHtmlElement('div', null, ['delete-btn'], null, [deleteIcon]);
  const listItem = createHtmlElement('li', null, null, null, [titleContainer, deleteIconContainer]);
  return listItem;
}