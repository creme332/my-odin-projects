/**
 * A Project has zero or more Tasks objects and belongs to a single Library.
 */
export class Project {
    #tasksArray = [];
    _id; // index of Project in Library
    _title;

    /**
     * 
     * @param {string} title 
     * @param {integer} id Index of project in a Library array
     */
    constructor(title, id) {
        this._title = title;
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    addTask(taskObj) {
        this.#tasksArray.push(taskObj);
    }

    removeTask(taskIndex) {
        this.#tasksArray.splice(taskIndex, 1);
    }

    get tasks() {
        return this.#tasksArray;
    }

    get size() {
        return this.#tasksArray.length;
    }
}