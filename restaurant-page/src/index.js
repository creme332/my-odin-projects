//import styles
import './reset.css';
import './style.css';
import font from './assets/marqueem.ttf';

import toggleSVG from './assets/menu.svg'
//import my modules
import { createHtmlElement } from './helper';
import { HomePageFactory } from './home';
import { ConcatenationScope } from 'webpack';

(function loadFont() {
  const new_font = new FontFace('marqueem', `url(${font})`);

  new_font.load().then(function (loaded_face) {
    document.fonts.add(loaded_face);
  }).catch(function (error) {
    alert('Font was not properly loaded !', error);
  });

})();

const everything = (() => {
  const main = createHtmlElement('main', 'content', ['home'], null, null);
  document.querySelector('body').appendChild(main);
  const homePage = HomePageFactory(main);

  const tabNames = ['home', 'menu', 'gallery', 'contact', 'book'];
  const fakeTabs = ['contact', 'book']; //tabs which are ignored when clicked on
  let currentTab = 'home';

  function addNavBar() {
    const unorderedList = document.createElement('ul');

    //add toggle button
    const cardImg = new Image(30, 30);
    cardImg.src = toggleSVG;
    cardImg.alt = 'Icon of menu';
    const toggleBtn = createHtmlElement('li', 'toggle-nav-bar', null, null, [cardImg]);
    unorderedList.appendChild(toggleBtn);

    tabNames.forEach(tab => {
      unorderedList.appendChild(createHtmlElement('li', null, null, tab, null));
    });

    const navBar = createHtmlElement('nav', 'nav', null, null, [unorderedList]);
    main.appendChild(navBar);

    //add event listeners to all li except toggle button and last 2
    const tabElements = document.querySelectorAll('li');
    for (let i = 1; i < tabElements.length-2; i++) {
      tabElements[i].addEventListener('click', switchTab);
    }

    //add event listener to toggle btn
    // toggleBtn.addEventListener('click', toggleNav);
  };

  function toggleNav(){
    console.log('hello');
  }
  function switchTab(e) {
    const tabElements = document.querySelectorAll('li');
    const selectedTab = e.target.textContent;
    if (fakeTabs.includes(selectedTab) || selectedTab == currentTab) return;

    //remove current tab
    if (currentTab == 'home') homePage.removeHomeTab();

    //change color in nav bar
    colorNavBar(selectedTab);

    //display new tab
    if (selectedTab == 'home') {
      homePage.displayHomeTab();
    }
    if (selectedTab == 'menu') {
    }
    if (selectedTab == 'gallery') {
    }

    currentTab = selectedTab;

  }

  function colorNavBar(val) {
    let index = tabNames.findIndex((el) => { return el == val });
    const tabElements = document.querySelector('nav').querySelectorAll('li');
    const inactiveTabColor = '#bfbfbf';
    const activeTabColor = 'white';
    //change color of all unselected tabs
    tabElements.forEach(t => t.style.color = inactiveTabColor);
    //change color of selected tab
    tabElements[index].style.color = activeTabColor;
    //keep Book button white
    tabElements[tabElements.length - 1].style.color = activeTabColor;
  }

  addNavBar();
  homePage.displayHomeTab();

})();
