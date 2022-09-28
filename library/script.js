let myLibrary = [];
const tableBody = document.querySelector("#library").querySelector("tbody");
const addRowBtn = document.querySelector("#addRowBtn")
let rowCount = 0;

function Book(title, author, pages, progressPercent) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progressPercent = progressPercent;
}

function addToTable(bookObj) {
    myLibrary.push(bookObj);

    let row = document.createElement("tr");

    // append first empty td for counter
    let counterCol = document.createElement("td");
    counterCol.textContent = rowCount;
    row.appendChild(counterCol);
    rowCount++;

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
    deleteBtn.classList.add("btn", "deletebtn", "btn-outline-danger");
    deleteBtn.textContent = "Delete";

    actionColumn.appendChild(editBtn);
    actionColumn.appendChild(deleteBtn);
    row.appendChild(actionColumn);

    tableBody.appendChild(row);
}

function RemoveFromTable(e) {
    const allRows = tableBody.querySelectorAll("tr");
    let currentRow = e.target.parentNode.parentNode;
    let rowIndex = parseInt(currentRow.querySelector("td").textContent);
    // console.log(rowIndex);

    //decrement row index of all rows after currentRow
    for (let i = rowIndex + 1; i < rowCount; i++) {
        let currentCounter = allRows[i].querySelector("td");
        currentCounter.textContent = i - 1;
    }
    rowCount--;

    //delete from myLibrary list
    myLibrary.splice(rowIndex, 1);

    //delete from DOM
    currentRow.parentNode.removeChild(currentRow);
}
const book1 = new Book('The Art of Problem Solving', 'Vladimir Putin', 123, '55%');
const book2 = new Book('The Great Alexander Falls', 'Alexander Arnold', 1102, '98%');
const book3 = new Book('The Ideal House', 'Alexander Arnold', 1102, '0%');

addToTable(book1);
addToTable(book2);
addToTable(book2);
addToTable(book3);

const deleteButtons = document.querySelectorAll(".deletebtn");
deleteButtons.forEach(btn => { btn.addEventListener("click", RemoveFromTable) });

addRowBtn.addEventListener("click", () => { addToTable(book1) });