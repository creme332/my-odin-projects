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

/** Returns `<img></img>` with some optional parameters.
 * 
 * @param {string} src source path
 * @param {string} alt alternative text
 * @param {[string]} arrayClasses array of classes
 * @param {[HTMLElement]} arrayChildren array of HTML children
 * @returns 
 */
export function createImgElement(src, alt, arrayClasses, arrayChildren) {
  const Img = new Image();
  Img.src = src;
  Img.alt = alt;

  if (arrayClasses)
    arrayClasses.forEach((myClass) => Img.classList.add(myClass));

  if (arrayChildren) {
    arrayChildren.forEach((child) => Img.appendChild(child));
  }

  return Img;
}