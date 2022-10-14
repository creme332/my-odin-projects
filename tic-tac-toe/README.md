# 🎮 Tic-Tac-Toe (Qubic)
![HTML5 shield](https://img.shields.io/badge/-HTML5-blue)
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![CSS3 shield](https://img.shields.io/badge/-CSS3-orange)
![Jest shield](https://img.shields.io/badge/-Jest-red)
![Boostrap shield](https://img.shields.io/badge/Bootstrap-5.2.2-brightgreen)

Play 3D Tic-Tac-Toe on a free-to-rotate 4x4x4 grid against a friend or an AI. 

![GIF of game](assets/ttt.gif)

[▶ Live Preview](https://creme332.github.io/my-odin-projects/tic-tac-toe/)

# Features
- 2-player and AI modes.  
- 3D free-to-move 4x4x4 grid.
- Tooltip explanations for settings.
- Winning cells are highlighted.
- Responsive website.

# Usage

## How to play

After choosing a game mode, click on "Restart game" button.

Players take turns placing their markers in blank cells in the array. The first player to place four of their own markers in a line wins. The winning line can be horizontal, vertical, or diagonal on a single board as in regular tic-tac-toe, or vertically in a column, or a diagonal line through four boards. 

Here's a **non-exhaustive** list of possible winning lines :
![A diagram showing all possible lines which passes thrugh exactly 4 boards](assets/wins.png)

More information about the 76 possible winning lines can be found in `wincheck.js`.

## Settings
The sliders are not for cosmetic purposes and can be used to visualise the winning lines better. 

If auto-rotate is on and the the rotating grid is not fully visible, try increasing `perspective`. For explantion on the settings, hover on the `i` icon
![Bootstrap popover explanation for perspective](assets/hover.png) 



## AI
AI uses minimax algorithm with alpha-beta pruning. The depth of the minimax algorithm is set to 3. While this depth can be increased to make the AI stronger, the response time of AI will increase significantly and may cause website to crash.

The heuristic for the algorithm can be found [here](https://github.com/ghorned/Qubic#heuristic).

# Installation

Clone repository locally
```bash
git clone git@github.com:creme332/my-odin-projects.git
```

## Testing
`wincheck.test.js` contains a set of tests to verify that the win checking algorithm is working properly. Jest is used for testing.

Move to `tic-tac-toe` project directory.
 ```bash
cd tic-tac-toe 
 ```

Install dependencies 
```
npm install
```
Run tests 
 ```
 npm run test
 ```

# References

Resource | How I used it
---|---
[Jest](https://jestjs.io/docs/getting-started)  | For testing win-checking algorithm
[Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) | To implement sidebar
[Heuristic for minimax algorithm](https://github.com/ghorned/Qubic#heuristic) | Heuristic algorithm for Qubic AI
[Game 1](https://www.mathsisfun.com/games/foursight-3d-tic-tac-toe.html), [Game 2](https://github.com/klimbin/Qubic) | For inspiration
[Codewars kata](https://www.codewars.com/kata/5aa67541373c2e69a20000c9) | To test win-checking algorithm
 [Link 1](https://css-tricks.com/how-css-perspective-works/), [Link 2](https://3dtransforms.desandro.com/perspective)| For reference on CSS Perspective
[MIT video](https://www.youtube.com/watch?v=STjW3eH0Cik&ab_channel=MITOpenCourseWare), [Sebastian Lague video](https://www.youtube.com/watch?v=l-hh51ncgDI&t=142s&ab_channel=SebastianLague)| To implement minimax algorithm with alpha-beta pruning.

# License 
MIT

# To-Do
- [ ] Add possibility to control sliders with mouse (eg scroll wheel changes perspective)
- [ ] Improve UI
- [ ] Add "How to play" popover.
- [ ] Add varying difficulty levels for 1-player
- [ ] Improve win-checking algorithm for Case 3, 4.
- [ ] Test all 76 possible winning lines with Jest.

### Done
- [x] Add docstring to functions.
- [x] rename IDs in HTML to be more meaningful.
- [x] Fix : cannot toggle transparency properly midgame
- [x] Add AI.
- [x] Implement 1-player mode.
- [x] Implement restart button.
- [x] Make website responsive.
- [x] Highlight the winning cells. 
- [x] Use data-unit.
- [x] Add tool tip explanation for perspective,...
- [x] Add top view of grid.
- [x] Add option to toggle off 3D effect.
- [x] Add settings.
- [x] Use strict mode.
- [x] Fix bug related to ToStrictEqual
