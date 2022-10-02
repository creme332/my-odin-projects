
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
 * @param {*} cube  // 3D list representing state of game.
 * @returns {[2D list]} 
 */
function wincheck(cube) {
    const DIMENSION = 4;
    const EMPTYCELL = 0;

    //check horizontally 1D
    for (let z = 0; z < DIMENSION; z++) {
        let board = cube[z];
        for (let i = 0; i < DIMENSION; i++) { //row
            let winningCoord = [[z, i, 0]]; //list of coordinates of points on winning line
            for (let j = 1; j < DIMENSION; j++) { //col
                //check i-th row
                if (board[i][j] == board[i][j - 1] && board[i][j] != EMPTYCELL) {
                    winningCoord.push([z, i, j]);
                } else {
                    winningCoord = [[z, i, j]];
                }
            }
            if (winningCoord.length == DIMENSION) {
                return winningCoord;
            }
        }
    }

    //check vertically 1D
    for (let z = 0; z < DIMENSION; z++) {
        let board = cube[z];
        for (let col = 0; col < DIMENSION; col++) {

            let winningCoord = [[z, 0, col]]; //list of coordinates of points on winning line

            for (let row = 1; row < DIMENSION; row++) {
                //check i-th column
                if (board[row][col] == board[row - 1][col] && board[row][col] != EMPTYCELL) {
                    winningCoord.push([z, row, col]);
                } else {
                    winningCoord = [[z, row, col]];
                }
            }
            if (winningCoord.length == DIMENSION) {
                return winningCoord;
            }
        }
    }

    //check positive diagonal 1D
    for (let z = 0; z < DIMENSION; z++) {
        let board = cube[z];
        let winningCoord = [[z, DIMENSION - 1, 0]];

        let col = 0;
        for (let row = DIMENSION - 1; row > 0; row--) {
            if (board[row][col] == board[row - 1][col + 1] && board[row][col] != EMPTYCELL) {
                winningCoord.push([z, row, col]);
            } else {
                winningCoord = [[z, row, col]];
            }
            col++;
        }

        if (winningCoord.length == DIMENSION) {
            return winningCoord;
        }
    }

    //check negative diagonal 1D
    for (let z = 0; z < DIMENSION; z++) {
        let board = cube[z];
        let winningCoord = [[z, 0, 0]];

        for (let row = 0; row < DIMENSION - 1; row++) {
            if (board[row][row] == board[row + 1][row + 1] && board[row][row] != EMPTYCELL) {
                winningCoord.push([z, row, row]);
            } else {
                winningCoord = [[z, row, row]];
            }
        }

        if (winningCoord.length == DIMENSION) {
            return winningCoord;
        }
    }

    //no win yet
    return [];
}
module.exports = wincheck;

