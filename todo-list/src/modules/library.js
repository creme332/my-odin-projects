/**
 * A Library has zero or more Project objects. 
 */
 export class Library {
    #projectsArray = [];
    _id;
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

    addProject(projectObj){
        this.#projectsArray.push(projectObj);
    }

    removeProject(projectIndex){
        this.#projectsArray.splice(projectIndex, 1);
    }

    get projects(){
        return this.#projectsArray;
    }

    getProject(projectID){
        return this.#projectsArray[projectID];
    }

    get size(){
        return this.#projectsArray.length;
    }
}