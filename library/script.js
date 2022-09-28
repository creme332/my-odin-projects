const emptyBook = new Book('Book', 'Author', 50, 100);
const book1 = new Book('The Art of Problem Solving', 'Vladimir Stewart', 123, 424);
const book2 = new Book('The Great Alexander Falls', 'Alexander Arnold', 2102, 3213);
const book3 = new Book('An Ideal House', 'Roland Yotube', 1102, 2132);

let myLibrary = [book1, book2, book3];
const tableBody = document.querySelector("#library").querySelector("tbody");
const addRowBtn = document.querySelector("#addRowBtn");
const searchBar = document.querySelector("#searchBar");
let rowCount = 0;

function Book(title, author, currentpage, totalpages) {
    this.title = title;
    this.author = author;
    this.currentpage = currentpage;
    this.totalpages = totalpages;
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
    // titleColumn.setAttribute("contenteditable","true")
    titleColumn.textContent = bookObj.title;
    row.appendChild(titleColumn);

    //add author name
    let authorColumn = document.createElement("td");
    authorColumn.textContent = bookObj.author;
    row.appendChild(authorColumn);

    //add current page count
    let currentpageCol = document.createElement("td");
    currentpageCol.textContent = bookObj.currentpage;
    row.appendChild(currentpageCol);

    //add total page count
    let totalpageCol = document.createElement("td");
    totalpageCol.textContent = bookObj.totalpages;
    row.appendChild(totalpageCol);

    //add progress bar
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


    //add buttons
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

function editRow(e) {
    function checkEditingMode(row) {
        const titleField = row.querySelectorAll('td')[1];
        return titleField.getAttribute('contenteditable') == 'true';
    }
    function toggleEditing(row, activateEditing) {
        const allFields = row.querySelectorAll("td");

        // make all fields editable except first and last 2 fields.
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
    console.log(percent);
}

addToTable(book1);
addToTable(book2);
addToTable(book3);

addRowBtn.addEventListener("click", () => { addToTable(emptyBook) });

//implement search bar
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
