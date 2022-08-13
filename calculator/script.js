const abacus = document.querySelector(".abacus");
const numberOfColumns = 2;
const beadsPerColumn = 5;

function buildAbacus(){
    console.assert(numberOfColumns>0 && beadsPerColumn>0, "Invalid abacus size");

    for(let i=0;i<numberOfColumns;i++){
        let column = document.createElement("div");
        column.className="column";
        let stick = document.createElement("div");
        stick.className="stick";
        column.appendChild(stick);
        for(let j=0;j<beadsPerColumn;j++){
            let bead = document.createElement("div");
            bead.className="bead";
            column.appendChild(bead);
        }
        abacus.appendChild(column);
    }
}
buildAbacus();
const beads =  document.querySelectorAll(".bead");
beads[0].style.background = "green";
const change = 40;

function showBeadIndex(bead){
    let currentColumn = bead.parentNode;
    let relativeY = bead.getBoundingClientRect().top - currentColumn.getBoundingClientRect().top;
    bead.textContent = parseInt(relativeY/40);
}

beads.forEach(bead=>{
    showBeadIndex(bead);
    bead.addEventListener("click", e=>{
        let clickedBead = e.target;
        let currentColumn = clickedBead.parentNode;

        // const CELL_DIMENSIONS = GRID_DIMENSIONS/GRID_SIZE;
        // // console.log(CELL_DIMENSIONS);
        let relativeY = clickedBead.getBoundingClientRect().top - currentColumn.getBoundingClientRect().top;
        // console.log(relativeY/40);
        // // console.log(canva.getBoundingClientRect().top,canva.getBoundingClientRect().left);
        // // (relativeX, relativeY) : coordinates of cell in pixels relative to canva
        // let row = Math.floor(relativeY/CELL_DIMENSIONS);
        // let col = Math.floor(relativeX/CELL_DIMENSIONS);

        if(clickedBead.style.top == ""){
            clickedBead.style.top = "-40px";
        }else{
            let currentY = parseInt(clickedBead.style.top);
            currentY -= change;
            // console.log(currentY);
            clickedBead.style.top = currentY.toString() +"px";
        }
        // console.log(clickedBead.offsetTop);
        showBeadIndex(bead);
    });
});