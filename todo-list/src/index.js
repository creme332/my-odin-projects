//import styles
import './reset.css';
import './styles.css';

// Boostrap imports
import { Offcanvas } from 'bootstrap';
import './scss/styles.scss'

import './assets/menu_FILL0_wght400_GRAD0_opsz48.svg'

//import my modules
import { Library } from './modules/library';
import { Project } from './modules/project';
import { Task } from './modules/task';
import { createHtmlElement, createCardElement } from './modules/helper';
import { format } from 'date-fns';


var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new Offcanvas(offcanvasEl);
})

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const lib = new Library('Main', 0);

function initialiseLibrary() {
  let project = new Project('🖥 Coding', lib.size);
  let task = new Task(
    '📃 Investigate issue',
    'Button in project-X is not working',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🐛 Fix bug in CSS',
    'blablabla',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🕷 Hire a web designer',
    'brrrrr haha lol',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(2),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🎃 Add feature',
    'blablabla',
    Task.getPriority(2),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  lib.addProject(project);

  project = new Project('🏠 Home', lib.size);

  task = new Task(
    '🚽 Clean toilet',
    'Clean room before mom gets home',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🍰 Buy groceries',
    'Clean room before mom gets home',
    Task.getPriority(2),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🙈 Wash face',
    'Clean room before mom gets home',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🚪 Buy a door handle',
    'Clean room before mom gets home',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🐢 Feed pet',
    'Clean room before mom gets home',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🛫 Clean air conditioner',
    'Clean room before mom gets home',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🎨 Paint walls of bathroom',
    'Clean room before mom gets home',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🧹 Clean room',
    'Clean room before mom gets home',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🔑 Search for missing key',
    'blablabla',
    Task.getPriority(2),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '💧 Wash dishes',
    'blablabla',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(2),
    project.size
  );
  project.addTask(task);

  lib.addProject(project);

  project = new Project('🎧 School', lib.size);
  task = new Task(
    '➕ Do math homework (page 112)',
    'blablabla',
    Task.getPriority(2),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🍏 Do physics homework (page 12)',
    'blablabla',
    Task.getPriority(0),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🙂 Send Mr John a reminder',
    'blablabla',
    Task.getPriority(2),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(2),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🤪 Learn Java',
    'Please',
    Task.getPriority(1),
    format(new Date(2014, 1, 11),
      'MM/dd/yyyy'),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  lib.addProject(project);
}

function refreshSidebar() {
  const list = document.querySelector('.offcanvas-body ul');

  //clear current items in sidebar
  list.querySelectorAll('li').forEach(i => i.remove());

  //add new items
  for (const project of lib.projects) {
    list.appendChild(createHtmlElement('li', null, null, project.title, null));
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
  document.querySelectorAll('.project-title').forEach(el => el.textContent = newProjectTitle);
}
function switchProject(e) {
  const list = document.querySelectorAll('#sidebar .project-list li');

  //get position of clicked project in Library
  let projectIndex = 0;
  while (!list[projectIndex].isEqualNode(e.target)) {
    projectIndex++;
  }
  console.log(projectIndex);

  const projectClass = lib.getProject(projectIndex);
  clearKanban();
  addCards(projectClass.tasks)
  refreshCardsCounter()
  updateProjectTitles(projectClass.title)
}
initialiseLibrary()
refreshSidebar()
clearKanban()
addCards(lib.projects[0].tasks)
refreshCardsCounter()

document.querySelectorAll('#sidebar .project-list li').forEach(el => {
  el.addEventListener('click', switchProject);
})
// console.log(lib.projects[0].tasks)