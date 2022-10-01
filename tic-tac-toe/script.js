const playerFactory = (name, marker, markerColour) => {
    //name, markerColour  : string
    //marker : digit
    return { name, marker, markerColour };
};

const gameFactory = (player1name, player2name) => {
    const emptyGridCellMarker  = 0;
    const player1 = playerFactory(player1name, 1, 'red');
    const player2 = playerFactory(player2name, 2, 'green');
    let currentPlayer = player1.name;

    let cube = [
        [
            [0, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 2, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];

    function initGrid(){
        let scene = document.querySelector('.scene');
        cube.forEach(board=>{
            let boardElement = document.createElement('div');
            boardElement.classList.add('board');
            board.forEach(row=>{
                row.forEach(col=>{
                    let cellElement = document.createElement('div');
                    cellElement.classList.add('cell');
                    if(col==player1.marker){
                        cellElement.style.backgroundColor = player1.markerColour;
                    }
                    if(col==player2.marker){
                        cellElement.style.backgroundColor = player2.markerColour;
                    }
                    boardElement.appendChild(cellElement);
                });
            });
            scene.appendChild(boardElement);
        });
    }

    function swapTurns(){
        if (currentPlayer==player1.name){
            currentPlayer = player2.name;
        }else{
            currentPlayer = player1.name;
        }
    }
    return{initGrid, swapTurns};
};

let newGame =  gameFactory('john', 'sophie');
newGame.initGrid();


// IMPLEMENT SLIDERS 

const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');
const zSlider = document.getElementById('zSlider');
const persSlider = document.getElementById('Pers');

function rotateBoard() {
    const boards = document.querySelectorAll('.board');
    boards.forEach(board => {
        board.style.transform = `rotateX(${xSlider.value}deg) rotateY(${ySlider.value}deg) rotateZ(${zSlider.value}deg)`;
    });
}
rotateBoard();


changePerspective();
function changePerspective() {
    document.getElementById('pval').textContent = persSlider.value;
    document.querySelector('body').style.perspective = `${persSlider.value}px`;
}

xSlider.addEventListener('input', (e) => {
    e.preventDefault();
    document.getElementById('xval').textContent = xSlider.value;
    rotateBoard();
});

ySlider.addEventListener('input', (e) => {
    e.preventDefault();
    document.getElementById('yval').textContent = ySlider.value;
    rotateBoard();
});

zSlider.addEventListener('input', (e) => {
    e.preventDefault();
    document.getElementById('zval').textContent = zSlider.value;
    rotateBoard();
});

persSlider.addEventListener('input', (e) => {
    e.preventDefault();
    changePerspective();
});

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        console.log(e.button);
        e.target.style.background = 'red';
    })
});