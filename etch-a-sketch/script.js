let canvaStates = []; //array of array of colors. 
//stores colors of canvas after each change. Used for redo/undo
let ptr = -1; //points to current displayed frame in canvaStates.
let stateChanged = false; //was there a change to currently displayed canva?

const GRID_SIZE = 5; // number of cells in each row and column
const GRID_DIMENSIONS = 350; //350px x 350px
const canva = document.querySelector(".canva");

const EMPTY_COLOR = "white"; //color of empty cell
let isDrawing = false;
let showOutline = false;
let pencilColor =  "red"; //initial crayon color
let fillBucketMode = false;
let eraserMode = false;
let prevColor = EMPTY_COLOR; //used for eraser mode
document.querySelector(".redcrayon").classList.add("selected");

const toggleGridbutton = document.querySelector(".showgrid");
const undoButton = document.querySelector(".undo");
const redoButton = document.querySelector(".redo");
const saveButton = document.querySelector(".save");
const fillButton = document.querySelector(".fill");
const eraserButton = document.querySelector(".eraser");
const crayons = document.querySelectorAll(".crayon");


function InitialiseGrid(){
    const CELL_SIZE = 100/GRID_SIZE;
    let colors = []; 

    for (let i=0;i<GRID_SIZE*GRID_SIZE;i++){
        let cell =document.createElement("div");
        cell.className="cell";
        cell.style.height = CELL_SIZE.toString()+"%";
        cell.style.width = CELL_SIZE.toString()+"%";
        cell.style.backgroundColor = EMPTY_COLOR;
        canva.appendChild(cell);
        getCoordinates(cell);
        colors.push(EMPTY_COLOR);
    }
    canvaStates.push(colors);
    ptr++;
}

InitialiseGrid();

const cells = document.querySelectorAll(".cell");

function getCoordinates(cell){
    //cell is a div
    const CELL_DIMENSIONS = GRID_DIMENSIONS/GRID_SIZE;
    console.log(CELL_DIMENSIONS);
    let relativeX = cell.getBoundingClientRect().left - canva.getBoundingClientRect().left;
    let relativeY = cell.getBoundingClientRect().top - canva.getBoundingClientRect().top;

    // (relativeX, relativeY) : coordinates of cell in pixels relative to canva
    let col = Math.floor(relativeX/CELL_DIMENSIONS);
    let row = Math.floor(relativeY/CELL_DIMENSIONS);
    cell.textContent = "("+row.toString() + ", " + col.toString()+")";

    return [row,col];
}
function UpdateCanvaColors(updatedcolors){
    for (let i = 0; i < cells.length; i++) {
        if(updatedcolors[i] !=  cells[i].style.backgroundColor){
            cells[i].style.backgroundColor = updatedcolors[i];
        }
    }
}

undoButton.addEventListener("click",function(){
    if (canvaStates.length!=1){
        ptr--; 
        UpdateCanvaColors(canvaStates[ptr]);
    }
});

redoButton.addEventListener("click", function(){
    if (ptr < canvaStates.length-1){
        ptr++;
        UpdateCanvaColors(canvaStates[ptr]);
    }
});

function dfs(row, col, visited, allowedColor){
    //validate coordinates 
    if(row<0 || row >= GRID_SIZE || col<0 || col>=GRID_SIZE){
        return;
    }

    // k : index of current cell in cells nodelist
    k = GRID_SIZE*row + col; 

    //check if cell already visited
    if(visited.has(k)){
        return;
    }

    //validate current cell color
    let currentColor = cells[k].style.backgroundColor;
    if(currentColor == allowedColor || currentColor ==  EMPTY_COLOR){

        cells[k].style.backgroundColor = pencilColor;
        stateChanged = true;
    
        visited.add(k); //update visited to avoid infinite loops
    
        const dx = [0,0,1,-1]; //change in row
        const dy = [1,-1,0,0]; //change in col
    
        for (let i = 0; i < dx.length; i++) {
            let newrow = dx[i]+row;
            let newcol = dy[i] + col;
            dfs(newrow,newcol, visited, allowedColor);
        } 
    }
   
}
fillButton.addEventListener("click", function(){
    if(fillBucketMode){
        fillBucketMode = false;
        fillButton.style.backgroundColor = "white";
    }else{
        fillBucketMode = true;
        fillButton.style.backgroundColor = "lightcoral";
    }
});

toggleGridbutton.addEventListener("click", function(){
    if(!showOutline){
        cells.forEach(cell=>cell.classList.add("showOutline"));
        showOutline=true;
    }else{
        cells.forEach(cell=>cell.classList.remove("showOutline"));
        showOutline=false;
    }
})
eraserButton.addEventListener("click", function(){
    if(eraserMode){
        eraserMode = false;
        pencilColor = prevColor;
        eraserButton.style.backgroundColor = "white";
    }else{
        eraserMode = true;
        prevColor = pencilColor;
        pencilColor = EMPTY_COLOR;
        eraserButton.style.backgroundColor = "lightcoral";
    }

})

crayons.forEach(btn=>btn.addEventListener("click", function(e){
    //return any previously selected crayon to its initial position.
    document.querySelector("."+pencilColor+"crayon").classList.remove("selected");

    //obtain crayon name in format : "<colour>crayon"
    let crayon = e.target.className.split(" ")[0]; 

    //update pencil color by removing "crayon" from crayon name 
    pencilColor = crayon.replace("crayon","")

    //displace selected crayon vertically
    document.querySelector("."+crayon).classList.add("selected");
}));

cells.forEach(btn=>btn.addEventListener("mousedown", function(e){
    e.preventDefault(); //prevents not-allowed cursor from appearing when dragging
    isDrawing = true;
    let currentcell = e.target;
    if(fillBucketMode){
        let coord = getCoordinates(currentcell); //[0]: row, [1]:column
        let visited = new Set();
        dfs(coord[0],coord[1], visited, currentcell.style.backgroundColor);
    }else{
        if(currentcell.style.backgroundColor != pencilColor){
            stateChanged = true;
            currentcell.style.backgroundColor = pencilColor;
        }
    }
}));

cells.forEach(btn=>btn.addEventListener("mousemove", function(e){
    e.preventDefault(); //prevents not-allowed cursor from appearing when dragging
    if(fillBucketMode)return;
    if(isDrawing){
        let currentcell = e.target;
        if(currentcell.style.backgroundColor != pencilColor){
            stateChanged = true;
            currentcell.style.backgroundColor = pencilColor;
        }
    }
}));

window.addEventListener("mouseup", function(){
    isDrawing = false;
    if(stateChanged){
        stateChanged = false;
        //create a copy of current displayed frame's colors
        let colors = [];
        for (let i = 0; i < cells.length; i++) {
            colors.push(cells[i].style.backgroundColor);
        }        
        // console.log(colors);

        // if current frame is not the latest frame, remove all frames 
        // after current one in canvaStates 
        // undo/redo functionality similar to Paint.
        if(ptr != canvaStates.length-1){
            while(canvaStates.length-1 != ptr){
                canvaStates.pop();
            }
        }
        canvaStates.push(colors); //push copy to canvaStates.
        ptr = canvaStates.length-1;
        // console.log(canvaStates);
    }
});
