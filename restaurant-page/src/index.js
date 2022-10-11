import './reset.css';
import './style.css';

import myLogo from './assets/giphy.gif';
import font from './assets/marqueem.ttf';

const new_font = new FontFace('marqueem', `url(${font})`);

const el = document.getElementById('content');
// el.textContent = 'menu';

// Add the image to our existing div.
const myIcon = new Image();
myIcon.src = myLogo;

// el.appendChild(myIcon);

new_font.load().then(function (loaded_face) {
  // use font here
  document.fonts.add(loaded_face);
  // el.style.fontFamily = 'marqueem';
}).catch(function (error) {
  alert('Font was not properly loaded !', error);
});
