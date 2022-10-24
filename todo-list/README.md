# 📝 Todo List
![HTML5 shield](https://img.shields.io/badge/-HTML5-blue)
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![CSS3 shield](https://img.shields.io/badge/-CSS3-orange)
![Webpack5 shield](https://img.shields.io/badge/-Webpack5-red)
![Bootstrap5 shield](https://img.shields.io/badge/-Bootstrap5-purple)

A simple to-do list.

![GIF]()

[▶ Live Preview](https://creme332.github.io/my-odin-projects/todo-list/dist)

# 🚀Features
- Sortable drag and drop to-do items
- Calendar view
- Kanban view
- Recurring due dates
- Expandable to-do items
- Priority levels
- Tasks can be grouped in projects

# 🕶 Usage
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

#  🛠 Installation
Clone repository locally
```bash
git clone git@github.com:creme332/my-odin-projects.git
```
Move to project directory
```
cd my-odin-projects/todo-list
```
Install dependencies
```bash
npm install
```
Launch web app in development mode 
```bash
npm start
```
# 📌 Attributions
Resource | For
---|---
[Notion To-do template](https://www.notion.so/templates/to-dos)| UI inspiration
[WebDevSimplified](https://www.youtube.com/watch?v=jfYWwQrtzzY&ab_channel=WebDevSimplified), [web.dev](https://web.dev/drag-and-drop/) | Sortable drag and drop feature

# 🔨 To-Do
- [ ] add a delete project/task confirmation message
- [ ] add sound effects : https://github.com/Melvin-Abraham/todomatic/tree/master/public
- [ ] add markdown renderer for comment section
- [ ] add sorting
- [ ] add filtering

- [ ] add start/end date for task 
- [ ] save comments to task object

- [ ] move classes to a folder
- [ ] update docstrings
- [ ] save data somewhere (firestore, local storage, google login)
- [ ] add login page


- [ ] Make website responsive.
- [ ] use project to track bugs with project itself.
- [ ] optimise bundling process (dupllicate imports?, import only used icons)
- [ ] create a release for project
- [ ] webpack visualiser https://web.dev/monitor-and-analyze/

### ✔ Done
- [x] make cards draggable : https://web.dev/drag-and-drop/
- [x] add calendar factory
- [x] add calendar : fullcalendar
- [x] add semicolons everywhere
- [x] feature : add new task
- [x] feature : add new project
- [x] console log in each function to explain what's happening
- [x] add helpers to create sidebar li with corresponding ev
- [x] bug : create new project. go to project. edit title. delete project. DELETED PROJECT does not appear.
- [x] update task ids when tasks are deleted
- [x] make project title editable
- [x] make cards editable and deletable
- [x] move card from one column to another when edited === switch project
- [x] remove card-id div
- [x] feature : expanded view of card onclick
- [x] fix class names id names
- [x]  do not call switch project if click on current project 
