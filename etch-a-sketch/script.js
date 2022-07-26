function InitialiseGrid(GRID_SIZE){
    const canva = document.querySelector(".canva");
    const CELL_SIZE = 100/GRID_SIZE;
    for (let i=0;i<GRID_SIZE*GRID_SIZE;i++){
        let cell =document.createElement("div");
        cell.className="cell";
        cell.style.height = CELL_SIZE.toString()+"%";
        cell.style.width = CELL_SIZE.toString()+"%";
        canva.appendChild(cell);
    }
}


InitialiseGrid(10);
const toggleGridbutton = document.querySelector(".showgrid");
const cells = document.querySelectorAll(".cell");
const crayons = document.querySelectorAll(".crayon");

let isDrawing = false;
let showOutline = false;
let pencilColor =  "red";

toggleGridbutton.addEventListener("click", function(){
    if(!showOutline){
        cells.forEach(cell=>cell.classList.add("showOutline"));
        showOutline=true;
    }else{
        cells.forEach(cell=>cell.classList.remove("showOutline"));
        showOutline=false;
    }
})

document.querySelector(".redcrayon").classList.add("selected");



crayons.forEach(btn=>btn.addEventListener("click", function(e){
    //return any previously selected crayon to its initial position.
    document.querySelector("."+pencilColor+"crayon").classList.remove("selected");

    let crayon = e.target.className.split(" ")[0];
    //update pencil color by removeing "crayon" from "<colour>crayon"
    pencilColor = crayon.replace("crayon","")
    //displace selected crayon vertically
    document.querySelector("."+crayon).classList.add("selected");
}));


cells.forEach(btn=>btn.addEventListener("mousedown", function(e){
    e.preventDefault();
    isDrawing = true;
    let currentcell = e.target;
    currentcell.style.backgroundColor= pencilColor;
}));

cells.forEach(btn=>btn.addEventListener("mousemove", function(e){
    e.preventDefault();
    if(isDrawing){
        let currentcell = e.target;
        currentcell.style.backgroundColor= pencilColor;
    }
}));

window.addEventListener("mouseup", function(){
    isDrawing = false;
});
