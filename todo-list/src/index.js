// import my styles
import './reset.css';
import './styles.css';

// Boostrap imports
import { Offcanvas, Dropdown } from 'bootstrap';
import './scss/styles.scss';

// import my modules
import Project from './modules/project';
import Task from './modules/task';
import { createCardElement, createSidebarProjectElement } from './modules/helper';
import WebStorageAPI from './modules/storage';
import htmlFactory from './modules/htmlFactory';
import expandedCard from './modules/expandedcard';
import calendarFactory from './modules/calendar';

// font-awesome-free imports
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

(function controller() {
  const lib = WebStorageAPI.load();
  let activeProjectObj = lib.projects[0];
  let draggedTaskObj; // task object of card currently being dragged
  const mainTitle = document.querySelector('main .project-title');

  /** Adds a single project of list type  with event listeners to sidebar.
   *
   * @param {Project} projectObj
   */
  function addProjectToSidebar(projectObj) {
    const list = htmlFactory.getSidebarProjectList();
    const projectElement = createSidebarProjectElement(projectObj);
    list.appendChild(projectElement);

    // add event listeners
    projectElement.addEventListener('click', switchKanbanProject.bind(null, projectObj));
    projectElement
      .querySelector('.delete-btn')
      .addEventListener('click', deleteProject.bind(null, projectObj));
  }

  /** Adds a single to-do item with event listeners to kanban-container.
   *
   * @param {Task} taskObj
   */
  function addCardToKanban(taskObj) {
    const allCols = htmlFactory.getKanbanCols();

    const cardElement = createCardElement(taskObj);
    allCols[taskObj.getStatusIndex()].querySelector('.cards-container').appendChild(cardElement);

    cardElement.addEventListener('click', openTask.bind(null, taskObj));
    cardElement.querySelector('.delete-btn').addEventListener('click', deleteTask.bind(null, taskObj));

    // add event listeners for drag and drop feature
    cardElement.addEventListener('dragstart', () => {
      draggedTaskObj = taskObj;
      console.log('drag start', draggedTaskObj);
      cardElement.classList.add('dragging');
    });

    cardElement.addEventListener('dragend', () => {
      draggedTaskObj = {};
      console.log('drag end', draggedTaskObj);
      cardElement.classList.remove('dragging');
    });
  }

  /**
   * Initialises sidebar by adding project names and enabling Bootstrap.
   *
   * ⚠ Do not call this function more than once as it will
   * clear ALL event listeners on the list items in sidebar.
   */
  function initialiseSidebar() {
    lib.projects.forEach((projectObj) => {
      addProjectToSidebar(projectObj);
    });
  }

  /**
   * Removes all cards from Kanban container.
   */
  function clearKanban() {
    // remove all cards
    document.querySelectorAll('.kanban-container .card')
      .forEach((card) => card.remove());
  }

  /**
   * Updates the card counters in each column of the kanban container.
   */
  function refreshKanbanCardsCounter() {
    // set all counters to 0
    const cols = htmlFactory.getKanbanCols();
    cols.forEach((col) => {
      const count = col.querySelectorAll('.card').length;
      col.querySelector('.col-counter').textContent = count;
    });
  }

  function updateTask(taskObj) {
    console.log('UPDATED task ');

    taskObj.title = expandedCard.getTitle();
    taskObj.status = expandedCard.getStatus();
    taskObj.priority = expandedCard.getPriority();
    taskObj.description = expandedCard.getDescription();
    taskObj.duedate = expandedCard.getDueDate();

    console.log(lib);

    clearKanban();
    addKanbanCards(activeProjectObj.tasks);
    refreshKanbanCardsCounter();
  }

  function openTask(taskObj) {
    console.log('OPENED task ');

    // fill expanded card with task details
    expandedCard.setTitle(taskObj.title);
    expandedCard.setStatus(taskObj.getStatusIndex());
    expandedCard.setPriority(taskObj.getPriorityIndex());
    expandedCard.setDueDate(taskObj.duedate);
    expandedCard.setDescription(taskObj.description);

    // open expanded view of card
    expandedCard.show();

    // add event listener for when expanded card view is closed => editing mode is off
    expandedCard.getElement()
      .addEventListener(
        'hidden.bs.offcanvas',
        updateTask.bind(null, taskObj),
        { once: true },
      );
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
    tasksArray.forEach(task => {
      addCardToKanban(task);
    });
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
  function switchKanbanProject(projectObj) {
    if (projectObj === activeProjectObj) { // user clicked on currently active project
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
    e.stopPropagation(); // to prevent expanded-card from opening

    // get the LI element containing clicked button
    const liElement = e.target.closest('li');

    console.log('must delete this project : ', projectObj);
    console.log('active project', activeProjectObj);

    if (JSON.stringify(projectObj) === JSON.stringify(activeProjectObj)) {
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
    div.addEventListener('blur', listener);
    div.addEventListener('keyup', listener);
    div.addEventListener('paste', listener);
    div.addEventListener('copy', listener);
    div.addEventListener('cut', listener);
    div.addEventListener('delete', listener);
    // div.addEventListener("mouseup", listener);
  }

  function changeProjectTitle() {
    // if currently on a deleted project, do nothing.
    if (activeProjectObj.id < 0) return;

    console.log('title changed');
    const newTitle = mainTitle.textContent;
    updateHomepageProjectTitles(newTitle);

    // update project title in sidebar
    const projectTitleContainer = document
      .querySelectorAll('#sidebar .project-list li')[activeProjectObj.id]
      .querySelector('.project-title');
    projectTitleContainer.textContent = newTitle;

    activeProjectObj.title = newTitle;
  }

  function createNewProject() {
    const emptyProject = new Project('🎭 Untitled', lib.size);
    lib.addProject(emptyProject);
    addProjectToSidebar(emptyProject);
  }

  function createTask(colIndex) {
    // do not create task on deleted project "screen"
    if (activeProjectObj.id < 0) return;

    console.log('CREATE task');

    const emptyTask = new Task(
      '💋 Untitled',
      'A description',
      Task.getPriority(2),
      new Date(),
      Task.getStatus(colIndex),
      activeProjectObj.size,
    );

    activeProjectObj.addTask(emptyTask);
    addCardToKanban(emptyTask);
    refreshKanbanCardsCounter();

    console.log(lib);
  }

  function toggleViews() {
    document.querySelector('.kanban-container').classList.toggle('hide');
    document.querySelector('#calendar').classList.toggle('hide');
    document.querySelector('#kanban-view-btn').classList.toggle('selected-view');
    document.querySelector('#calendar-view-btn').classList.toggle('selected-view');
  }

  function dragFeature() {
    const containers = document.querySelectorAll('.col');

    function getColumnIndex(col) {
      let columnIndex = 0;
      while (!containers[columnIndex].isEqualNode(col)) {
        columnIndex += 1;
      }
      return columnIndex;
    }

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function addDraggedElementToColumn(columnElement, e) {
      e.preventDefault();
      // console.log('drag over');

      const draggedElement = document.querySelector('.dragging');
      const cardsContainer = columnElement.querySelector('.cards-container');
      const afterElement = getDragAfterElement(cardsContainer, e.clientY);
      draggedTaskObj.status = Task.getStatus(getColumnIndex(columnElement));

      if (afterElement == null) {
        cardsContainer.appendChild(draggedElement);
      } else {
        cardsContainer.insertBefore(draggedElement, afterElement);
      }
      refreshKanbanCardsCounter();
    }

    containers.forEach((col) => {
      col.addEventListener('dragover', addDraggedElementToColumn.bind(null, col));
    });

  }

  dragFeature();
  initialiseSidebar();
  addKanbanCards(activeProjectObj.tasks);
  updateHomepageProjectTitles(activeProjectObj.title);
  refreshKanbanCardsCounter();

  listenCardChanges(mainTitle, changeProjectTitle);

  document.querySelector('#sidebar .new-row')
    .addEventListener('click', createNewProject);

  // Bootstrap code to enable offcanvas elements
  const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
  offcanvasElementList.map((offcanvasEl) => new Offcanvas(offcanvasEl));
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  [...dropdownElementList].map((dropdownToggleEl) => new Dropdown(dropdownToggleEl));

  // add event listeners to add tasks in kanban
  const addButtons = document.querySelectorAll('.kanban-container .new-row');
  for (let col = 0; col < addButtons.length; col += 1) {
    const btn = addButtons[col];
    btn.addEventListener('click', createTask.bind(null, col));
  }

  // add event listeners to switch between calendar and kanban
  calendarFactory.getButton()
    .addEventListener('click', () => {
      if (document.querySelector('#calendar').classList.contains('hide') && activeProjectObj.id >= 0) {
        toggleViews();
        calendarFactory.renderCalendar(activeProjectObj.tasks);
      }
    });
  document.querySelector('#kanban-view-btn')
    .addEventListener('click', () => {
      if (document.querySelector('.kanban-container').classList.contains('hide')) {
        toggleViews();
      }
    });

  // save changes to library every 1s
  setInterval(() => {
    WebStorageAPI.save(lib);
    // console.log(lib);
  }, 1000);
})();
