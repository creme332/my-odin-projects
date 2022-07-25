const canva = document.querySelector(".canva");
// const cell = document.querySelector(".cell");

const CANVA_SIZE  = 350; //350px x 350px 
let GRID_SIZE = 11; // N x N 
let CELL_SIZE = 100/GRID_SIZE;

// cell.style.width = "100px";
// cell.style.height = "100px";
// cell.style.background = "red";

// cell.setAttribute("id", "Div1");

for (let i=0;i<GRID_SIZE*GRID_SIZE;i++){
    var cell =document.createElement("div");
    cell.style.height = CELL_SIZE.toString()+"%";
    cell.style.width = CELL_SIZE.toString()+"%";
    canva.appendChild(cell);
    cell.className="cell";
}
