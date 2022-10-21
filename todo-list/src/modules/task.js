/**
 * A Task represents a to-do item and belongs to a single Project.
 */
export class Task {
    _title;
    _description;
    _priority;
    _duedate;
    _status;
    _id;
    static #priorityList = ['High 🔥', 'Medium 😶', 'Low 👶'];
    static #statusList = ['Next', 'In Progress', 'Completed'];

    /**
     * 
     * @param {string} title Brief title of to-do item
     * @param {string} description Brief description of to-do item
     * @param {string} priority Allowed values : ['High 🔥', 'Medium 😶', 'Low 👶']
     * @param {date} duedate A date object
     * @param {string} status Allowed values : ['Next', 'In Progress', 'Completed']
     * @param {integer} id Index of the Task in an array of Tasks.
     */
    constructor(title, description, priority, duedate, status, id) {
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._duedate = duedate;
        this._status = status;
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }

    set priority(priorityLevel) {
        this._priority = Task.getPriority(priorityLevel);
    }
    static getPriority(priorityLevel) {
        if (priorityLevel < 0 || priorityLevel >= this.#priorityList.length) return '❌ Invalid priority level';
        return this.#priorityList[priorityLevel];
    }
    get priority() {
        return this._priority;
    }
    getPriorityIndex() {
        return Task.#priorityList.indexOf(this._priority);
    }

    set duedate(duedate) {
        this._duedate = duedate;
    }
    get duedate() {
        return this._duedate;
    }

    set status(statusIndex) {
        this._status = Task.getStatus;
    }
    static getStatus(statusIndex) {
        if (statusIndex < 0 || statusIndex >= this.#statusList.length) return '❌ Invalid status level';
        return this.#statusList[statusIndex];
    }
    get status() {
        return this._status;
    }
    getStatusIndex() {
        return Task.#statusList.indexOf(this._status);
    }

    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }

}
