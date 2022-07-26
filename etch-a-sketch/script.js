let canvaStates = []; //stores colors of canvas after each change. Used for redo/undo
let ptr = -1;
let stateChanged = false;
const EMPTY_COLOR = "rgb(236, 234, 234)";

function InitialiseGrid(GRID_SIZE){
    const canva = document.querySelector(".canva");
    const CELL_SIZE = 100/GRID_SIZE;

    let colors = []; 

    for (let i=0;i<GRID_SIZE*GRID_SIZE;i++){
        let cell =document.createElement("div");
        cell.className="cell";
        cell.style.height = CELL_SIZE.toString()+"%";
        cell.style.width = CELL_SIZE.toString()+"%";
        cell.style.backgroundColor = EMPTY_COLOR;
        canva.appendChild(cell);
        colors.push(EMPTY_COLOR);
    }
    canvaStates.push(colors);
    ptr++;
}


InitialiseGrid(4);
const toggleGridbutton = document.querySelector(".showgrid");
const undoButton = document.querySelector(".undo");
const redoButton = document.querySelector(".redo");
const cells = document.querySelectorAll(".cell");
const crayons = document.querySelectorAll(".crayon");

undoButton.addEventListener("click",function(){
    if (canvaStates.length!=1){
        ptr--;
        let updatedcolors = canvaStates[ptr];
    
        //change color of updated nodes
        for (let i = 0; i < cells.length; i++) {
            if(updatedcolors[i] !=  cells[i].style.backgroundColor){
                cells[i].style.backgroundColor = updatedcolors[i];
            }
        }
    }
});

redoButton.addEventListener("click", function(){
    if (ptr < canvaStates.length-1){
        ptr++;
        let updatedcolors = canvaStates[ptr];
    
        //change color of updated nodes
        for (let i = 0; i < cells.length; i++) {
            if(updatedcolors[i] !=  cells[i].style.backgroundColor){
                cells[i].style.backgroundColor = updatedcolors[i];
            }
        }
    }
});

let isDrawing = false;
let showOutline = false;
let pencilColor =  "red";
document.querySelector(".redcrayon").classList.add("selected");

toggleGridbutton.addEventListener("click", function(){
    if(!showOutline){
        cells.forEach(cell=>cell.classList.add("showOutline"));
        showOutline=true;
    }else{
        cells.forEach(cell=>cell.classList.remove("showOutline"));
        showOutline=false;
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
    console.log(e.target.offse)
    isDrawing = true;
    let currentcell = e.target;
    if(currentcell.style.backgroundColor != pencilColor){
        stateChanged = true;
        currentcell.style.backgroundColor = pencilColor;
    }
}));

cells.forEach(btn=>btn.addEventListener("mousemove", function(e){
    e.preventDefault(); //prevents not-allowed cursor from appearing when dragging
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
        let colors = [];
        for (let i = 0; i < cells.length; i++) {
            colors.push(cells[i].style.backgroundColor);
        }        
        console.log(colors);
        if(ptr != canvaStates.length-1){
            while(canvaStates.length-1 != ptr){
                canvaStates.pop();
            }
        }
        canvaStates.push(colors);
        ptr = canvaStates.length-1;
        console.log(canvaStates);
    }
});
