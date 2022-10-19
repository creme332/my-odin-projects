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
   
    /**
     * 
     * @param {string} title Brief title of to-do item
     * @param {string} description Brief description of to-do item
     * @param {string} priority Allowed values : `High🔥`,  `Medium`, `Low`
     * @param {date} duedate A date object
     * @param {string} status Allowed values : `Next`,  `In Progress`, `Completed`
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

    set priority(priority) {
        this._priority = priority;
    }
    get priority() {
        return this._priority;
    }

    set duedate(duedate) {
        this._duedate = duedate;
    }
    get duedate() {
        return this._duedate;
    }

    set status(status) {
        this._status= status;
    }
    get status() {
        return this._status;
    }

    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }

}

// let task1 = new Task('title1', 'dsad', 'High', '12/3/3', 'Next', 1);
// console.log(task1);