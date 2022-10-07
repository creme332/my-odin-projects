class Book {
    constructor(title, author, currentpage, totalpages) {
        this.title = title;
        this.author = author;
        this.currentpage = currentpage;
        this.totalpages = totalpages;
    }
}

class Library {
    #BooksArray = []; // array of Book objects
    #localStorageKey = 'myLibrary';

    constructor() {
        //Initialise BooksArray with data from localStorage 

        // localStorage data is initially in JSON format
        let JSON_Library = localStorage.getItem(this.#localStorageKey);

        //check if user is a first-time user
        if(JSON_Library === null){
            //Initialise library with some books
            const book1 = new Book('The Art of Problem Solving', 'Vladimir Stewart', 123, 424);
            const book2 = new Book('The Great Alexander Falls', 'Alexander Arnold', 2102, 3213);
            const book3 = new Book('An Ideal House', 'Roland Youtube', 1102, 2132);
            this.#BooksArray = [book1, book2, book3];
            this.backup();
            return;
        }

        // convert JSON to an array of objects
        let objectsArray = JSON.parse( JSON_Library || '[]');

        //if library is empty, do nothing
        if (objectsArray.length == 0) { 
            return;
        }

        // convert objects to Book objects and push to booksArray
        objectsArray.forEach(obj => {
            let bookObj = Object.assign(new Book(), obj);
            this.#BooksArray.push(bookObj);
        });
    };

    addBook(bookObj) {
        this.#BooksArray.push(bookObj);

        //backup changes 
        this.backup();
    };

    removeBook(bookIndex) {
        this.#BooksArray.splice(bookIndex, 1);

        //backup changes 
        this.backup();
    };

    editBook(index, updatedBookObj){
        this.#BooksArray[index] = updatedBookObj;

        //backup changes 
        this.backup();
    }

    get size(){
        return this.#BooksArray.length;
    }

    get books() {
        return this.#BooksArray;
    };

    backup() {
        localStorage.setItem(this.#localStorageKey, this.to_json);
    };
    
    get to_json(){
        //get library in JSON format
        return JSON.stringify(this.#BooksArray);
    }
};

const myLibrary = new Library();

const GUI = (() => {
    const tableBody = document.querySelector("#library").querySelector("tbody");
    const addRowBtn = document.querySelector("#addRowBtn");
    const searchBar = document.querySelector("#searchBar");

    (function initialiseTable(){
        let rowIndex = 0;
        myLibrary.books.forEach(book=>{
            displayBook(book, rowIndex);
            rowIndex++;
        })
    })();

    function displayBook(bookObj, rowIndex) {
    
        //create a new row for table with all information
        let row = document.createElement("tr");
    
        // add row counter to row
        let counterCol = document.createElement("td");
        counterCol.textContent = rowIndex;
        row.appendChild(counterCol);
    
        //add title to row
        let titleColumn = document.createElement("td");
        let t = document.createElement("input");
        // titleColumn.appendChild(t);
        titleColumn.textContent = bookObj.title;
        row.appendChild(titleColumn);
    
        //add author name to row
        let authorColumn = document.createElement("td");
        authorColumn.textContent = bookObj.author;
        row.appendChild(authorColumn);
    
        //add current page count to row
        let currentpageCol = document.createElement("td");
        currentpageCol.textContent = bookObj.currentpage;
        row.appendChild(currentpageCol);
    
        //add total page count to row
        let totalpageCol = document.createElement("td");
        totalpageCol.textContent = bookObj.totalpages;
        row.appendChild(totalpageCol);
    
        //add progress bar to row
        let progressColumn = document.createElement("td");
        let progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress");
        let progressBar = document.createElement('div');
        const percentCompleted = parseInt(bookObj.currentpage / bookObj.totalpages * 100);
        //add animation to progress bar
        const progressLoadingAnimation = [
            { width: `0%` },
            { width: `${percentCompleted}%` },
        ];
        const progressLoadingTiming = {
            duration: 2000,
            iterations: 1,
        }
        progressBar.animate(progressLoadingAnimation, progressLoadingTiming);
        progressBar.classList.add("progress-bar", "bg-success");
        progressBar.style.width = `${percentCompleted}%`;
        progressBar.textContent = `${percentCompleted}%`;
        progressBarContainer.appendChild(progressBar);
        progressColumn.appendChild(progressBarContainer);
        row.appendChild(progressColumn);
    
    
        //add buttons to row
        let actionColumn = document.createElement("td");
    
        let editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.classList.add("btn", "editbtn", "btn-outline-secondary");
        editBtn.textContent = "Edit";
    
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("btn", "deletebtn", "btn-outline-danger");
        deleteBtn.textContent = "Delete";
    
        actionColumn.appendChild(editBtn);
        actionColumn.appendChild(deleteBtn);
        row.appendChild(actionColumn);
    
        tableBody.appendChild(row);
    
        // update progress bar when page fields are updated
        currentpageCol.addEventListener("input", updateProgressBar);
        totalpageCol.addEventListener("input", updateProgressBar);
    
        // add event listeners to buttons
        deleteBtn.addEventListener("click", RemoveFromTable);
        editBtn.addEventListener("click", editRow);
    }
    
    function RemoveFromTable(e) {
        const allRows = tableBody.querySelectorAll("tr");
        let currentRow = e.target.parentNode.parentNode;
        let rowIndex = parseInt(currentRow.querySelector("td").textContent);
    
        //decrement row index of all rows after currentRow
        for (let i = rowIndex + 1; i < myLibrary.size; i++) {
            let currentCounter = allRows[i].querySelector("td");
            currentCounter.textContent = i - 1;
        }
        rowIndex--;

        //delete from myLibrary list
        myLibrary.removeBook(rowIndex);
    
        //delete from DOM
        currentRow.parentNode.removeChild(currentRow);
    }
    
    function refreshLibraryArray(rowElement) {
        //call this function when Edit button is toggled off to
        // update contents of myLibrary with user input
    
        const rowIndex = parseInt(rowElement.querySelector('td').textContent);
        const allFields = rowElement.querySelectorAll("td");
        const newAuthor = allFields[1].textContent;
        const newTitle = allFields[2].textContent;
        const newCurrentPage = allFields[3].textContent;
        const newTotalPage = allFields[4].textContent;
    
        myLibrary.editBook(rowIndex, new Book(newAuthor, newTitle, newCurrentPage, newTotalPage));
    }

    function editRow(e) {
        function checkEditingMode(row) {
            const titleField = row.querySelectorAll('td')[1];
            return titleField.getAttribute('contenteditable') == 'true';
        }
        function toggleEditing(row, activateEditing) {
            const allFields = row.querySelectorAll("td");
    
            // make fields 2-5 editable.
            for (let i = 1; i < allFields.length - 2; i++) {
                f = allFields[i];
                if (activateEditing) {
                    f.setAttribute("contenteditable", true);
                } else {
                    f.setAttribute("contenteditable", false);
                }
            }
        }
        let currentRow = e.target.parentNode.parentNode;
        const activeEditingBGColor = "#6c757d";
        const activeEditingColor = "white";
    
        const InactiveEditingBGColor = "transparent";
        const InactiveEditingColor = "#6c757d";
    
        if (checkEditingMode(currentRow)) {
            //turn off editing
            e.target.style.color = InactiveEditingColor;
            e.target.style.backgroundColor = InactiveEditingBGColor;
            toggleEditing(currentRow, false);
            refreshLibraryArray(currentRow);
    
        } else {
            //turn on editing
    
            //change color of edit button
            e.target.style.color = activeEditingColor;
            e.target.style.backgroundColor = activeEditingBGColor;
    
            toggleEditing(currentRow, true);
        }
    }

    function updateProgressBar(e) {
        let currentRow = e.target.parentNode;
        let fields = currentRow.querySelectorAll('td');
        let currentpg = Math.max(0, parseInt(fields[3].textContent));
        let totalpg = Math.max(0, parseInt(fields[4].textContent));
        let progressbar = fields[5].querySelector('.progress-bar');
        const percent = Math.min(100, parseInt(100 * currentpg / totalpg));
        progressbar.style.width = `${percent}%`;
        progressbar.textContent = `${percent}%`;
    }
    
    addRowBtn.addEventListener("click", () => {
        const emptyBook = new Book('Book', 'Author', 50, 100);
        myLibrary.addBook(emptyBook);
        displayBook(emptyBook, myLibrary.size-1);
    });
    
    //implement search bar : https://stackoverflow.com/a/51187875/17627866
    searchBar.addEventListener('keyup', () => {
        const trs = tableBody.querySelectorAll('tr');
        const filter = searchBar.value;
        const regex = new RegExp(filter, 'i');
        const isFoundInTds = td => regex.test(td.innerHTML);
        const isFound = childrenArr => childrenArr.some(isFoundInTds);
        const setTrStyleDisplay = ({ style, children }) => {
            style.display = isFound([
                ...children // <-- All columns
            ]) ? '' : 'none'
        };
        trs.forEach(setTrStyleDisplay);
    });
    
})();
