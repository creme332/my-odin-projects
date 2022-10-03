const playerFactory = (name, marker, markerColour) => {
    //name, markerColour  : string
    //marker : digit
    return { name, marker, markerColour };
};

const gameFactory = (player1name, player2name) => {
    const emptyGridCellMarker = 0;
    const player1 = playerFactory(player1name, 1, 'red');
    const player2 = playerFactory(player2name, 2, 'green');
    let currentPlayer = player1.name;

    let cube = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];

    function initGrid() {
        let scene = document.querySelector('.scene');
        cube.forEach(board => {
            let boardElement = document.createElement('div');
            boardElement.classList.add('board');
            board.forEach(row => {
                row.forEach(col => {
                    let cellElement = document.createElement('div');
                    cellElement.classList.add('cell');
                    if (col == player1.marker) {
                        cellElement.style.backgroundColor = player1.markerColour;
                    }
                    if (col == player2.marker) {
                        cellElement.style.backgroundColor = player2.markerColour;
                    }
                    boardElement.appendChild(cellElement);
                });
            });
            scene.appendChild(boardElement);
        });
    }

    function swapTurns() {
        currentPlayer = currentPlayer == player1.name ? player2.name : player1.name;
    }

    function playerMove() {
        //enable eventlisteners for cells
    }

    function playOX3D(moves) {
        // Credits to dinglemouse [https://github.com/dinglemouse2250]
        //https://www.codewars.com/kata/reviews/5af3e1a41ed83a01e9001002/groups/5d9d4af7ae3386000191bbb1
        let grid = Array.from("    ", () => Array.from("    ", () => Array.from("    ")));
        const won = (x, y, z) => [i => grid[i][y][z], i => grid[x][i][z], i => grid[x][y][i]
            , i => grid[x][i][i], i => grid[i][y][i], i => grid[i][i][z]
            , i => grid[x][i][3 - i], i => grid[i][y][3 - i], i => grid[i][3 - i][z]
            , i => grid[i][i][i], i => grid[i][i][3 - i], i => grid[i][3 - i][i], i => grid[i][3 - i][3 - i]
        ].some(xform => [0, 1, 2, 3].map(xform).every(cell => cell === grid[x][y][z]));
        let move = 1;
        for (const [x, y, z] of moves) {
            grid[x][y][z] = "XO"[move & 1];
            if (won(x, y, z)) return `${"XO"[move & 1]} wins after ${move} moves`;
            move++;
        }
        return "No winner";
    }
    return { initGrid, swapTurns };
};

let newGame = gameFactory('john', 'sophie');
newGame.initGrid();


// IMPLEMENT SLIDERS 

const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');
const zSlider = document.getElementById('zSlider');
const persSlider = document.getElementById('Pers');
const persXSlider = document.getElementById('PersHorizontal');
const persYSlider = document.getElementById('PersVertical');
const toggleTransparencyCheckbox = document.getElementById('transparent-button');

const boards = document.querySelectorAll('.board');
const threeDbutton = document.querySelector('#threeD-button');
const scene  = document.querySelector('.scene');

threeDbutton.addEventListener('input', () => {
    if (threeDbutton.checked) {
        scene.classList.add('disable3Dscene');
        xSlider.value = ySlider.value = zSlider.value = 0;
        rotateBoard();
    } else {
        scene.classList.remove('disable3Dscene');
    }

})

toggleTransparencyCheckbox.addEventListener('input', () => {
    boards.forEach(board => {
        if (toggleTransparencyCheckbox.checked) {
            board.style.backgroundColor = 'transparent';
        } else {
            board.style.backgroundColor = 'aliceblue';
        }
    });

})
function rotateBoard() {
    boards.forEach(board => {
        board.style.transform = `rotateX(${xSlider.value}deg) rotateY(${ySlider.value}deg) rotateZ(${zSlider.value}deg)`;
    });
}

function AutoRotateBoard(activate) {
    const rotationSliders = document.querySelectorAll('.rotationslider');

    boards.forEach(board => {
        if (activate) {
            board.classList.add('animateAutoRotate');

        } else {
            board.classList.remove('animateAutoRotate');

        }
    });

    rotationSliders.forEach(slider => {
        if (activate) {
            slider.setAttribute('disabled', 'true');
        } else {
            slider.setAttribute('disabled', 'false');
        }
    });
}
changePerspective();
rotateBoard();
document.querySelector('#autorotate-button').addEventListener('input', () => {
    if (document.querySelector('#autorotate-button').checked) {
        AutoRotateBoard(true);
    } else {
        AutoRotateBoard(false);
    }
})

function changePerspective() {
    document.getElementById('pval').textContent = persSlider.value;
    document.getElementById('phval').textContent = persXSlider.value;
    document.getElementById('pvval').textContent = persYSlider.value;


    scene.style.perspective = `${persSlider.value}px`;
    scene.style.perspectiveOrigin = `${persXSlider.value}% ${persYSlider.value}%`;
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

persXSlider.addEventListener('input', (e) => {
    e.preventDefault();
    changePerspective();
});

persYSlider.addEventListener('input', (e) => {
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

