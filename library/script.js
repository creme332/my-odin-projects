let myLibrary = [];
const table = document.querySelector("#library");

function Book(title, author, pages, progressPercent) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progressPercent = progressPercent;
}

function addToTable(bookObj) {
    let row = document.createElement("tr");

    // append first empty td for counter
    row.appendChild(document.createElement("td"));

    //add title
    let titleColumn = document.createElement("td");
    titleColumn.textContent = bookObj.title;
    row.appendChild(titleColumn);

    //add author name
    let authorColumn = document.createElement("td");
    authorColumn.textContent = bookObj.author;
    row.appendChild(authorColumn);

    //add page count
    let pageCol = document.createElement("td");
    pageCol.textContent = bookObj.pages;
    row.appendChild(pageCol);

    //add progress bar
    let progressColumn = document.createElement("td");
    let progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress");
    let progressBar = document.createElement('div');
    //add animation to progress bar
    const progressLoadingAnimation = [
        { width: `0%` },
        { width: `${parseInt(bookObj.progressPercent)}%` },
    ];
    const progressLoadingTiming = {
        duration: 2000,
        iterations: 1,
    }
    progressBar.animate(progressLoadingAnimation, progressLoadingTiming);
    progressBar.classList.add("progress-bar", "bg-success");
    progressBar.style.width = bookObj.progressPercent;
    progressBar.textContent = bookObj.progressPercent;
    progressBarContainer.appendChild(progressBar);
    progressColumn.appendChild(progressBarContainer);
    row.appendChild(progressColumn);


    //add buttons
    let actionColumn = document.createElement("td");

    let editBtn = document.createElement("button");
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-outline-secondary");
    editBtn.textContent = "Edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("btn", "btn-outline-danger");
    deleteBtn.textContent = "Delete";

    actionColumn.appendChild(editBtn);
    actionColumn.appendChild(deleteBtn);
    row.appendChild(actionColumn);

    table.appendChild(row);
}
const book1 = new Book('The Art of Problem Solving', 'Vladimir Putin', 123, '55%');
const book2 = new Book('The Great Alexander Falls', 'Alexander Arnold', 1102, '98%');

addToTable(book1);
addToTable(book2);