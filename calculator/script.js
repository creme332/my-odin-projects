const abacus = document.querySelector(".abacus");
const numberOfColumns = 2;
const beadsPerColumn = 5;
const columnHeight = 240; //px
const columnWidth = 50; //px
const beadSize = 40; //px
const columnColors = ["green", "red"];
let gapPosition = [];

console.assert(numberOfColumns>0 && beadsPerColumn>0, "Invalid abacus size");
console.assert(columnHeight%beadSize==0, "Column height must be a multiple of bead size");
console.assert(columnHeight/beadSize == (beadsPerColumn+1), "Extra space in each column should be equal to 1 bead size");
console.assert(columnColors.length == numberOfColumns, "Length of ColumnColors array must be same as number of columns");

function buildAbacus(){
    for(let i=0;i<numberOfColumns;i++){
        //initially, gap is found at top for each column
        gapPosition.push(0); 

        //create column
        let column = document.createElement("div");
        column.className="column";
        column.style.height = columnHeight +"px";
        column.style.width = columnWidth +"px";

        //create stick
        let stick = document.createElement("div");
        stick.className="stick";
        stick.style.height = columnHeight +"px";

        // put stick in column
        column.appendChild(stick);

        //put beads in column
        for(let j=0;j<beadsPerColumn;j++){
            let bead = document.createElement("div");
            bead.className="bead";
            bead.style.height = beadSize + "px";
            bead.style.width = beadSize + "px";
            bead.style.backgroundColor = columnColors[i];
            column.appendChild(bead);
        }
        //add column to abacus
        abacus.appendChild(column);
        getColumnIndex(column);
    }
}
buildAbacus();
const beads =  document.querySelectorAll(".bead");

function getBeadIndex(bead){
    let currentColumn = bead.parentNode;
    let relativeY = bead.getBoundingClientRect().top - currentColumn.getBoundingClientRect().top;
    let beadIndex = parseInt(relativeY/beadSize);
    return beadIndex;
}
function getColumnIndex(column){
    let relativeX = column.getBoundingClientRect().left - abacus.getBoundingClientRect().left;
    let columnIndex = parseInt(relativeX/columnWidth);
    // column.textContent = columnIndex;
    return columnIndex;
}

beads.forEach(bead=>{
    bead.textContent = getBeadIndex(bead);
    bead.addEventListener("click", e=>{
        let clickedBead = e.target;
        let currentColumn = clickedBead.parentNode;
        let clickedBeadIndex = getBeadIndex(clickedBead);
        let currentColumnIndex = getColumnIndex(currentColumn);
        let ColumnGapIndex = gapPosition[currentColumnIndex];
        let currentColumnBeads = currentColumn.querySelectorAll(".bead"); //all beads in current column

        //loop through each bead in current column and move required beads
        currentColumnBeads.forEach(cbead=>{
            let cbeadPos = getBeadIndex(cbead);
            if(cbeadPos>ColumnGapIndex && cbeadPos <=clickedBeadIndex){ //current bead is below gap and above clicked bead
                if(clickedBead.style.top == ""){
                    clickedBead.style.top = "-40px";
                }else{
                    let currentY = parseInt(cbead.style.top);
                    currentY -= beadSize; //move beadSize units upwards
                    cbead.style.top = currentY.toString() +"px";
                }
            }
        });
    });
});