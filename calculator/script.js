const abacus = document.querySelector(".abacus");
const numberOfColumns = 3;
const beadsPerColumn = 5;
const beadSize = 40; //px
const columnHeight = beadSize*(beadsPerColumn+1); //px
const columnWidth = beadSize + 10; //px
const columnColors = ["green", "red","hotpink"];
let gapPosition = []; //gap position in each column. 

console.assert(numberOfColumns>0 && beadsPerColumn>0, "Invalid abacus size");
console.assert(columnHeight%beadSize==0, "Column height must be a multiple of bead size");
console.assert(columnHeight/beadSize == (beadsPerColumn+1), "Extra space in each column should be equal to 1 bead size");
console.assert(columnColors.length == numberOfColumns, "Length of ColumnColors array must be same as number of columns in abacus");

//create counter container
const counterContainer = document.createElement("div");
counterContainer.className="counter-container"; 

function buildAbacus(){
    const columnContainer = document.createElement("div");
    columnContainer.className="column-container";

    for(let i=0;i<numberOfColumns;i++){
        //initially, gap is found at top for each column
        gapPosition.push(0); 

        //create a counter for current column
        let counter = document.createElement("div");
        counter.className="counter";
        counter.style.width = columnWidth + "px";
        counter.style.height = beadSize + "px";
        counter.textContent = gapPosition[i];

        //add counter to counter-container
        counterContainer.appendChild(counter);

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
        //add column to columnContainer
        columnContainer.appendChild(column);
    }
    abacus.appendChild(columnContainer);   
    abacus.appendChild(counterContainer);
}
buildAbacus();
const beads =  document.querySelectorAll(".bead");

function showBeadPos(){
    beads.forEach(b=>{b.textContent=getBeadIndex(b);})
}

function getBeadIndex(bead){
    let currentColumn = bead.parentNode;
    let relativeY = bead.getBoundingClientRect().top - currentColumn.getBoundingClientRect().top;
    let beadIndex = parseInt(relativeY/beadSize);
    return beadIndex;
}
// showBeadPos();
function getColumnIndex(column){
    let relativeX = column.getBoundingClientRect().left - abacus.getBoundingClientRect().left;
    let columnIndex = parseInt(relativeX/columnWidth);
    return columnIndex;
}

//displace beads onclick
beads.forEach(bead=>{
    bead.addEventListener("click", e=>{
        let clickedBead = e.target;
        let clickedColumn = clickedBead.parentNode; //column containing clicked bead
        let clickedBeadIndex = getBeadIndex(clickedBead); //position of clicked bead in clickedColumn. top-most position is index 0.
        let currentColumnIndex = getColumnIndex(clickedColumn); //left-most column has index 0
        let ColumnGapIndex = gapPosition[currentColumnIndex]; // index of gap in clickedColumn 
        let currentColumnBeads = clickedColumn.querySelectorAll(".bead"); //all beads in current column

        //loop through each bead in current column and move it if needed
        currentColumnBeads.forEach(cbead=>{
            let cbeadPos = getBeadIndex(cbead);
            if(clickedBeadIndex>ColumnGapIndex){//must displace beads upwards

                if(cbeadPos>ColumnGapIndex && cbeadPos<=clickedBeadIndex){ //current bead is below gap and above clicked bead
                    let currentY = 0;
                    if(cbead.style.top != ""){
                        currentY = parseInt(cbead.style.top);
                    }
                    currentY -= beadSize; // move beadSize units upwards
                    cbead.style.top = currentY.toString() +"px";
                }

            }else{//must displace beads downwards
                if(cbeadPos<ColumnGapIndex && cbeadPos>=clickedBeadIndex){ //current bead is above gap and below clicked bead
                    let currentY = 0;
                    if(cbead.style.top != ""){
                        currentY = parseInt(cbead.style.top);
                    }
                    currentY += beadSize; // move beadSize units downwards
                    cbead.style.top = currentY.toString() +"px";
                }
            }
        });
        //update gap position
        gapPosition[currentColumnIndex] = clickedBeadIndex;
        showBeadPos();

        //update counter 
        let currentCounter = counterContainer.querySelector(`div:nth-child(${currentColumnIndex+1})`);
        currentCounter.textContent  = clickedBeadIndex;
    });
});