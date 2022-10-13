//import styles
import './reset.css';
import './style.css';
import font from './assets/marqueem.ttf';

//import my modules
import { createHtmlElement } from './helper';
import { HomePageFactory } from './home';

(function loadFont() {
  const new_font = new FontFace('marqueem', `url(${font})`);

  new_font.load().then(function (loaded_face) {
    document.fonts.add(loaded_face);
  }).catch(function (error) {
    alert('Font was not properly loaded !', error);
  });

})();

const everything = (() => {
  const main = createHtmlElement('main', 'content', null, null, null);
  document.querySelector('body').appendChild(main);
  const tabNames = ['home', 'menu', 'gallery', 'contact', 'book'];

  (function addNavBar() {
    const unorderedList = document.createElement('ul');
    tabNames.forEach(tab => {
      unorderedList.appendChild(createHtmlElement('li', null, null, tab, null));
    });
    const navBar = createHtmlElement('nav', 'nav', null, null, [unorderedList]);
    main.appendChild(navBar);

    //add event listeners
    const tabElements = document.querySelectorAll('li');
    tabElements.forEach(el => el.addEventListener('click', switchTab));

  })();

  function switchTab(e) {
    const tabElements = document.querySelectorAll('li');
    const selectedTab = e.target;
    if (selectedTab.textContent != 'book') {
      colorNavBar(selectedTab.textContent);
    }
  }

  function colorNavBar(val) {
    const values = ['home', 'menu', 'gallery', 'contact', 'book'];
    let index = values.findIndex((el) => { return el == val });

    const valueLi = document.querySelector('nav').querySelectorAll('li');
    const inactiveTabColor = '#bfbfbf';
    const activeTabColor = 'white';
    //change color of all unselected tabs
    valueLi.forEach(t => t.style.color = inactiveTabColor);
    //change color of selected tab
    valueLi[index].style.color = activeTabColor;
    //keep Book button white
    valueLi[valueLi.length - 1].style.color = activeTabColor;
  }

  const homePage = HomePageFactory(main);

  homePage.displayHomeTab();

})();
