//import assets
import bottleImg from './assets/bottleandglass.gif';
import danceImg from './assets/dancingwomen.gif';
import drugImg from './assets/rotatingpill.gif';

import { createHtmlElement } from './helper';

const HomePageFactory = (main) => {
  
    const card = (title, imageSrc, alt) => {
      return { title, imageSrc, alt };
    };
  
    function displayHomeTab() {
      addLogo();
      addHeadingInfo();
  
      //create cards
      let cardsArray = [];
      cardsArray.push(card('drinks', bottleImg, 'A gif of a neon-style bottle and a glass cheering'));
      cardsArray.push(card('drugs', drugImg, 'A gif of a neon-style pill rotating'));
      cardsArray.push(card('dance', danceImg, 'A gif of a neon-style women dancing'));
  
      //add cards
      addCards(cardsArray);
    };
  
    function removeHomeTab() {
      const h3 = document.querySelector('h3');
      const logo = document.querySelector('#logo');
      const container = document.querySelector('.card-container');
      container.remove();
      logo.remove();
      h3.remove();
    }
  
    function addLogo() {
      const logoName = '大目小明';
      const heading = createHtmlElement('h1', null, ['neonText'], logoName, null);
      const logoContainer = createHtmlElement('div', 'logo', null, null, [heading]);
      main.appendChild(logoContainer);
    };
  
    function addHeadingInfo() {
      const t1 = createHtmlElement('span', null, null, ` over 18's only`, null);
      const anchor = createHtmlElement('a', null, null, 'book here', null);
      anchor.href = '#';
      const heading = createHtmlElement('h3', null, null, null, [anchor, t1]);
      main.appendChild(heading);
    };
  
    function addCards(cardsArray) {
      const cardsContainer = createHtmlElement('div', null, ['card-container'], null, null);
      for (let i = 0; i < cardsArray.length; i++) {
        const cardImg = new Image();
        cardImg.src = cardsArray[i].imageSrc;
        cardImg.alt = cardsArray[i].alt;
        const cardImgContainer = createHtmlElement('div', null, ['card-image'], null, [cardImg]);
        const cardTitle = createHtmlElement('div', null, ['card-title'], cardsArray[i].title, null);
        const card = createHtmlElement('div', null, ['card'], null, [cardImgContainer, cardTitle]);
        cardsContainer.appendChild(card);
      }
      main.appendChild(cardsContainer);
    };
  
    return { displayHomeTab, removeHomeTab };
  
  };

  export { HomePageFactory }