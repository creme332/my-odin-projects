/**
 * A Library has zero or more Project objects. 
 */
 export class Library {
    #libraryArray = [];
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
        this.#libraryArray.push(projectObj);
    }

    removeProject(projectIndex){
        this.#libraryArray.splice(projectIndex, 1);
    }

    get projects(){
        return this.#libraryArray;
    }

    get size(){
        return this.#libraryArray.length;
    }
}