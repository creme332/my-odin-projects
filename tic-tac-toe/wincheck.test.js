const winCheck = require('./wincheck');
// Notes :
// - wincheck function returns a 2D list
test('Empty cube', () => {
    const cube = [
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
    expect(winCheck(cube)).toStrictEqual([]);
});

test('1D row check', () => {
    const cube = [
        [
            [1, 0, 1, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 1],
            [2, 0, 2, 0],
            [0, 0, 2, 0],
            [1, 1, 1, 1]
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
    //cube[1][3]
    expect(winCheck(cube)).toStrictEqual([[1, 3, 0], [1, 3, 1], [1, 3, 2], [1, 3, 3]]);
});

test('1D column check', () => {
    const cube = [
        [
            [0, 0, 0, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    ];
    expect(winCheck(cube)).toStrictEqual([[2, 0, 1], [2, 1, 1], [2, 2, 1], [2, 3, 1]]);
});

test('1D positive diagonal check', () => {
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

    const ExpectedAnswer = [
        [2, 0, 3],
        [2, 1, 2],
        [2, 2, 1],
        [2, 3, 0]
    ];

    // Ignore order of inner list but not order of coordinates : https://stackoverflow.com/a/53358419/17627866. 
    expect(new Set(winCheck(cube))).toStrictEqual(new Set(ExpectedAnswer));
});

test.skip('1D negative diagonal check', () => {
    expect(winCheck(cube)).toStrictEqual([[2, 0, 1], [2, 1, 1], [2, 2, 1], [2, 3, 1]]);
});