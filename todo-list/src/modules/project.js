/**
 * A Project has zero or more Tasks objects and belongs to a single Library.
 */
export class Project {
    _id; // index of Project in Library
    #tasksArray;
    _title;

    /**
     * 
     * @param {string} title 
     * @param {integer} id Index of project in a Library array
     */
    constructor(title, id, tasksArray = []) {
        this._title = title;
        this._id = id;
        this.#tasksArray = tasksArray;
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
        this.#updateTaskIds();
    }

    #updateTaskIds() {
        for (let id = 0; id < this.size; id++) {
            this.#tasksArray[id].id = id;
        }
    }

    get tasks() {
        return this.#tasksArray;
    }

    get size() {
        return this.#tasksArray.length;
    }

    /**
     * Returns all data contained in `Project` in JSON format.
     * @returns {JSON}
     */
    getData() {
        let object = {
            "_id": this.id,
            "_title": this.title,
            "#tasksArray": this.#tasksArray
        };
        return object;
    }
}