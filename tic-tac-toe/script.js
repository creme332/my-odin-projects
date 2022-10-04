'use strict';

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

    function swapTurns() {
        currentPlayer = currentPlayer == player1.name ? player2.name : player1.name;
    }

    function setBoard(coordinates, playermarker) {
        return
    }

    return { swapTurns };
};

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

    const transparencyCheckbox = document.getElementById('transparent-button');
    const autoRotateCheckbox = document.querySelector('#autorotate-button');
    const threeDCheckbox = document.querySelector('#threeD-button');

    const DEFAULT_SETTINGS = Object.freeze({
        "rotateX": "20deg",
        "rotateY": "0deg",
        "rotateZ": "0deg",
        "perspective": "460px",
        "perspectiveXorigin": "460%",
        "perspectiveYorigin": "90%",
    });
    // Object.freeze() purpose : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    let currentSettings = {
        "rotateX": "20deg",
        "rotateY": "0deg",
        "rotateZ": "0deg",
        "perspective": "460px",
        "perspectiveXorigin": "460%",
        "perspectiveYorigin": "90%",
    };
    const resetSettingsBtn = document.getElementById('resetbutton');

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
            board.style.backgroundColor = transparencyCheckbox.checked ?
                BOARD_TRANSPARENT_COLOUR : BOARD_DEFAULT_COLOUR;
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

    // TAKE USER INPUT
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            console.log(e.button);
            e.target.style.background = 'red';
        })
    });

    // Initialise
    setBoardTransformations(DEFAULT_SETTINGS);

    // Setup Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    return {};
})();

let newGame = gameFactory('john', 'sophie');
