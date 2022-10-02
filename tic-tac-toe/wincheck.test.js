const winCheck = require('./wincheck');
const playerMarker1 = 1;
const playerMarker2 = 2;
// Notes :
// - When comparing answer and expected answer, 
//   ignore order of inner list but not order of coordinates : https://stackoverflow.com/a/53358419/17627866. 

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
    const lastMove1 = { "plane": 0, "row": 0, "col": 0 };
    expect(winCheck(cube, lastMove1, playerMarker1)).toStrictEqual([]);
});

// SINGLE PLANE 
test('1 plane row check', () => {
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
    const ExpectedAnswer = [[1, 3, 0], [1, 3, 1], [1, 3, 2], [1, 3, 3]];
    const lastMove1 = { "plane": 1, "row": 3, "col": 2 };
    const lastMove2 = { "plane": 2, "row": 3, "col": 2 };

    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toStrictEqual(new Set(ExpectedAnswer));
    expect((winCheck(cube, lastMove2, playerMarker1))).toStrictEqual([]);

});

test('1 plane column check', () => {
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
    const ExpectedAnswer = [[2, 0, 1], [2, 1, 1], [2, 2, 1], [2, 3, 1]];
    const lastMove1 = { "plane": 2, "row": 2, "col": 1 };
    const lastMove2 = { "plane": 2, "row": 3, "col": 3 };
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toStrictEqual(new Set(ExpectedAnswer));
    expect((winCheck(cube, lastMove2, playerMarker1))).toStrictEqual([]);
});

test('1 plane positive diagonal check', () => {
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
    const lastMove1 = { "plane": 2, "row": 0, "col": 3 };
    const lastMove2 = { "plane": 2, "row": 3, "col": 3 };
    expect(new Set(winCheck(cube, lastMove1, playerMarker2))).toStrictEqual(new Set(ExpectedAnswer));
    expect((winCheck(cube, lastMove2, playerMarker2))).toStrictEqual([]);
});

test('1 plane negative diagonal check', () => {
    const cube = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 1]
        ],
        [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 2]
        ]
    ];
    const ExpectedAnswer = [[3, 0, 0], [3, 1, 1], [3, 2, 2], [3, 3, 3]];
    const lastMove1 = { "plane": 3, "row": 2, "col": 2 };
    const lastMove2 = { "plane": 2, "row": 0, "col": 0 };
    expect(new Set(winCheck(cube, lastMove1, playerMarker2))).toStrictEqual(new Set(ExpectedAnswer));
    expect((winCheck(cube, lastMove2, playerMarker2))).toStrictEqual([]);
});


// MULTI-PLANE
test('multi-plane vertical check', () => {
    const cube = [
        [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 2, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    const ExpectedAnswer = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]];
    const lastMove1 = { "plane": 0, "row": 0, "col": 0 };
    const lastMove2 = { "plane": 2, "row": 1, "col": 0 };
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toStrictEqual(new Set(ExpectedAnswer));
    expect((winCheck(cube, lastMove2, playerMarker2))).toStrictEqual([]);
});

test('multi-plane line A1', () => {
    const cube = [
        [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 0, "col": 0 };
    const ExpectedAnswer = [[0, 0, 0], [1, 0, 1], [2, 0, 2], [3, 0, 3]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toStrictEqual(new Set(ExpectedAnswer));
});

test('multi-plane line A4', () => {
    const cube = [
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 0, "col": 3 };
    const ExpectedAnswer = [[0, 0, 3], [1, 0, 2], [2, 0, 1], [3, 0, 0]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toStrictEqual(new Set(ExpectedAnswer));
});

test('multi-plane line B1', () => {
    const cube = [
        [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 0, "col": 0 };
    const ExpectedAnswer = [[0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});

test('multi-plane line B13', () => {
    const cube = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 3, "col": 0 };
    const ExpectedAnswer = [[0, 3, 0], [1, 2, 0], [2, 1, 0], [3, 0, 0]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});

test('multi-plane line C1', () => {
    const cube = [
        [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 1]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 0, "col": 0 };
    const ExpectedAnswer = [[0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});

test('multi-plane line C4', () => {
    const cube = [
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 0, "col": 3 };
    const ExpectedAnswer = [[0, 0, 3], [1, 1, 2], [2, 2, 1], [3, 3, 0]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});

test('multi-plane line C13', () => {
    const cube = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 3, "col": 0 };
    const ExpectedAnswer = [[0, 3, 0], [1, 2, 1], [2, 1, 2], [3, 0, 3]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});

test('multi-plane line C16', () => {
    const cube = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ];
    const lastMove1 = { "plane": 0, "row": 3, "col": 3 };
    const ExpectedAnswer = [[0, 3, 3], [1, 2, 2], [2, 1, 1], [3, 0, 0]];
    expect(new Set(winCheck(cube, lastMove1, playerMarker1))).toEqual(new Set(ExpectedAnswer));
});
