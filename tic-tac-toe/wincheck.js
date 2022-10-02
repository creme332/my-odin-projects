"use strict";
//no need to return winner. after player makes a move, wincheck. if yes, current player = winner

// https://en.wikipedia.org/wiki/3D_tic-tac-toe#4x4x4,_two-player
// There are 76 winning lines

// Case 1 : 1D winning lines 
// Case 1.1 : Lines across a single board (4 horizontal, 4 vertical, 2 diagonals)
// 10x4 lines
// Case 1.2 : Vertical lines across all 3 boards (refer to images in README)
// 16x1 lines
// Case 2 : 2D lines across all 3 boards ((1,0,1) and (0,1,1) translations)
// 12
// Case 3 : 3D slanted lines across all 3 boards  ((1,1,1) translation)
// 4 lines

/**
 * wincheck() returns a 2D list containing the coordinates of the markers along the winning line.
 * @param {*} cube  // 3D list representing a 4x4x4 cube with markers.
 * @returns {[2D list]} // a 2D list of length 4 or an empty list
 */
function wincheck(cube, lastMove, playerMarker) {
    const DIMENSION = cube.length; //4x4x4
    let winningCoord = []; //list of coordinates of points on winning line. Format: (plane number, row, column)
    const board_1D = cube[lastMove.plane]; // board on which player made a move 

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

        for (let row = DIMENSION - 1; row > 0; row--) { //start checking from bottom left corner
            let col = (DIMENSION - 1) - row;
            if (board_1D[row][col] == board_1D[row - 1][col + 1] && board_1D[row][col] == playerMarker) {
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
    for (let plane = 0; plane < DIMENSION - 1; plane++) {
        if (cube[plane][lastMove.row][lastMove.col] == cube[plane + 1][lastMove.row][lastMove.col] && cube[plane][lastMove.row][lastMove.col] == playerMarker) {
            winningCoord.push([plane, lastMove.row, lastMove.col]);
        } else {
            break;
        }
    }
    if (winningCoord.length == DIMENSION) {
        return winningCoord;
    }

    // At this point, Case 1 been tested.

    //Case 3 : A 3D line spanning across all 3 planes

    let startingCoords = [ //corners of top plane in (plane, row, column) format
        [0, 0, 0], //top left 
        [0, DIMENSION - 1, 0], //bottom left 
        [0, 0, DIMENSION - 1], //top right
        [0, DIMENSION - 1, DIMENSION - 1] //bottom right
    ];
    let dz = [1, 1, 1, 1]; //change in plane
    let dx = [1, -1, 1, -1]; //change in row
    let dy = [1, 1, -1, -1]; //change in column

    for(let i=0;i<DIMENSION;i++){
        let corner= startingCoords[i];
        let plane = corner[0];
        let row = corner[1];
        let col = corner[2];

        while(plane>-1 && row>-1 && col>-1 && plane<DIMENSION-1 && row<DIMENSION-1 && col<DIMENSION-1){

        }
    }

    //no win yet
    return [];
}
module.exports = wincheck;

