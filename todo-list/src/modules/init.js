//import my modules
import { Library } from './library';
import { Project } from './project';
import { Task } from './task';
import { format } from 'date-fns';


export function initialiseLibrary() {
    const lib = new Library('Main', 0);
  
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
  
    project = new Project('❓ Empty project', lib.size);
    lib.addProject(project);
  
    return lib;
  
  }