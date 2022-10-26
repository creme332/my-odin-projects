/**
 * A Library has zero or more Project objects. 
 * 
 */
class Library {
    _id; // index of current Library in some other array. 

    #projectsArray;

    _title;

    /**
     * 
     * @param {string} title 
     * @param {integer} id Index of library
     */
    constructor(title, id, projectsArray = []) {
        this._title = title;
        this._id = id;
        this.#projectsArray = projectsArray;
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
        for (let id = 0; id < this.size; id += 1) {
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

    /**
     * Returns all data contained in `Library` in JSON format.
     * @returns {JSON}
     */
    getData() {
        const object = {
            "_id": this.id,
            "_title": this.title,
            "#projectsArray": [],
        };

        this.#projectsArray.forEach(project => {
            object["#projectsArray"].push(project.getData());
        });

        return object;
    }
}

export default Library;