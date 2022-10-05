# 🎮 Tic-Tac-Toe (Qubic)
![HTML5 shield](https://img.shields.io/badge/-HTML5-blue)
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![CSS3 shield](https://img.shields.io/badge/-CSS3-orange)
![Jest shield](https://img.shields.io/badge/-Jest-red)
![Boostrap shield](https://img.shields.io/badge/Bootstrap-5.2.2-brightgreen)

Play 3D Tic-Tac-Toe on a 4x4x4 grid. Players take turns placing their markers in blank cells in the array. The first player to place four of their own markers in a line wins. The winning line can be horizontal, vertical, or diagonal on a single board as in regular tic-tac-toe, or vertically in a column, or a diagonal line through four boards.  

![](assets/2022-10-01-11-18-20.png)

[▶ Live Preview](https://creme332.github.io/my-odin-projects/tic-tac-toe/)

AI uses minimax algorithm with alpha-beta pruning.

# 🚀Features
- 2-player mode and AI mode.
 - 3D free-to-move 4x4x4 grid.
 - Tooltip explanations for settings.
 - Winning cells are highlighted.
 - Responsive website.

# 📌 Resources

Resource | How I used it
---|---
[Jest](https://jestjs.io/docs/getting-started)  | For testing win-checking algorithm
[Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) | To implement sidebar
[Qubic game 1](https://www.mathsisfun.com/games/foursight-3d-tic-tac-toe.html) | For inspiration
[Codewars](https://www.codewars.com/kata/5aa67541373c2e69a20000c9) | For testing win-checking algorithm
 [Link 1](https://css-tricks.com/how-css-perspective-works/), [Link 2](https://3dtransforms.desandro.com/perspective)| For reference on CSS Perspective
 [Qubic game 2](https://github.com/klimbin/Qubic) | 
[MIT video](https://www.youtube.com/watch?v=STjW3eH0Cik&ab_channel=MITOpenCourseWare), [Sebastian Lague video](https://www.youtube.com/watch?v=l-hh51ncgDI&t=142s&ab_channel=SebastianLague)| To refresh my memory on minimax algorithm.

# 🔨 To-Do
- [ ] Add docstring to functions.
- [ ] Improve [win-checking algorithm](https://www.codewars.com/kata/5aa67541373c2e69a20000c9/solutions/javascript) for Case 3, 4.
- [ ] Test all 76 possible winning lines with Jest.

### ✔ Done
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
