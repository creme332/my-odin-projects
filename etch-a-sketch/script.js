function RGBToHSL(rgb) {
    // https://css-tricks.com/converting-color-spaces-in-javascript/
     let sep = rgb.indexOf(",") > -1 ? "," : " ";
     rgb = rgb.substr(4).split(")")[0].split(sep);
   
     for (let R in rgb) {
       let r = rgb[R];
       if (r.indexOf("%") > -1) 
         rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
     }
     // Make r, g, and b fractions of 1
     let r = rgb[0] / 255,
     g = rgb[1] / 255,
     b = rgb[2] / 255;
 
     // Find greatest and smallest channel values
     let cmin = Math.min(r,g,b),
         cmax = Math.max(r,g,b),
         delta = cmax - cmin,
         h = 0,
         s = 0,
         l = 0;
 
     // Calculate hue
     // No difference
     if (delta == 0)
     h = 0;
     // Red is max
     else if (cmax == r)
     h = ((g - b) / delta) % 6;
     // Green is max
     else if (cmax == g)
     h = (b - r) / delta + 2;
     // Blue is max
     else
     h = (r - g) / delta + 4;
 
     h = Math.round(h * 60);
     
     // Make negative hues positive behind 360°
     if (h < 0)
         h += 360;
 
     // Calculate lightness
     l = (cmax + cmin) / 2;
 
     // Calculate saturation
     s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
         
     // Multiply l and s by 100
     s = +(s * 100).toFixed(1);
     l = +(l * 100).toFixed(1);
 
     return "hsl(" + h + "," + s + "%," + l + "%)";
 }

 const toHSL = {
    "red":"hsl(360,100%,50%)",
    "blue":"hsl(240,100%,50%)",
    "yellow":"hsl(50,100%,50%)",
    "green":"hsl(130,100%,50%)",
    "purple":"hsl(280,100%,50%)",
    "pink":"hsl(320,100%,50%)",
    "black":"hsl(0,0%,0%)",
    "white":"hsl(360,100%,100%)"
}

let canvaStates = []; //array of array of colors. 
//stores colors of canvas after each change. Used for redo/undo
let ptr = -1; //points to current displayed frame in canvaStates.
let stateChanged = false; //was there a change to currently displayed canva?

const canva = document.querySelector(".canva");
let GRID_SIZE; // number of cells in each row and column
const GRID_DIMENSIONS = 530; // width = height in px

function ValidateUserInput(num) {
    //check if num is a numeric string
    if (!isNaN(num) == false) return false;
    
    //accept integers only (reject decimals)
    if (num.indexOf(".") >= 0) {
      return false;
    }
  
    +num; //convert to integer
  
    //test range 
    if (num < 1 || num > 30) return false;
    return true;
}
do {
    GRID_SIZE = prompt("Enter a value (1-30) for grid size",10);
} while (!ValidateUserInput(GRID_SIZE));


// console.log(toHSL["red"]);
const EMPTY_COLOR = toHSL["white"]; //color of empty cell
const ACTIVE_BUTTON_COLOR = "rgb(224, 220, 220)"
let isDrawing = false;
let showOutline = false;
let pencilColor =  toHSL["red"]; //initial crayon color = red
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
const printButton  =document.querySelector(".export")
const tswitch = document.querySelectorAll(".toggle-light-switch");
const offbutton = document.querySelector(".state-off");
const onbutton = document.querySelector(".state-on");
let lightSwitchState = 2; //no light switch currently on. off:3 and on: 1

printButton.addEventListener("click", function(){
    window.print();
});

function disableAllLightSwitches() {
  offbutton.style.backgroundColor = EMPTY_COLOR;
  onbutton.style.backgroundColor = EMPTY_COLOR;
}
offbutton.addEventListener("click", function(){
    disableAllLightSwitches();
    if(lightSwitchState == 3){
        lightSwitchState = 2;
        return;
    }
    offbutton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
    lightSwitchState = 3;
    // console.log(lightSwitchState);
});

onbutton.addEventListener("click", function(){
    disableAllLightSwitches();
    if(lightSwitchState == 1){ //if already on
        lightSwitchState = 2;
        return;
    }
    onbutton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
    lightSwitchState = 1;
    // console.log(lightSwitchState);
});

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


function changeCellBrightness(cell, change){
    //change > 0 for lightening 
    //change < 0 for darkening cell
    //increases/decreases brightness of cell
    //returns 1 if cell color has changed else returns 0
    let cellColor = RGBToHSL(cell.style.backgroundColor); //format : hsl(a,b%,c%)
    let hue = cellColor.split(",")[0].slice(4);
    let saturation = cellColor.split(",")[1].slice(0, -1);
    let lightness = parseInt(cellColor.split(",")[2])
    let newColor = "hsl(";
    if(change>0){
        lightness = Math.min(lightness + change, 100);
    }else{
        lightness = Math.max(lightness + change, 0);
    }
    newColor += hue + ","+saturation+"%,"+lightness.toString()+"%)";
    cell.style.backgroundColor = newColor;
}
// console.log(changeCellBrightness("hsl(360,100,10)",true))
function getCoordinates(cell){
    //cell is a div
    const CELL_DIMENSIONS = GRID_DIMENSIONS/GRID_SIZE;
    // console.log(CELL_DIMENSIONS);
    let relativeX = cell.getBoundingClientRect().left - canva.getBoundingClientRect().left;
    let relativeY = cell.getBoundingClientRect().top - canva.getBoundingClientRect().top;
    // console.log(canva.getBoundingClientRect().top,canva.getBoundingClientRect().left);
    // (relativeX, relativeY) : coordinates of cell in pixels relative to canva
    let row = Math.floor(relativeY/CELL_DIMENSIONS);
    let col = Math.floor(relativeX/CELL_DIMENSIONS);
        // cell.textContent = "("+relativeX.toString() + ", " + relativeY.toString()+")";
    // cell.textContent = "("+row.toString() + ", " + col.toString()+")";
    // cell.textContent = "("+cell.getBoundingClientRect().top.toString() +
    //  ", " + cell.getBoundingClientRect().left.toString()+")";

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
    if(currentColor == allowedColor){
        
        if(lightSwitchState == 1){ //lighten cell
            changeCellBrightness(cells[k], 10);
        }
        if(lightSwitchState == 2){ //default fill color
            cells[k].style.backgroundColor = pencilColor;
        }
        if(lightSwitchState == 3){ //darken cell
            changeCellBrightness(cells[k], -10);
        }
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
        fillButton.style.backgroundColor = EMPTY_COLOR;
    }else{
        fillBucketMode = true;
        fillButton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
    }
});

toggleGridbutton.addEventListener("click", function(){
    if(!showOutline){
        cells.forEach(cell=>cell.classList.add("showOutline"));
        showOutline=true;
        toggleGridbutton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
    }else{
        cells.forEach(cell=>cell.classList.remove("showOutline"));
        showOutline=false;
        toggleGridbutton.style.backgroundColor = EMPTY_COLOR;
    }
})
eraserButton.addEventListener("click", function(){
    if(eraserMode){
        eraserMode = false;
        pencilColor = prevColor;
        eraserButton.style.backgroundColor = EMPTY_COLOR;
    }else{
        eraserMode = true;
        prevColor = pencilColor;
        pencilColor = EMPTY_COLOR;
        eraserButton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
    }

})

crayons.forEach(btn=>btn.addEventListener("click", function(e){
    //return any previously selected crayon to its initial position.
    crayons.forEach(btn=>btn.classList.remove("selected"));

    //obtain selected crayon color :
    // https://stackoverflow.com/questions/29182283/
    // javascript-onclick-get-image-name-without-path
    let crayonColor = e.target.src.split("/").pop().split(".")[0];

    pencilColor = toHSL[crayonColor];

    //displace selected crayon vertically
    document.querySelector("." + crayonColor + "crayon").classList.add("selected");
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
        if(lightSwitchState == 1){ //lighten pixel
            changeCellBrightness(currentcell, 10);
            stateChanged = true;
        }
        if(lightSwitchState==2){ //default pixel color
            if(currentcell.style.backgroundColor != pencilColor){
                stateChanged = true;
                currentcell.style.backgroundColor = pencilColor;
            }
        }
        if(lightSwitchState==3){ //darken pixel
            changeCellBrightness(currentcell, -10);
            stateChanged = true;
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
