import { Offcanvas } from 'bootstrap';

export const htmlFactory = (() => {
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


    return { getKanbanCols };
})();

export const expandedCard = (() => {
    const card = document.querySelector('#expanded-card');
    const cardBody = card.querySelector('.offcanvas-body');

    function resetOptions(dropdownListItems) {
        // unselect items
        dropdownListItems.forEach(i => {
            i.removeAttribute('selected');
        });
    }

    function getElement() {
        return card;
    }

    function getTitle() {
        return cardBody.querySelector('h1').textContent;
    }

    function getPriority() {
        return cardBody.querySelector('#priorityGroup').value;
    }

    function getStatus() {
        return cardBody.querySelector('#statusGroup').value;
    }

    function getDescription() {
        return cardBody.querySelector('#description').value;
    }

    function getDueDate(duedate) {
        return cardBody.querySelector('#dueDate').valueAsDate;
    }

    function setTitle(title) {
        cardBody.querySelector('h1').textContent = title;
    }

    function setPriority(priorityIndex) {
        const priorityDropdownItems = cardBody.querySelectorAll('#priorityGroup option');
        resetOptions(priorityDropdownItems);
        priorityDropdownItems[priorityIndex].setAttribute('selected', 'selected');
    }

    function setStatus(statusIndex) {
        const statusDropdownItems = cardBody.querySelectorAll('#statusGroup option');
        resetOptions(statusDropdownItems);
        statusDropdownItems[statusIndex].setAttribute('selected', 'selected');
    }

    function setDescription(description) {
        cardBody.querySelector('#description').value = description;
    }

    function setDueDate(duedate) {
        cardBody.querySelector('#dueDate').valueAsDate = duedate;
    }

    function show() {
        new Offcanvas(card).show();
    }

    return {
        getDescription, getPriority, getStatus, getTitle, getDueDate,
        setDescription, setDueDate, setPriority, setStatus, setTitle,
        show, getElement,
    };
})();