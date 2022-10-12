//import stylesheets
import './reset.css';
import './style.css';

//import assets
import bottleImg from './assets/bottleandglass.gif';
import danceImg from './assets/dancingwomen.gif';
import drugImg from './assets/rotatingpill.gif';
import font from './assets/marqueem.ttf';

//import my modules
import { createHtmlElement } from './helper';

const k  = createHtmlElement('main','content',null,null,null);
document.querySelector('body').appendChild(k);

(function loadFont() {
  const new_font = new FontFace('marqueem', `url(${font})`);

  new_font.load().then(function (loaded_face) {
    document.fonts.add(loaded_face);
  }).catch(function (error) {
    alert('Font was not properly loaded !', error);
  });

})();

const card = (title, imageSrc, alt) => {
  return { title, imageSrc, alt };
};

(function addNavBar() {
  const main = document.getElementById('content');
  const unorderedList = document.createElement('ul');
  const values = ['home', 'menu', 'gallery', 'contact', 'book'];
  values.forEach(val => {
    unorderedList.appendChild(createHtmlElement('li', null, null, val, null));
  });
  const navBar = createHtmlElement('nav', null, null, null, [unorderedList]);
  main.appendChild(navBar);
})();

const menu = (() => {
  const main = document.getElementById('content');

  (function createMenu() {
    addLogo();
    addHeadingInfo();

    //create cards
    let cardsArray = [];
    cardsArray.push(card('drinks', bottleImg, 'A gif of a neon-style bottle and a glass cheering'));
    cardsArray.push(card('drugs', drugImg, 'A gif of a neon-style pill rotating'));
    cardsArray.push(card('dance', danceImg, 'A gif of a neon-style women dancing'));

    //add cards
    addCards(cardsArray);
  })();

  function addLogo() {
    const logoName = 'Adult Eats';
    const heading = createHtmlElement('h1', null, ['neonText'], logoName, null);
    const logoContainer = createHtmlElement('div', 'logo', null, null, [heading]);
    main.appendChild(logoContainer);
  }

  function addHeadingInfo() {
    const t1 = createHtmlElement('span', null, null, ` over 18's only`, null);
    const anchor = createHtmlElement('a', null, null, 'book here', null);
    anchor.href = '#';
    const heading = createHtmlElement('h3', null, null, null, [anchor, t1]);
    main.appendChild(heading);
  }

  function addCards(cardsArray) {
    const cardsContainer = createHtmlElement('div', null, ['card-container'], null, null);
    for (let i = 0; i < cardsArray.length; i++) {
      const cardImg = new Image();
      cardImg.src = cardsArray[i].imageSrc;
      cardImg.alt = cardsArray[i].alt;
      const cardTitle = createHtmlElement('div', null, ['card-title'], cardsArray[i].title, null);
      const card = createHtmlElement('div', null, ['card'], null, [cardImg, cardTitle]);
      cardsContainer.appendChild(card);
    }
    main.appendChild(cardsContainer);
  }

})();