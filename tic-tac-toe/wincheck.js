"use strict";

/* CALCULATE THE NUMBER OF WINNING LINES in 4x4x4 TTT

Case 1 : Winning lines across a single board { 4x10 lines }
    4 horizontal, 4 vertical, 2 diagonals
    

Case 2 : 1D vertical lines across all 4 boards { 16 lines }
    Connect cells having same (row, column).

Case 3 : 2D lines across all 4 boards { 16 lines }
    Case 3.1 : Lines have no displacement row-wise { 8 lines }
        Start line at the following positions in top board :
        _______________ 
       | 1 |   |   | 5 |
       | 2 |   |   | 6 |
       | 3 |   |   | 7 |
       | 4 |   |   | 8 |
        ▔▔▔▔▔▔▔▔
        End line at the following positions in bottom-most board :
        _______________ 
       | 5 |   |   | 1 |
       | 6 |   |   | 2 |
       | 7 |   |   | 3 |
       | 8 |   |   | 4 |
        ▔▔▔▔▔▔▔▔

    Case 3.2 : Lines have no displacement column-wise { 8 lines }
        Start line at the following positions in top board :
        _______________ 
       | 1 | 2 | 3 | 4 |
       |   |   |   |   |
       |   |   |   |   |
       | 5 | 6 | 7 | 8 |
        ▔▔▔▔▔▔▔▔
        End line at the following positions in bottom-most board :
        _______________ 
       | 5 | 6 | 7 | 8 |
       |   |   |   |   |
       |   |   |   |   |
       | 1 | 2 | 3 | 4 |
        ▔▔▔▔▔▔▔▔
        
Case 4 : 3D slanted lines across all 4 boards  { 4 lines }
    Start line at the following positions in top board :
        _______________ 
       | 1 |   |   | 2 |
       |   |   |   |   |
       |   |   |   |   |
       | 4 |   |   | 4 |
        ▔▔▔▔▔▔▔▔
    End line at the following positions in bottom-most board :
        _______________ 
       | x |   |   | 3 |
       |   |   |   |   |
       |   |   |   |   |
       | 2 |   |   | 1 |
        ▔▔▔▔▔▔▔▔
    4 corners => 4 lines

Total winning lines = 40 + 16 + 16 + 4 = 76

*/

/* Another method to check for wins. 

Store all possible |directions| .
Using lastMove as starting point, count markers in all possible directions before and after.

*/

function wincheck(cube, lastMove, playerMarker) {
    const DIMENSION = cube.length; //4x4x4
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

    // The code below Case 3, 4 is NON_OPTIMAL.

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
module.exports = wincheck; //for jest
const cube = [
    [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 2, 2, 2]
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

const ExpectedAnswer = [
    [0, 0, 3],
    [0, 1, 2],
    [0, 2, 1],
    [0, 3, 0]
];
const lastMove1 = { "plane": 0, "row": 0, "col": 3 };
console.log(wincheck(cube, lastMove1, 1));