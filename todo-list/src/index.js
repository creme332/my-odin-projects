//import styles
import './reset.css';
import './styles.css';

// Boostrap imports
import { Offcanvas } from 'bootstrap';
import './scss/styles.scss'

//import my modules
import { Project } from './modules/project';
import { createHtmlElement, createCardElement } from './modules/helper';
import { format } from 'date-fns';
import { initialiseLibrary } from './modules/init';

//font-awesome-free
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new Offcanvas(offcanvasEl);
})

const lib = initialiseLibrary();


function initialiseSidebar() {
  //NOTE : DO NOT CALL THIS FUNCTION MORE THAN ONCE BECAUSE ANY EVENT LISTENERS ON SIDEBAR WILL BE REMOVED
  const list = document.querySelector('.offcanvas-body ul');

  //clear current items in sidebar
  list.querySelectorAll('li').forEach(i => i.remove());

  //add new items
  for (const project of lib.projects) {
    const titleContainer = createHtmlElement('div', null, ['project-title'], project.title, null);
    const deleteIcon = createHtmlElement('i', null, ['fa-solid', 'fa-trash'], null, null);
    const IconContainer = createHtmlElement('div', null, ['delete-btn'], null, [deleteIcon]);
    list.appendChild(createHtmlElement('li', null, null, null, [titleContainer, IconContainer]));
  }
}

function clearKanban() {
  //remove all cards
  document.querySelectorAll('.kanban-container .card')
    .forEach(card => card.remove());
}

function refreshCardsCounter() {
  //set all counters to 0
  const cols = document.querySelectorAll('.kanban-container .col');
  cols.forEach(col => {
    let count = col.querySelectorAll('.card').length;
    col.querySelector('.col-counter').textContent = count;
  })
}
function addCards(tasksArray) {
  const cols = document.querySelectorAll('.kanban-container .col');

  for (let task of tasksArray) {
    let colIndex = task.getStatusIndex();
    cols[colIndex].querySelector('.cards-container').appendChild(createCardElement(task));
  }
}

function updateProjectTitles(newProjectTitle) {
  document.querySelector('nav .project-title').textContent = newProjectTitle;
  document.querySelector('main .project-title').textContent = newProjectTitle;

}

function switchProject(e) {
  const list = document.querySelectorAll('#sidebar .project-list li');
  // console.log(e.target.nodeName);

  //get the LI element on which user clicked
  let liElement = e.target;

  if (e.target.nodeName != 'LI') { //user clicked on containers inside <li></li>
    if (e.target.nodeName == 'path') { //user clicked on delete icon
      return;
    }
    liElement = e.target.closest('li');
  }

  //get position of clicked project in Library
  let projectIndex = 0;
  // console.log(list[projectIndex]);
  while (!list[projectIndex].isEqualNode(liElement)) {
    projectIndex++;
  }
  console.log(projectIndex);
  const projectObj = lib.getProject(projectIndex);

  if (projectObj == activeProjectObj) { //user clicked on currently active project
    // console.log('no switch required');
    return;
  }
  clearKanban();
  addCards(projectObj.tasks)
  refreshCardsCounter()
  updateProjectTitles(projectObj.title)
  activeProjectObj = projectObj;
}

function deleteProject(e) {
  const list = document.querySelectorAll('#sidebar .project-list li');

  //get the LI element containing clicked button
  let liElement = e.target.closest('li');

  //get position of corresponding project in Library
  let projectIndex = 0;
  while (!list[projectIndex].isEqualNode(liElement)) {
    projectIndex++;
  }

  const projectToBeDeleted = lib.getProject(projectIndex);
  if (JSON.stringify(projectToBeDeleted) == JSON.stringify(activeProjectObj)) {
    clearKanban();
    refreshCardsCounter()
    activeProjectObj = new Project('❌ DELETED PROJECT', -1);
    updateProjectTitles('❌ DELETED PROJECT')
  }

  lib.removeProject(projectIndex);
  liElement.remove();
}

initialiseLibrary()
let activeProjectObj = lib.projects[0];

initialiseSidebar()
clearKanban()
addCards(activeProjectObj.tasks)
updateProjectTitles(activeProjectObj.title)
refreshCardsCounter()

document.querySelectorAll('#sidebar .project-list li').forEach(el => {
  el.addEventListener('click', switchProject);
})

document.querySelectorAll('#sidebar .project-list .delete-btn').forEach(el => {
  el.addEventListener('click', deleteProject);
})
