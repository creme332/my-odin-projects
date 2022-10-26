import { Offcanvas } from 'bootstrap';

/**
 * Module which controls everything about the expanded card when a task is clicked on.
 */
export const expandedCard = (() => {
    const card = document.querySelector('#expanded-card');
    const cardBody = card.querySelector('.offcanvas-body');

    function resetOptions(dropdownListItems) {
        // unselect items
        dropdownListItems.forEach(i => {
            i.removeAttribute('selected');
        });
    }

    /**
     * 
     * @returns {HTMLElement} html element of card
     */
    function getElement() {
        return card;
    }

    /**
     * 
     * @returns {string}
     */
    function getTitle() {
        return cardBody.querySelector('h1').textContent;
    }

    /**
     * 
     * @returns {string}
     */
    function getPriority() {
        return cardBody.querySelector('#priorityGroup').value;
    }

    /**
    * 
    * @returns {string}
    */
    function getStatus() {
        return cardBody.querySelector('#statusGroup').value;
    }

    /**
     * 
     * @returns {string}
     */
    function getDescription() {
        return cardBody.querySelector('#description').value;
    }

    /**
     * 
     * @returns {Date}
     */
    function getDueDate() {
        return cardBody.querySelector('#dueDate').valueAsDate;
    }

    /**
     * 
     * @param {string} title 
     */
    function setTitle(title) {
        cardBody.querySelector('h1').textContent = title;
    }

    /**
     * 
     * @param {integer} priorityIndex 
     */
    function setPriority(priorityIndex) {
        const priorityDropdownItems = cardBody.querySelectorAll('#priorityGroup option');
        resetOptions(priorityDropdownItems);
        priorityDropdownItems[priorityIndex].setAttribute('selected', 'selected');
    }

    /**
     * 
     * @param {integer} statusIndex 
     */
    function setStatus(statusIndex) {
        const statusDropdownItems = cardBody.querySelectorAll('#statusGroup option');
        resetOptions(statusDropdownItems);
        statusDropdownItems[statusIndex].setAttribute('selected', 'selected');
    }

    /**
     * 
     * @param {string} description 
     */
    function setDescription(description) {
        cardBody.querySelector('#description').value = description;
    }

    /**
     * 
     * @param {Date} duedate 
     */
    function setDueDate(duedate) {
        cardBody.querySelector('#dueDate').valueAsDate = duedate;
    }

    /**
     * Opens expanded card
     */
    function show() {
        new Offcanvas(card).show();
    }

    return {
        getDescription, getPriority, getStatus, getTitle, getDueDate,
        setDescription, setDueDate, setPriority, setStatus, setTitle,
        show, getElement,
    };
})();