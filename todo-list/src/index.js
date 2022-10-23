//import my styles
import './reset.css';
import './styles.css';

//import my modules
import { Project } from './modules/project';
import { Task } from './modules/task';
import { createCardElement, createSidebarProjectElement } from './modules/helper';
import { initialiseLibrary } from './modules/init';

// Boostrap imports
import { Offcanvas } from 'bootstrap';
import './scss/styles.scss';

//font-awesome-free imports
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

//fullcalendar
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { format } from 'date-fns';

const controller = (() => {
  const lib = initialiseLibrary();
  let activeProjectObj = lib.projects[0];
  const expandedCardCanvas = document.querySelector('#expanded-card');

  /** Adds a single project of list type  with event listeners to sidebar.
   * 
   * @param {Project} projectObj 
   */
  function addProjectToSidebar(projectObj) {
    const list = document.querySelector('#sidebar .offcanvas-body .project-list');
    const projectElement = createSidebarProjectElement(projectObj);
    list.appendChild(projectElement);

    //add event listeners
    projectElement.addEventListener('click', switchKanbanProject.bind(null, projectObj));
    projectElement.
      querySelector('.delete-btn').
      addEventListener('click', deleteProject.bind(null, projectObj));
  }

  /** Adds a single to-do item with event listeners to kanban-container.
   * 
   * @param {Task} taskObj 
   */
  function addCardToKanban(taskObj) {
    const allCols = document.querySelectorAll('.kanban-container .col');

    let cardElement = createCardElement(taskObj);
    allCols[taskObj.getStatusIndex()].querySelector('.cards-container').appendChild(cardElement);

    cardElement.addEventListener('click', openTask.bind(null, taskObj));
    cardElement.querySelector('.delete-btn').addEventListener('click', deleteTask.bind(null, taskObj));

  }

  /**
   * Initialises sidebar by adding project names and enabling Bootstrap. 
   * 
   * ⚠ Do not call this function more than once as it will ALL clear event listeners on the list items in sidebar.
   */
  function initialiseSidebar() {
    for (const projectObj of lib.projects) {
      addProjectToSidebar(projectObj);
    }
  }

  /**
   * Removes all cards from Kanban container.
   */
  function clearKanban() {
    //remove all cards
    document.querySelectorAll('.kanban-container .card')
      .forEach(card => card.remove());
  }

  /**
   * Updates the card counters in each column of the kanban container.
   */
  function refreshKanbanCardsCounter() {
    //set all counters to 0
    const cols = document.querySelectorAll('.kanban-container .col');
    cols.forEach(col => {
      let count = col.querySelectorAll('.card').length;
      col.querySelector('.col-counter').textContent = count;
    })
  }

  function updateTask(taskObj, e) {
    console.log('UPDATED task ');

    taskObj.title = expandedCardCanvas.querySelector('.offcanvas-body h1').textContent;
    taskObj.status = expandedCardCanvas.querySelector('#statusGroup').value;
    taskObj.priority = expandedCardCanvas.querySelector('#priorityGroup').value;
    taskObj.description = expandedCardCanvas.querySelector('#description').value;

    //update library (when `activeProjectObj` is updated, `lib` is also updated)
    activeProjectObj.tasks[taskObj.id] = taskObj;
    console.log(lib);

    clearKanban();
    addKanbanCards(activeProjectObj.tasks);
    refreshKanbanCardsCounter();
  }

  function openTask(taskObj, e) {
    console.log('OPENED task ');

    expandedCardCanvas.querySelector('.offcanvas-body h1').textContent = taskObj.title;

    // unselect any previous dropdown options
    expandedCardCanvas.querySelectorAll('option').forEach(i => {
      i.removeAttribute('selected');
    });

    //fill offcanvas with task details
    const statusDropdownItems = expandedCardCanvas.querySelectorAll('#statusGroup option');
    statusDropdownItems[taskObj.getStatusIndex()].setAttribute('selected', 'selected');
    const priorityDropdownItems = expandedCardCanvas.querySelectorAll('#priorityGroup option');
    priorityDropdownItems[taskObj.getPriorityIndex()].setAttribute('selected', 'selected');
    expandedCardCanvas.querySelector('#description').value = taskObj.description;
    expandedCardCanvas.querySelector('#dueDate').valueAsDate = taskObj.duedate;

    //open offcanvas
    new Offcanvas(expandedCardCanvas).show();

    //add event listener for when expanded card view is closed => editing mode is off
    expandedCardCanvas.addEventListener('hidden.bs.offcanvas', updateTask.bind(null, taskObj), { once: true });
  }

  function deleteTask(taskObj, e) {
    e.stopPropagation();
    activeProjectObj.removeTask(taskObj.id);
    e.target.closest('.card').remove();
    refreshKanbanCardsCounter();
    console.log('DELETE task ', lib);
  }

  /**
   * Updates kanban by placing cards in their correct columns.
   * @param {[Task]} tasksArray A list of Task objects
   */
  function addKanbanCards(tasksArray) {
    const cols = document.querySelectorAll('.kanban-container .col');

    for (let task of tasksArray) {
      addCardToKanban(task);
    }
  }

  /**
   * Updates project title being displayed on page.
   * @param {String} newProjectTitle 
   */
  function updateHomepageProjectTitles(newProjectTitle) {
    document.querySelector('nav .project-title').textContent = newProjectTitle;
    document.querySelector('main .project-title').textContent = newProjectTitle;
  }

  /**
   * Changes from one project to another.
   * @param {Event} e click event on a list item in sidebar
   * @returns 
   */
  function switchKanbanProject(projectObj, e) {
    if (projectObj == activeProjectObj) { //user clicked on currently active project
      return;
    }
    clearKanban();
    addKanbanCards(projectObj.tasks);
    refreshKanbanCardsCounter();
    updateHomepageProjectTitles(projectObj.title);
    activeProjectObj = projectObj;
  }

  /**
   * Deletes a project from sidebar and from library.
   * @param {Project} projectObj Project to be deleted
   * @param {Event} e click event on trash-icon in sidebar
   */
  function deleteProject(projectObj, e) {
    e.stopPropagation(); //to prevent expanded-card from opening

    //get the LI element containing clicked button
    let liElement = e.target.closest('li');

    console.log('must delete this project : ', projectObj);
    console.log('active project', activeProjectObj);

    if (JSON.stringify(projectObj) == JSON.stringify(activeProjectObj)) {
      clearKanban();
      refreshKanbanCardsCounter();
      activeProjectObj = new Project('❌ DELETED PROJECT', -1);
      updateHomepageProjectTitles('❌ DELETED PROJECT');
    }

    lib.removeProject(projectObj.id);
    liElement.remove();
    console.log('Deleted project', lib);
  }

  function listenCardChanges(div, listener) {
    console.log('title changed');
    div.addEventListener("blur", listener);
    div.addEventListener("keyup", listener);
    div.addEventListener("paste", listener);
    div.addEventListener("copy", listener);
    div.addEventListener("cut", listener);
    div.addEventListener("delete", listener);
    // div.addEventListener("mouseup", listener);

  }

  function changeProjectTitle() {

    //if currently on a deleted project, do nothing.
    if (activeProjectObj.id < 0) return;

    console.log('title changed');
    let newTitle = mainTitle.textContent;
    updateHomepageProjectTitles(newTitle);

    //update project title in sidebar
    const projectTitleContainer = document.
      querySelectorAll('#sidebar .project-list li')[activeProjectObj.id].
      querySelector('.project-title');
    projectTitleContainer.textContent = newTitle;

    activeProjectObj.title = newTitle;
  }

  function createNewProject() {
    const emptyProject = new Project('🎭 Untitled', lib.size);
    lib.addProject(emptyProject);
    addProjectToSidebar(emptyProject);
  }

  function createTask(e) {
    //do not create task on deleted project "screen"
    if (activeProjectObj.id < 0) return;

    console.log('CREATE task');

    //find index of column where new task must be inserted
    const allCols = document.querySelectorAll('.kanban-container .col');
    const col = e.target.closest('.col');
    let colIndex = 0;
    while (!col.isEqualNode(allCols[colIndex])) {
      colIndex++;
    }

    const emptyTask = new Task(
      '💋 Untitled',
      'A description',
      Task.getPriority(2),
      new Date(),
      Task.getStatus(colIndex),
      activeProjectObj.size);

    activeProjectObj.addTask(emptyTask);
    addCardToKanban(emptyTask);
    refreshKanbanCardsCounter();

    console.log(lib);
  }

  initialiseSidebar();
  addKanbanCards(activeProjectObj.tasks);
  updateHomepageProjectTitles(activeProjectObj.title);
  refreshKanbanCardsCounter();

  const mainTitle = document.querySelector('main .project-title');
  listenCardChanges(mainTitle, changeProjectTitle);

  document.querySelector('#sidebar .new-row')
    .addEventListener('click', createNewProject);

  //Bootstrap code to enable offcanvas element
  let offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
  offcanvasElementList.map(function (offcanvasEl) {
    return new Offcanvas(offcanvasEl);
  });

  document.querySelectorAll('.kanban-container .new-row')
    .forEach(btn => {
      btn.addEventListener('click', createTask);
    });

    function toggleViews(){
      document.querySelector('.kanban-container').classList.toggle('hide');
      document.querySelector('#calendar').classList.toggle('hide');
      document.querySelector('#kanban-view-btn').classList.toggle('selected-view');
      document.querySelector('#calendar-view-btn').classList.toggle('selected-view');
    }
  document.querySelector('#calendar-view-btn')
  .addEventListener('click',()=>{
    if(document.querySelector('#calendar').classList.contains('hide')){
      toggleViews();
      calendarFactory.renderCalendar(activeProjectObj.tasks);
    }
  });

  document.querySelector('#kanban-view-btn')
  .addEventListener('click',()=>{
    if(document.querySelector('.kanban-container').classList.contains('hide')){
      toggleViews();
    }
  })
})();


const calendarFactory = (()=>{
  const calendarEl = document.getElementById('calendar');

  function parseEvents(tasksArray){
    let eventList = [];
    for (let task of tasksArray){
      let obj = {
        "title": task.title,
        "start": format(task.duedate, "yyyy-MM-dd"),
        "classNames" : [],
      };
      if(task.getPriorityIndex()==0){
        obj.classNames = ['high-priority'];
      }
      if(task.getPriorityIndex()==1){
        obj.classNames = ['medium-priority'];
      }
      if(task.getPriorityIndex()==2){
        obj.classNames = ['low-priority'];
      }
      eventList.push(obj);
    }
    console.log(eventList);
    return eventList;
  }

  function renderCalendar(tasksArray){
    const calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: parseEvents(tasksArray)
    });
  
    calendar.render();
  }
  return { renderCalendar };
})();
