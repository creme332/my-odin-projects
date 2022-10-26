import Library from './library';
import Project from './project';
import Task from './task';

/**
 * Handles data storage and retrieval from localStorage
 */
const WebStorageAPI = (() => {
  const keyName = 'creme332-todo-project';

  /**
   * Saves current state of library to browser localStorage
   * @param {Library} libraryObj 
   */
  function save(libraryObj) {
    const stringJSON = JSON.stringify(libraryObj.getData());
    localStorage.setItem(keyName, stringJSON);
  }

  /**
   * Fetches library data from localStorage and returns it in the correct format.
   * @returns {Library} `Library` object containing `Project` and `Task` objects
   */
  function load() {
    const stringJSON = localStorage.getItem(keyName);

    // user is visiting website for the first time
    if (stringJSON === null) {
      return getSampleLibrary();
    }

    const LibraryJSON = JSON.parse(stringJSON || '[]');

    // if there are no projects, put a default project in library
    if (LibraryJSON['#projectsArray'].length === 0) {
      const libraryObj = new Library('Main', 0, [new Project('🎭 Untitled', 0)]);
      return libraryObj;
    }

    // Assign class objects to data in LibraryJSON
    const projectsArrayObj = [];
    LibraryJSON['#projectsArray'].forEach(projectJSON => {

      const tasksArrayObj = [];

      projectJSON['#tasksArray'].forEach(taskJSON => {
        const taskObj = Object.assign(new Task(), taskJSON);
        taskObj.duedate = new Date(taskObj.duedate); // duedate is initially serialized
        tasksArrayObj.push(taskObj);
      });

      const projectObj = new Project(projectJSON._title, parseInt(projectJSON._id, 10), tasksArrayObj);
      projectsArrayObj.push(projectObj);
    });

    const libraryObj = new Library('Main', 0, projectsArrayObj);

    return libraryObj;
  }

  return { save, load };
})();


/**
 * Returns a sample Library with projects and tasks. 
 * @returns { Library } A library object
 */
function getSampleLibrary() {
  const lib = new Library('Main', 0);

  let project = new Project('🖥 Coding', lib.size);
  let task = new Task(
    '📃 Investigate issue',
    'Button in project-X is not working',
    Task.getPriority(0),
    new Date(2022, 10, 11),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🐛 Fix bug in CSS',
    'blablabla',
    Task.getPriority(0),
    new Date(2022, 10, 12),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🕷 Hire a web designer',
    'brrrrr haha lol',
    Task.getPriority(1),
    new Date(2022, 10, 15),
    Task.getStatus(2),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🎃 Add feature',
    'blablabla',
    Task.getPriority(2),
    new Date(2022, 10, 15),
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
    new Date(2022, 10, 11),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🍰 Buy groceries',
    'Clean room before mom gets home',
    Task.getPriority(2),
    new Date(2022, 11, 11),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🙈 Wash face',
    'Clean room before mom gets home',
    Task.getPriority(1),
    new Date(2022, 11, 12),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🚪 Buy a door handle',
    'Clean room before mom gets home',
    Task.getPriority(1),
    new Date(2022, 11, 12),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🐢 Feed pet',
    'Clean room before mom gets home',
    Task.getPriority(0),
    new Date(2022, 11, 5),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🛫 Clean air conditioner',
    'Clean room before mom gets home',
    Task.getPriority(1),
    new Date(2022, 11, 5),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🎨 Paint walls of bathroom',
    'Clean room before mom gets home',
    Task.getPriority(0),
    new Date(2022, 11, 7),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🧹 Clean room',
    'Clean room before mom gets home',
    Task.getPriority(0),
    new Date(2022, 10, 17),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🔑 Search for missing key',
    'blablabla',
    Task.getPriority(2),
    new Date(2022, 10, 17),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '💧 Wash dishes',
    'blablabla',
    Task.getPriority(1),
    new Date(2022, 10, 25),
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
    new Date(2022, 11, 17),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🍏 Do physics homework (page 12)',
    'blablabla',
    Task.getPriority(0),
    new Date(2022, 11, 17),
    Task.getStatus(0),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🙂 Send Mr John a reminder',
    'blablabla',
    Task.getPriority(2),
    new Date(2022, 11, 17),
    Task.getStatus(2),
    project.size
  );
  project.addTask(task);

  task = new Task(
    '🤪 Learn Java',
    'Please',
    Task.getPriority(1),
    new Date(2022, 11, 17),
    Task.getStatus(1),
    project.size
  );
  project.addTask(task);

  lib.addProject(project);

  project = new Project('❓ Empty project', lib.size);
  lib.addProject(project);

  return lib;

}

export default WebStorageAPI;