const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');
const zSlider = document.getElementById('zSlider');
const persSlider = document.getElementById('Pers');
rotateBoard();
changePerspective();
function changePerspective(){
    document.getElementById('pval').textContent = persSlider.value;
    document.querySelector('body').style.perspective = `${persSlider.value}px`;
}
function rotateBoard(){
    const boards = document.querySelectorAll('.board');
    boards.forEach(board=>{
        board.style.transform = `rotateX(${xSlider.value}deg) rotateY(${ySlider.value}deg) rotateZ(${zSlider.value}deg)`;
    });
}
xSlider.addEventListener('input',(e)=>{
    e.preventDefault();
    document.getElementById('xval').textContent = xSlider.value;
    rotateBoard();
});

ySlider.addEventListener('input',(e)=>{
    e.preventDefault();
    document.getElementById('yval').textContent = ySlider.value;
    rotateBoard();
});

zSlider.addEventListener('input',(e)=>{
    e.preventDefault();
    document.getElementById('zval').textContent = zSlider.value;
    rotateBoard();
});

persSlider.addEventListener('input',(e)=>{
    e.preventDefault();
    changePerspective();    
});

const cells =document.querySelectorAll('.cell');

cells.forEach(cell=>{
    cell.addEventListener('click',(e)=>{
        console.log(e.button);
        e.target.style.background = 'red';
    })
});