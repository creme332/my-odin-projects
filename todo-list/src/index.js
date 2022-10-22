//import my styles
import './reset.css';
import './styles.css';

//import my modules
import { Project } from './modules/project';
import { createHtmlElement, createCardElement } from './modules/helper';
import { initialiseLibrary } from './modules/init';

// Boostrap imports
import { Offcanvas } from 'bootstrap';
import './scss/styles.scss';

//font-awesome-free imports
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

const controller = (() => {
  const lib = initialiseLibrary();
  let activeProjectObj = lib.projects[0];
  const expandedCardCanvas = document.querySelector('#expanded-card');

  /**
   * Initialises sidebar by adding project names and enabling Bootstrap. 
   * 
   * ⚠ Do not call this function more than once as it will ALL clear event listeners on the list items in sidebar.
   */
  function initialiseSidebar() {

    //Bootstrap code to enable sidebar
    var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
    var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
      return new Offcanvas(offcanvasEl);
    });

    const list = document.querySelector('#sidebar .offcanvas-body ul');

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
    // console.log(taskObj);

    //update library (when `activeProjectObj` is updated, `lib` is also updated)
    activeProjectObj.tasks[taskObj.id] = taskObj;
    console.log(lib);

    clearKanban();
    addKanbanCards(activeProjectObj.tasks)
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
    console.log('deleted task ', lib);
  }

  /**
   * Updates kanban by placing cards in their correct columns.
   * @param {[Task]} tasksArray A list of Task objects
   */
  function addKanbanCards(tasksArray) {
    const cols = document.querySelectorAll('.kanban-container .col');

    for (let task of tasksArray) {
      let colIndex = task.getStatusIndex();
      let cardElement = createCardElement(task);

      //add event listeners to card

      cardElement.addEventListener('click', openTask.bind(null, task));
      cardElement.querySelector('.delete-btn').addEventListener('click', deleteTask.bind(null, task));

      cols[colIndex].querySelector('.cards-container').appendChild(cardElement);
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
  function switchKanbanProject(e) {
    const list = document.querySelectorAll('#sidebar .project-list li');

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
    while (!list[projectIndex].isEqualNode(liElement)) {
      projectIndex++;
    }
    const projectObj = lib.getProject(projectIndex);

    if (projectObj == activeProjectObj) { //user clicked on currently active project
      return;
    }
    clearKanban();
    addKanbanCards(projectObj.tasks)
    refreshKanbanCardsCounter()
    updateHomepageProjectTitles(projectObj.title)
    activeProjectObj = projectObj;
  }

  /**
   * Deletes a project from sidebar and from library.
   * @param {Event} e click event on trash-icon in sidebar
   */
  function deleteKanbanProject(e) {
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
      refreshKanbanCardsCounter()
      activeProjectObj = new Project('❌ DELETED PROJECT', -1);
      updateHomepageProjectTitles('❌ DELETED PROJECT')
    }

    lib.removeProject(projectIndex);
    liElement.remove();
  }

  function makeCardEditable(e) {
    const card = e.target.closest('.card');
    card.setAttribute('contenteditable', 'true');
    card.focus();

    //when card loses focus, make card uneditable
    card.addEventListener('blur', function (evt) {
      card.removeAttribute('contenteditable');
    }, { once: true });
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

  initialiseSidebar()
  addKanbanCards(activeProjectObj.tasks)
  updateHomepageProjectTitles(activeProjectObj.title)
  refreshKanbanCardsCounter()

  document.querySelectorAll('#sidebar .project-list li').forEach(el => {
    el.addEventListener('click', switchKanbanProject);
  })

  document.querySelectorAll('#sidebar .project-list .delete-btn').forEach(el => {
    el.addEventListener('click', deleteKanbanProject);
  });

  const mainTitle = document.querySelector('main .project-title');

  function changeProjectTitle() {
    console.log('title changed');
    let newTitle = mainTitle.textContent;
    updateHomepageProjectTitles(newTitle);
    //update project title in sidebar
    const projectItemInSidebar = document.querySelectorAll('#sidebar .project-list li')[activeProjectObj.id];
    projectItemInSidebar.textContent = newTitle;
    activeProjectObj.title = newTitle;
  }

  listenCardChanges(mainTitle, changeProjectTitle);

  function addNewProject() {
    const emptyProject = new Project('🎭 Untitled', lib.size);
    lib.addProject(emptyProject);

    const titleContainer = createHtmlElement('div', null, ['project-title'], emptyProject.title, null);
    const deleteIcon = createHtmlElement('i', null, ['fa-solid', 'fa-trash'], null, null);
    const IconContainer = createHtmlElement('div', null, ['delete-btn'], null, [deleteIcon]);
    const row = createHtmlElement('li', null, null, null,
    [titleContainer, IconContainer]);
    document.querySelector('#sidebar .project-list').appendChild(row);
    row.addEventListener('click', switchKanbanProject);
    IconContainer.addEventListener('click', deleteKanbanProject);
  }


  document.querySelector('#sidebar .new-row')
    .addEventListener('click', addNewProject);



})();
