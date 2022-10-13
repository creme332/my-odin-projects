/**
 * Creates and returns an HTML element
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