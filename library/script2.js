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
    const progressLoadingTiming = {duration: 2000, iterations: 1};

    (function initialiseTable(){
        let rowIndex = 0;
        myLibrary.books.forEach(book=>{
            displayBook(book, rowIndex);
            rowIndex++;
        })
    })();

    function displayBook(bookObj, rowIndex) {
        let tempNode = document.querySelector("#row-template").cloneNode(true);
        tempNode.removeAttribute('id');

        tempNode.querySelector('.row-counter').textContent = rowIndex;
        tempNode.querySelector('.row-title').textContent = bookObj.title;
        tempNode.querySelector('.row-author').value = bookObj.author;
        tempNode.querySelector('.row-currentpg').value = bookObj.currentpage;
        tempNode.querySelector('.row-totalpg').value = bookObj.totalpages;

        let progressBarContainer = tempNode.querySelector('.progress');
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
            const titleField = row.querySelector('.row-title');
            return titleField.getAttribute('disabled') == 'true';
        }
        function toggleEditing(row, activateEditing) {
            const allFields = row.querySelectorAll("td");
    
            // make fields 2-5 editable.
            for (let i = 1; i < allFields.length - 2; i++) {
                f = allFields[i];
                if (activateEditing) {
                    f.removeAttribute('disabled');
                } else {
                    f.setAttribute("disabled", true);
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
