'use strict';

/**
 * Creates a new player object
 * @param {string} name 
 * @param {integer} marker 
 * @param {string} markerColour 
 * @returns {object}
 */
const playerFactory = (name, marker, markerColour) => {
    //name, markerColour  : string
    //marker : digit
    return { name, marker, markerColour };
};

/**
 * gameFactory handles everything about the game, excluding graphics. 
 * It creates an instance of a 4x4x4 game and can exist on its own.
 * @param {string} player1name 
 * @param {string} player2name 
 * @returns {object}
 */
const gameFactory = (player1name, player2name) => {
    const DIMENSION = 4;
    const emptyGridCellMarker = 0;
    const player1 = playerFactory(player1name, 1, 'red'); //maximising player => AI
    const player2 = playerFactory(player2name, 2, 'green');
    const maxDepth = 2; // Used by AI.
    // Increasing maxDepth will improve AI and make game SLOWER (browser may crash).

    let currentPlayer = player1;
    let lastMove = { "plane": -1, "row": -1, "col": -1 }; //used to optimise win checking algorithm
    let totalMovesLeft = Math.pow(DIMENSION, 3);
    let cube = [];

    (function createCube() {
        for (let z = 0; z < DIMENSION; z++) {
            let board = [];
            for (let x = 0; x < DIMENSION; x++) {
                let row = [];
                for (let y = 0; y < DIMENSION; y++) {
                    row.push(emptyGridCellMarker);
                }
                board.push(row);
            }
            cube.push(board);
        }
    })();

    function resetGame() {
        for (let z = 0; z < DIMENSION; z++) {
            for (let x = 0; x < DIMENSION; x++) {
                for (let y = 0; y < DIMENSION; y++) {
                    cube[z][x][y] = emptyGridCellMarker;
                }
            }
        }
        lastMove = { "plane": -1, "row": -1, "col": -1 };
        currentPlayer = player1;
        totalMovesLeft = Math.pow(DIMENSION, 3);
    }

    function wincheck() { // see wincheck.js for explanation
        const playerMarker = currentPlayer.marker;
        let winningCoord = []; //list of coordinates of points on winning line. Format: (plane, row, column)
        const board_1D = cube[lastMove.plane]; // board on which player made a move 

        // CHECK CASE 1 and CASE 2 optimally

        //check horizontally along board
        winningCoord = [[lastMove.plane, lastMove.row, 0]];
        for (let col = 1; col < DIMENSION; col++) { //col
            if (board_1D[lastMove.row][col] == board_1D[lastMove.row][col - 1] && board_1D[lastMove.row][col] == playerMarker) {
                winningCoord.push([lastMove.plane, lastMove.row, col]);
            } else {
                break;
            }
        }
        if (winningCoord.length == DIMENSION) {
            return winningCoord;
        }

        //check vertically along board
        winningCoord = [[lastMove.plane, 0, lastMove.col]];
        for (let row = 1; row < DIMENSION; row++) {
            if (board_1D[row][lastMove.col] == board_1D[row - 1][lastMove.col] && board_1D[row][lastMove.col] == playerMarker) {
                winningCoord.push([lastMove.plane, row, lastMove.col]);
            } else {
                break;
            }
        }
        if (winningCoord.length == DIMENSION) {
            return winningCoord;
        }

        //check positive diagonal along board
        if (lastMove.row + lastMove.col == DIMENSION - 1) { // we are on positive diagonal
            winningCoord = [[lastMove.plane, DIMENSION - 1, 0]];

            for (let row = DIMENSION - 2; row >= 0; row--) {
                let col = (DIMENSION - 1) - row;
                if (board_1D[row][col] == board_1D[row + 1][col - 1] && board_1D[row][col] == playerMarker) {
                    winningCoord.push([lastMove.plane, row, col]);
                } else {
                    break;
                }
            }
            if (winningCoord.length == DIMENSION) {
                return winningCoord;
            }
        }

        //check negative diagonal along board
        if (lastMove.row == lastMove.col) { // we are on negative 2D diagonal 
            winningCoord = [[lastMove.plane, 0, 0]];

            for (let row = DIMENSION - 1; row > 0; row--) {
                if (board_1D[row][row] == board_1D[row - 1][row - 1] && board_1D[row][row] == playerMarker) {
                    winningCoord.push([lastMove.plane, row, row]);
                } else {
                    break;
                }
            }

            if (winningCoord.length == DIMENSION) {
                return winningCoord;
            }
        }

        //multi-plane vertical line check
        winningCoord = [[0, lastMove.row, lastMove.col]];
        for (let plane = 1; plane < DIMENSION; plane++) {
            if (cube[plane][lastMove.row][lastMove.col] == cube[plane - 1][lastMove.row][lastMove.col] && cube[plane][lastMove.row][lastMove.col] == playerMarker) {
                winningCoord.push([plane, lastMove.row, lastMove.col]);
            } else {
                break;
            }
        }
        if (winningCoord.length == DIMENSION) {
            return winningCoord;
        }

        // At this point, Case 1, 2 are over.

        // The code below Case 3, 4 is NON-OPTIMAL.

        function getBorderCells(DIMENSION) {
            let coords = [];
            // move right
            for (let i = 0; i < DIMENSION; i++) {
                coords.push([0, 0, i]);
            }
            //move down
            for (let i = 1; i < DIMENSION; i++) {
                coords.push([0, i, DIMENSION - 1]);
            }
            //move left
            for (let i = DIMENSION - 2; i > -1; i--) {
                coords.push([0, DIMENSION - 1, i]);
            }
            //move up
            for (let i = DIMENSION - 2; i > 0; i--) {
                coords.push([0, i, 0]);
            }
            return coords;
        }

        //get coordinates of cells along edge of top plane
        const startingCoords = getBorderCells(DIMENSION);
        const directions = [
            //---A---
            [1, 0, 1],
            [1, 0, -1],

            //---B---
            [1, 1, 0],
            [1, -1, 0],
            //---C---
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, 1],
            [1, -1, -1]
        ];
        // z : plane index, x : row index, y : column index
        // dz : change in plane index, ...

        //loop through each possible starting point for winning line
        for (let [z, x, y] of startingCoords) {

            //loop through possible directions
            for (let [dz, dx, dy] of directions) {
                winningCoord = [[z, x, y]];

                //loop through each point (other than the starting point) along this direction
                for (let k = 1; k <= DIMENSION - 1; k++) {
                    let newplane = z + dz * k;
                    let newrow = x + dx * k;
                    let newcol = y + dy * k;

                    //check if new coordinates is in range
                    if (newrow < 0 || newcol < 0 || newplane < 0 ||
                        newrow >= DIMENSION || newcol >= DIMENSION ||
                        newplane >= DIMENSION) {
                        break;
                    }

                    if (cube[newplane][newrow][newcol] == cube[z][x][y]
                        && cube[z][x][y] == playerMarker) {
                        winningCoord.push([newplane, newrow, newcol]);
                    } else {
                        break;
                    }
                }
                if (winningCoord.length == DIMENSION) {
                    return winningCoord;
                }
            }
        }

        //no win yet
        return [];
    }

    function getCurrentMarkerColour() {
        return currentPlayer.markerColour;
    }

    /**
     * Returns a random valid move. Used for testing purposes only.
     * @returns {List} A list containing 3 integers denoting board num, row num, column num.
     */
    function getComputerRandomMove() {
        let z, x, y;
        z = x = y = 0;
        let count = 100; //max number of random coordinates that can be generated
        // to safeguard against infinite loop
        while (cube[z][x][y] != emptyGridCellMarker && count > 0) {
            z = parseInt(Math.random() * DIMENSION);
            x = parseInt(Math.random() * DIMENSION);
            y = parseInt(Math.random() * DIMENSION);
            count--;
        }
        return [z, x, y];
    }

    function evaluate() {
        //https://github.com/ghorned/Qubic#heuristic
        let x = 0, o = 0, total = 0;
        const ai = player1.marker;
        const human = player2.marker;
        let i, j, k;

        // Scores rows
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                for (k = 0; k < DIMENSION; k++) {
                    if (cube[i][j][k] == ai) {
                        x++;
                    }
                    if (cube[i][j][k] == human) {
                        o++;
                    }
                }
                if (x > 0 && o == 0) {
                    total += Math.pow(x, 2);
                }
                if (o > 0 && x == 0) {
                    total -= Math.pow(o, 2);
                }
                x = 0, o = 0;
            }
        }

        // Scores columns
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                for (k = 0; k < DIMENSION; k++) {
                    if (cube[i][k][j] == ai) {
                        x++;
                    }
                    if (cube[i][k][j] == human) {
                        o++;
                    }
                }
                if (x > 0 && o == 0) {
                    total += Math.pow(x, 2);
                }
                if (o > 0 && x == 0) {
                    total -= Math.pow(o, 2);
                }
                x = 0, o = 0;
            }
        }

        // Scores pillars
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                for (k = 0; k < DIMENSION; k++) {
                    if (cube[k][i][j] == ai) {
                        x++;
                    }
                    if (cube[k][i][j] == human) {
                        o++;
                    }
                }
                if (x > 0 && o == 0) {
                    total += Math.pow(x, 2);
                }
                if (o > 0 && x == 0) {
                    total -= Math.pow(o, 2);
                }
                x = 0, o = 0;
            }
        }

        // Scores diagonals (by layer)
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                if (cube[i][j][j] == ai) {
                    x++;
                }
                if (cube[i][j][j] == human) {
                    o++;
                }
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        k = 3;
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                if (cube[i][j][k] == ai) {
                    x++;
                }
                if (cube[i][j][k] == human) {
                    o++;
                }
                k--;
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        // Scores diagonals (by row)
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                if (cube[j][i][j] == ai) {
                    x++;
                }
                if (cube[j][i][j] == human) {
                    o++;
                }
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        k = 3;
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                if (cube[j][i][k] == ai) {
                    x++;
                }
                if (cube[j][i][k] == human) {
                    o++;
                }
                k--;
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        // Scores diagonals (by column)
        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                if (cube[j][j][i] == ai) {
                    x++;
                }
                if (cube[j][j][i] == human) {
                    o++;
                }
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        for (i = 0; i < DIMENSION; i++) {
            for (j = 0; j < DIMENSION; j++) {
                k = DIMENSION - 1 - j;
                if (cube[j][k][i] == ai) {
                    x++;
                }
                if (cube[j][k][i] == human) {
                    o++;
                }
            }
            if (x > 0 && o == 0) {
                total += Math.pow(x, 2);
            }
            if (o > 0 && x == 0) {
                total -= Math.pow(o, 2);
            }
            x = 0, o = 0;
        }

        // Scores super-diagonals
        for (i = 0; i < DIMENSION; i++) {
            if (cube[i][i][i] == ai) {
                x++;
            }
            if (cube[i][i][i] == human) {
                o++;
            }
        }
        if (x > 0 && o == 0) {
            total += Math.pow(x, 2);
        }
        if (o > 0 && x == 0) {
            total -= Math.pow(o, 2);
        }
        x = 0, o = 0;

        j = 3;
        for (i = 0; i < DIMENSION; i++) {
            if (cube[j][i][i] == ai) {
                x++;
            }
            if (cube[j][i][i] == human) {
                o++;
            }
            j--;
        }
        if (x > 0 && o == 0) {
            total += Math.pow(x, 2);
        }
        if (o > 0 && x == 0) {
            total -= Math.pow(o, 2);
        }
        x = 0, o = 0;

        j = 3;
        for (i = 0; i < DIMENSION; i++) {
            if (cube[i][i][j] == ai) {
                x++;
            }
            if (cube[i][i][j] == human) {
                o++;
            }
            j--;
        }
        if (x > 0 && o == 0) {
            total += Math.pow(x, 2);
        }
        if (o > 0 && x == 0) {
            total -= Math.pow(o, 2);
        }
        x = 0, o = 0;

        j = 3;
        for (i = 0; i < DIMENSION; i++) {
            if (cube[j][i][j] == ai) {
                x++;
            }
            if (cube[j][i][j] == human) {
                o++;
            }
            j--;
        }
        if (x > 0 && o == 0) {
            total += Math.pow(x, 2);
        }
        if (o > 0 && x == 0) {
            total -= Math.pow(o, 2);
        }
        x = 0, o = 0;

        return total;
    }

    function minimax(depth, maximizingPlayerTurn, alpha, beta) {
        // Note : Here, exeptionally, currentPlayer denotes the player who made the LAST move.
        // This is because we are checking for wins from the LAST turn at the start of current turn.
        currentPlayer = maximizingPlayerTurn ? player2 : player1;
        let winningLine = wincheck();

        if (winningLine.length == DIMENSION) { //base case 1
            // return -100 if minimizing player from last turn made winning move 
            //return 100 if maximizing player from LAST turn made winning move
            return maximizingPlayerTurn ? -100 : 100;
        }

        if (totalMovesLeft == 0 || depth == maxDepth) { //base case 2
            return evaluate();
        }

        let MaxEval = -Number.MAX_VALUE, MinEval = Number.MAX_VALUE; //scores for maximising and minimising players
        //loop through each empty cells
        for (let z = 0; z < DIMENSION; z++) {
            for (let x = 0; x < DIMENSION; x++) {
                for (let y = 0; y < DIMENSION; y++) {
                    if (cube[z][x][y] == emptyGridCellMarker) {

                        //make a move
                        cube[z][x][y] = maximizingPlayerTurn ? player1.marker : player2.marker;
                        lastMove.plane = z;
                        lastMove.row = x;
                        lastMove.col = y;
                        totalMovesLeft--;

                        if (maximizingPlayerTurn) {
                            MaxEval = Math.max(MaxEval, minimax(depth + 1, false, alpha, beta) - depth);
                            alpha = Math.max(alpha, MaxEval);
                        }
                        else {
                            MinEval = Math.min(MinEval, minimax(depth + 1, true, alpha, beta) + depth);
                            beta = Math.min(beta, MinEval);
                        }

                        //undo move
                        cube[z][x][y] = emptyGridCellMarker;
                        totalMovesLeft++;

                        if (beta <= alpha) break;
                    };
                }
            }
        }
        return maximizingPlayerTurn ? MaxEval : MinEval;
    }

    function getComputerMove() {

        // return getComputerRandomMove();
        let bestCoord, MaxScore = -Number.MAX_VALUE;

        //loop through each empty cells
        for (let z = 0; z < DIMENSION; z++) {
            for (let x = 0; x < DIMENSION; x++) {
                for (let y = 0; y < DIMENSION; y++) {
                    if (cube[z][x][y] == emptyGridCellMarker) {

                        //make a move
                        cube[z][x][y] = currentPlayer.marker;
                        lastMove.plane = z;
                        lastMove.row = x;
                        lastMove.col = y;
                        totalMovesLeft--;

                        //calculate score of playing in current empty cell
                        let score = minimax(0, false, -Number.MAX_VALUE, Number.MAX_VALUE);
                        if (score > MaxScore) {
                            bestCoord = [z, x, y];
                            MaxScore = score;
                        }

                        //undo move
                        cube[z][x][y] = emptyGridCellMarker;
                        totalMovesLeft++;
                    };
                }
            }
        }
        currentPlayer = player1;
        return bestCoord;
    }

    function swapTurns() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    function setBoard(cellCoordinates) {
        let z = cellCoordinates[0];
        let x = cellCoordinates[1];
        let y = cellCoordinates[2];

        if (cube[z][x][y] == emptyGridCellMarker) { //valid move

            cube[z][x][y] = currentPlayer.marker;

            lastMove.plane = z;
            lastMove.row = x;
            lastMove.col = y;
            totalMovesLeft--;
            return true;
        }
        return false;
    }

    return { setBoard, getComputerMove, resetGame, swapTurns, wincheck, getCurrentMarkerColour };
};

/**
 * GUI is a module used to handle EVERYTHING related to graphics (sidebar, buttons, grid graphics, ...)
 */
const GUI = (() => {
    const scene = document.querySelector('.scene');
    const DIMENSION = 4;

    (function createBoards() {
        for (let i = 0; i < DIMENSION; i++) {
            let boardElement = document.createElement('div');
            boardElement.classList.add('board');
            for (let j = 0; j < DIMENSION * DIMENSION; j++) { // fill board with cells
                let cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                boardElement.appendChild(cellElement);
            }
            scene.appendChild(boardElement);
        }
    })();

    const boards = document.querySelectorAll('.board');
    const cells = scene.querySelectorAll('.cell');
    const BOARD_TRANSPARENT_COLOUR = 'transparent';
    const BOARD_DEFAULT_COLOUR = 'aliceblue';

    const rotationSliders = document.querySelectorAll('.rotationslider');
    const xSlider = document.getElementById('xSlider');
    const ySlider = document.getElementById('ySlider');
    const zSlider = document.getElementById('zSlider');

    const perspectiveSliders = document.querySelectorAll('.perspectiveslider');
    const persSlider = document.getElementById('Pers');
    const persXSlider = document.getElementById('PersHorizontal');
    const persYSlider = document.getElementById('PersVertical');

    const transparencyCheckbox = document.getElementById('transparent-checkbox');
    const autoRotateCheckbox = document.getElementById('autorotate-checkbox');
    const threeDCheckbox = document.getElementById('threeD-checkbox');

    const DEFAULT_SETTINGS = Object.freeze({
        "rotateX": "20deg",
        "rotateY": "0deg",
        "rotateZ": "0deg",
        "perspective": "460px",
        "perspectiveXorigin": "460%",
        "perspectiveYorigin": "90%",
    });
    // Object.freeze() : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    let currentSettings = {
        "rotateX": "20deg",
        "rotateY": "0deg",
        "rotateZ": "0deg",
        "perspective": "460px",
        "perspectiveXorigin": "460%",
        "perspectiveYorigin": "90%",
    };
    const resetSettingsBtn = document.getElementById('reset-btn');

    function clearBoard() {
        cells.forEach(cell => {
            cell.style.backgroundColor = BOARD_DEFAULT_COLOUR;
            cell.classList.remove('winning-cell');
            cell.classList.remove('not-allowed');
        });
    }

    function displayMove(cellElement, markerColour) {
        cellElement.style.backgroundColor = markerColour;
        cellElement.classList.add('not-allowed');
    }

    function displayWinningLine(winningLineCoords) {
        for (let [z, x, y] of winningLineCoords) {
            let cell = getCellElement([z, x, y]);
            cell.classList.add('winning-cell');
        }
    }

    function displayCoordinates() {
        cells.forEach(cell => {
            let coord = getCellCartesianCoordinate(cell);
            cell.textContent = `(${coord[0]}, ${coord[1]}, ${coord[2]})`;
        });
    };

    function getCellCartesianCoordinate(cellElement) {
        for (let z = 0; z < DIMENSION; z++) {
            let board = boards[z];
            let boardCells = board.querySelectorAll('.cell');
            for (let i = 0; i < DIMENSION * DIMENSION; i++) {
                let row = Math.floor(i / DIMENSION);
                let col = i % DIMENSION;
                if (cellElement == boardCells[i]) {
                    return [z, row, col];
                }
            }
        }
        return [-1, -1, -1]; //for error checking
    }

    function getCellElement(coordinatesList) {
        let z, x, y;
        [z, x, y] = coordinatesList;
        return boards[z].querySelectorAll('.cell')[DIMENSION * x + y];
    }

    function getAllCells() {
        return cells;
    }

    function setBoardTransformations(setting) {
        //rotate board
        rotateBoard(parseInt(setting.rotateX),
            parseInt(setting.rotateY),
            parseInt(setting.rotateZ));

        //change scene perspective
        updateScenePerspective(parseInt(setting.perspective),
            parseInt(setting.perspectiveXorigin),
            parseInt(setting.perspectiveYorigin));
    }

    function toggle3DMode() {
        if (threeDCheckbox.checked) { //disable 3D mode
            //save current 3D settings
            currentSettings.rotateX = `${xSlider.value}${xSlider.dataset.unit}`;
            currentSettings.rotateY = `${ySlider.value}${ySlider.dataset.unit}`;
            currentSettings.rotateZ = `${zSlider.value}${zSlider.dataset.unit}`;
            currentSettings.perspective = `${persSlider.value}${persSlider.dataset.unit}`;
            currentSettings.perspectiveXorigin = `${persXSlider.value}${persXSlider.dataset.unit}`;
            currentSettings.perspectiveYorigin = `${persYSlider.value}${persYSlider.dataset.unit}`;

            //remove any current transformations
            scene.classList.add('disable3Dscene');
            rotateBoard(0, 0, 0);
            toggleAutoRotation(false);

            //turn of all sliders
            togglePerspectiveSliders(false);
            toggleRotateSliders(false);

            //turn off autorotate checkbox
            autoRotateCheckbox.setAttribute('disabled', 'true');
            autoRotateCheckbox.checked = false;

        } else { //activate 3D mode
            scene.classList.remove('disable3Dscene');
            togglePerspectiveSliders(true);
            toggleRotateSliders(true);
            autoRotateCheckbox.removeAttribute('disabled');
            setBoardTransformations(currentSettings);
        }
    }

    function rotateBoard(x, y, z) {
        //set slider value
        xSlider.value = x;
        ySlider.value = y;
        zSlider.value = z;

        //update slider displayed values
        document.getElementById('xval').textContent = xSlider.value;
        document.getElementById('yval').textContent = ySlider.value;
        document.getElementById('zval').textContent = zSlider.value;

        //perform rotation
        boards.forEach(board => {
            board.style.transform = `rotateX(${xSlider.value}deg) rotateY(${ySlider.value}deg) rotateZ(${zSlider.value}deg)`;
        });
    }

    function toggleRotateSliders(activate) {
        rotationSliders.forEach(slider => {
            if (activate) {
                slider.removeAttribute('disabled');
            } else {
                slider.setAttribute('disabled', 'true');
            }
        });
    }

    function togglePerspectiveSliders(activate) {
        perspectiveSliders.forEach(slider => {
            if (activate) {
                slider.removeAttribute('disabled');
            } else {
                slider.setAttribute('disabled', 'true');
            }
        });
    }
    function toggleAutoRotation(activate) {
        boards.forEach(board => {
            if (activate) {
                board.classList.add('animateAutoRotate');
            } else {
                board.classList.remove('animateAutoRotate');
            }
        });
    }

    function toggleBoardTransparency() {
        boards.forEach(board => {

            //make board color transparent 
            board.style.backgroundColor = transparencyCheckbox.checked ?
                BOARD_TRANSPARENT_COLOUR : BOARD_DEFAULT_COLOUR;

            let boardCells = board.querySelectorAll('.cell');
            boardCells.forEach(cell => {
                //make empty cells transparent
                let currentCellColor = cell.style.backgroundColor;
                if (transparencyCheckbox.checked && currentCellColor ==
                    BOARD_DEFAULT_COLOUR) {
                    cell.style.backgroundColor = BOARD_TRANSPARENT_COLOUR;
                }
                if (!transparencyCheckbox.checked && currentCellColor ==
                    BOARD_TRANSPARENT_COLOUR) {
                    cell.style.backgroundColor = BOARD_DEFAULT_COLOUR;
                }
            });
        });
    }

    function updateScenePerspective(perspective, xperspective, yperspective) {
        //set slider values
        persSlider.value = perspective;
        persXSlider.value = xperspective;
        persYSlider.value = yperspective;

        //update slider displayed values
        document.getElementById('pval').textContent = persSlider.value;
        document.getElementById('phval').textContent = persXSlider.value;
        document.getElementById('pvval').textContent = persYSlider.value;

        scene.style.perspective = `${persSlider.value}${persSlider.dataset.unit}`;
        scene.style.perspectiveOrigin = `${persXSlider.value}${persXSlider.dataset.unit} ${persYSlider.value}${persYSlider.dataset.unit}`;
    }

    // Allow user to reset board settings
    resetSettingsBtn.addEventListener('click', () => {
        //make board opaque
        transparencyCheckbox.checked = false;
        toggleBoardTransparency();

        // desactivate autorotate
        autoRotateCheckbox.checked = false;
        toggleAutoRotation(false);

        //activate 3D mode
        threeDCheckbox.checked = false;
        for (let key in DEFAULT_SETTINGS) { //reset current settings
            currentSettings[key] = DEFAULT_SETTINGS[key];
        }
        toggle3DMode();

    })

    // Allow user to change rotation and perspective with sliders
    perspectiveSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            e.preventDefault();
            updateScenePerspective(persSlider.value, persXSlider.value, persYSlider.value);
        });
    });

    rotationSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            e.preventDefault();
            rotateBoard(xSlider.value, ySlider.value, zSlider.value);
        });
    });

    // Implement toggle 3D effect feature
    threeDCheckbox.addEventListener('input', toggle3DMode);

    // Implement toggle auto rotation feature
    autoRotateCheckbox.addEventListener('input', () => {
        toggleAutoRotation(autoRotateCheckbox.checked);
        toggleRotateSliders(!autoRotateCheckbox.checked);
    })

    // Implement toggle transparency feature
    transparencyCheckbox.addEventListener('input', toggleBoardTransparency);

    // Initialise
    setBoardTransformations(DEFAULT_SETTINGS);

    // Setup Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    return {
        displayMove, getCellCartesianCoordinate, getCellElement,
        getAllCells, clearBoard, displayCoordinates,
        displayWinningLine
    };
})();

/**
 * driver module connects GUI and gameFactory.
 */
const driver = (() => {
    const cells = GUI.getAllCells();
    const onePlayerRadio = document.getElementById('onePlayerRadio');
    const restartGameBtn = document.getElementById('restart-btn');
    let myGame = gameFactory('john', 'sophie');

    let playerCount; //playerCount must not change mid-game

    function disableUserInput() {
        cells.forEach(cell => {
            cell.removeEventListener('click', processUserInput);
        });
    }

    function processUserInput(e) {
        const DIMENSION = 4;
        const cellElement = e.target;
        const cellCoords = GUI.getCellCartesianCoordinate(cellElement);
        const validInput = myGame.setBoard(cellCoords);

        if (validInput) {
            GUI.displayMove(cellElement, myGame.getCurrentMarkerColour());

            let winningLine = myGame.wincheck();
            if (winningLine.length == DIMENSION) {
                // console.log(winningLine);
                GUI.displayWinningLine(winningLine);
                disableUserInput();
                return;
            } else {
                myGame.swapTurns();
                if (playerCount == 1) {
                    computerPlay();
                }
            }
        }
    }

    function computerPlay() {
        //disable user input
        disableUserInput();

        // get computer's move
        // NOTE : computer always returns a valid move
        let computerMove = myGame.getComputerMove();
        let cellElement = GUI.getCellElement(computerMove);
        myGame.setBoard(computerMove);

        // display computer's move
        GUI.displayMove(cellElement, myGame.getCurrentMarkerColour());

        //check for win
        const DIMENSION = 4;
        let winningLine = myGame.wincheck();
        if (winningLine.length == DIMENSION) {
            GUI.displayWinningLine(winningLine);
            return;
        } else {
            myGame.swapTurns();
            //enable user input
            cells.forEach(cell => {
                cell.addEventListener('click', processUserInput);
            });
        }
    }

    function startNewGame() {
        myGame.resetGame();
        GUI.clearBoard();
        disableUserInput();

        playerCount = onePlayerRadio.checked ? 1 : 2;
        if (playerCount == 2) {
            //if game was restarted mid-game, cells already have event listeners on them.
            //if game was restarted after a win, cells have no event listeners on them.
            //To standardise, remove EV from all cells then add again to prevent duplicate EV on cell
            disableUserInput();
            cells.forEach(cell => {
                cell.addEventListener('click', processUserInput);
            });
        } else {
            computerPlay();
        }
    };
    // Implement restart game feature
    restartGameBtn.addEventListener('click', startNewGame);
    return { startNewGame };
})();

driver.startNewGame();
