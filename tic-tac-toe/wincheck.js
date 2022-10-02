
//no need to return winner. after player makes a move, wincheck. if yes, current player = winner
function wincheck(cube) {
    const DIMENSION = 4;
    const EMPTYCELL = 0;
    //cube is a 3D array

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

    //no win yet
    return [];
}
const cube = [
    [
        [0, 0, 0, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 1]
    ],
    [
        [0, 0, 0, 2],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 2],
        [0, 0, 2, 0],
        [0, 2, 0, 0],
        [2, 0, 0, 0]
    ],
    [
        [2, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 2, 1]
    ]
];
wincheck(cube);
module.exports = wincheck;

