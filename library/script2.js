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
        if (JSON_Library === null) {
            //Initialise library with some books
            const book1 = new Book('The Art of Problem Solving', 'Vladimir Stewart', 123, 424);
            const book2 = new Book('The Great Alexander Falls', 'Alexander Arnold', 2102, 3213);
            const book3 = new Book('An Ideal House', 'Roland Youtube', 1102, 2132);
            this.#BooksArray = [book1, book2, book3];
            this.backup();
            return;
        }

        // convert JSON to an array of objects
        let objectsArray = JSON.parse(JSON_Library || '[]');

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

    editBook(index, updatedBookObj) {
        this.#BooksArray[index] = updatedBookObj;

        //backup changes 
        this.backup();
    }

    get size() {
        return this.#BooksArray.length;
    }

    get books() {
        return this.#BooksArray;
    };

    backup() {
        localStorage.setItem(this.#localStorageKey, this.to_json);
    };

    get to_json() {
        //get library in JSON format
        return JSON.stringify(this.#BooksArray);
    }
};

const myLibrary = new Library();

const GUI = (() => {
    const tableBody = document.querySelector("#library").querySelector("tbody");
    const addNewRowBtn = document.querySelector("#addRowBtn");
    const searchBar = document.querySelector("#searchBar");
    const progressLoadingTiming = { duration: 2000, iterations: 1 };

    (function initialiseTable() {
        let rowIndex = 0;
        myLibrary.books.forEach(book => {
            displayBook(book, rowIndex);
            rowIndex++;
        })
    })();

    function displayBook(bookObj, rowIndex) {
        let tempNode = document.querySelector("#row-template").cloneNode(true);
        tempNode.removeAttribute('id');

        tempNode.querySelector('.row-counter').textContent = rowIndex;
        tempNode.querySelector('.row-title').value = bookObj.title;
        tempNode.querySelector('.row-author').value = bookObj.author;
        tempNode.querySelector('.row-currentpg').value = bookObj.currentpage;
        tempNode.querySelector('.row-totalpg').value = bookObj.totalpages;

        let progressBar = tempNode.querySelector('.progress-bar.bg-success');
        const percentCompleted = parseInt(bookObj.currentpage / bookObj.totalpages * 100);

        progressBar.style.width = `${percentCompleted}%`;
        progressBar.textContent = `${percentCompleted}%`;

        //add animation to progress bar
        const progressLoadingAnimation = [
            { width: `0%` },
            { width: `${percentCompleted}%` },
        ];
        progressBar.animate(progressLoadingAnimation, progressLoadingTiming);

        tableBody.appendChild(tempNode);

        // update progress bar when page fields are updated
        tempNode.querySelector('.row-currentpg').addEventListener("input", updateProgressBar);
        tempNode.querySelector('.row-totalpg').addEventListener("input", updateProgressBar);

        // add event listeners to buttons
        tempNode.querySelector('.deletebtn').addEventListener("click", RemoveFromTable);
        tempNode.querySelector('.editbtn').addEventListener("click", editRow);
    };

    function RemoveFromTable(e) {
        const allRows = tableBody.querySelectorAll("tr");
        let currentRow = e.target.closest("tr");
        let rowIndex = parseInt(currentRow.querySelector(".row-counter").textContent);

        //decrement row index of all rows after currentRow
        for (let i = rowIndex + 1; i < myLibrary.size; i++) {
            let currentCounter = allRows[i].querySelector("td");
            currentCounter.textContent = i - 1;
        }

        //delete book object from myLibrary 
        myLibrary.removeBook(rowIndex);

        //delete from DOM
        tableBody.removeChild(currentRow);
    };

    function refreshLibraryArray(rowElement) {
        //call this function when Edit button is toggled off to
        // update contents of myLibrary with user input

        const rowIndex = parseInt(rowElement.querySelector('.row-counter').textContent);
        const newAuthor = rowElement.querySelector('.row-author').value;
        const newTitle = rowElement.querySelector('.row-title').value;
        const newCurrentPage = rowElement.querySelector('.row-currentpg').value;
        const newTotalPage = rowElement.querySelector('.row-totalpg').value;

        myLibrary.editBook(rowIndex, new Book(newTitle, newAuthor, newCurrentPage, newTotalPage));
    };

    function toggleEditing(row, activateEditing) {

        //change color of edit button
        const editBtn = row.querySelector('.editbtn');
        const activeEditingBGColor = "#6c757d";
        const activeEditingColor = "white";
        const InactiveEditingBGColor = "transparent";
        const InactiveEditingColor = "#6c757d";

        if (!activateEditing) {
            editBtn.style.color = InactiveEditingColor;
            editBtn.style.backgroundColor = InactiveEditingBGColor;
        } else {
            editBtn.style.color = activeEditingColor;
            editBtn.style.backgroundColor = activeEditingBGColor;
        }

        //make input fields editable if needed
        const InputFields = row.querySelectorAll(".input-field");
        InputFields.forEach(f => {
            if (activateEditing) {
                f.removeAttribute('disabled');
            } else {
                f.setAttribute("disabled", true);
            }
        });

        //toggle resize of textarea
        const textAreaBoxes = row.querySelectorAll('textarea');
        textAreaBoxes.forEach(f => {
            if (activateEditing) {
                f.style.resize = 'auto';
            } else {
                f.style.resize = 'none';
            }
        });
    };

    function isValidRow(rowElement) {
        const currentPgInput = rowElement.querySelector('.row-currentpg');
        const totalPgInput = rowElement.querySelector('.row-totalpg');

        const newCurrentPage = parseInt(currentPgInput.value);
        const newTotalPage = parseInt(totalPgInput.value);

        if (newCurrentPage > newTotalPage) {
            currentPgInput.setCustomValidity("Current page must be less than or equal to total pages.");
            totalPgInput.setCustomValidity("Current page must be less than or equal to total pages.");
            currentPgInput.reportValidity();
            totalPgInput.reportValidity();
            return false;
        }
        if (newCurrentPage < 0) {
            currentPgInput.setCustomValidity("Value must be greater than or equal to 0.");
            currentPgInput.reportValidity();
            return false;
        }
        if (totalPgInput < 1) {
            totalPgInput.setCustomValidity("Value must be greater than or equal to 1.");
            totalPgInput.reportValidity();
            return false;
        }

        return true;
    };

    function editRow(e) {
        function isRowEditable(row) {
            const titleField = row.querySelector('.row-title');
            return !titleField.hasAttribute('disabled');
        }

        let currentRow = e.target.closest("tr");

        if (isRowEditable(currentRow)) {
            if (isValidRow(currentRow)) {
                //turn off editing
                toggleEditing(currentRow, false);

                //update library
                refreshLibraryArray(currentRow);
            };

        } else {
            //turn on editing
            toggleEditing(currentRow, true);
        };
    }

    function updateProgressBar(e) {
        let currentRow = e.target.closest("tr");

        let currentpg = parseInt(currentRow.querySelector('.row-currentpg').value);
        let totalpg = parseInt(currentRow.querySelector('.row-totalpg').value);

        if (isValidRow(currentRow)) {
            let progressbar = currentRow.querySelector('.progress-bar');
            const percent = Math.min(100, parseInt(100 * currentpg / totalpg));
            progressbar.style.width = `${percent}%`;
            progressbar.textContent = `${percent}%`;
        };
    };

    function getAllRowElements() {
        return tableBody.querySelectorAll('tr:not(#row-template)'); //exclude template row
    };

    addNewRowBtn.addEventListener("click", () => {
        const emptyBook = new Book('', '', 50, 100);
        myLibrary.addBook(emptyBook);
        displayBook(emptyBook, myLibrary.size - 1);

        //make a newly added row editable
        let lastRow = getAllRowElements()[myLibrary.size - 1];
        toggleEditing(lastRow, true);
    });

    searchBar.addEventListener('keyup', () => {
        const trs = getAllRowElements();
        const books = myLibrary.books;
        const filter = searchBar.value;
        const regex = new RegExp(filter, 'i');

        for (let i = 0; i < myLibrary.size; i++) {
            let book = books[i];
            let row = trs[i];

            if (regex.test(book.title) || regex.test(book.author)) { // row contains filter
                row.style.display = '';
            } else {
                row.style.display = 'none';
            };
        };
    });

})();
