const htmlFactory = (() => {
    const kanbanContainer = document.querySelector('main .kanban-container');
    const sidebarBody = document.querySelector('#sidebar .offcanvas-body');

    function getSidebarProjectList() {
        return sidebarBody.querySelector('.project-list');
    }

    function getSidebarProjectListItems() {
        return sidebarBody.querySelectorAll('.project-list li');
    }

    function getKanbanCols() {
        return kanbanContainer.querySelectorAll('.col');
    }

    function setNavProjectTitle(newProjectTitle) {
        document.querySelector('nav .project-title').textContent = newProjectTitle;
    }

    function setMainProjectTitle(newProjectTitle) {
        document.querySelector('main .project-title').textContent = newProjectTitle;
    }

    function getMainProjectTitleElement() {
        return document.querySelector('main .project-title');
    }

    return {
        getKanbanCols, getSidebarProjectList, getSidebarProjectListItems,
        setNavProjectTitle, setMainProjectTitle, getMainProjectTitleElement
    };
})();

export default htmlFactory;
