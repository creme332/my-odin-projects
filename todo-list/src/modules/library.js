/**
 * A Library has zero or more Project objects. 
 * 
 */
export class Library {
    #projectsArray = [];
    _id; // index of current Library in some other array. 
    _title;

    /**
     * 
     * @param {string} title 
     * @param {integer} id Index of library
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

    addProject(projectObj) {
        this.#projectsArray.push(projectObj);
    }
    /**
     * Removes a project from Library and updates IDs of all other projects.
     * @param {Integer} projectIndex ID of project to be deleted
     */
    removeProject(projectIndex) {
        this.#projectsArray.splice(projectIndex, 1);
        this.#updateProjectIds();
    }

    #updateProjectIds() {
        for (let id = 0; id < this.size; id++) {
            this.#projectsArray[id].id = id;
        }
    }

    get projects() {
        return this.#projectsArray;
    }

    getProject(projectID) {
        return this.#projectsArray[projectID];
    }

    get size() {
        return this.#projectsArray.length;
    }
}