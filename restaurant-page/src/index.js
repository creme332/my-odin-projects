//import styles
import './reset.css';
import './style.css';

//import toggle navbar icon
import toggleSVG from './assets/menu.svg';

//import my modules
import { createHtmlElement } from './helper';
import { HomePageFactory } from './home';
import { MenuPageFactory } from './menu';
import { GalleryPageFactory } from './gallery';

const driver = (() => {
  const main = createHtmlElement('main', 'content', null, null, null);
  document.querySelector('body').appendChild(main);

  const homePage = HomePageFactory(main);
  const menuPage = MenuPageFactory(main);
  const galleryPage = GalleryPageFactory(main);

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
    for (let i = 1; i < tabElements.length - 2; i++) {
      tabElements[i].addEventListener('click', switchTab);
    }

    //add event listener to toggle btn
    toggleBtn.addEventListener('click', toggleNav);
  };

  function toggleNav() {
    const unorderedList = document.querySelector('ul');
    unorderedList.classList.toggle('active');
  }

  function switchTab(e) {
    const selectedTab = e.target.textContent;
    if (fakeTabs.includes(selectedTab) || selectedTab == currentTab) return;

    //remove current tab
    if (currentTab == 'home') homePage.removeHomeTab();
    if (currentTab == 'menu') menuPage.removeMenuTab();
    if (currentTab == 'gallery') galleryPage.removeGalleryTab();

    //change color in nav bar
    colorNavBar(selectedTab);

    //load new tab
    if (selectedTab == 'home') {
      homePage.displayHomeTab();
    }
    if (selectedTab == 'menu') {
      menuPage.displayMenuTab();
    }
    if (selectedTab == 'gallery') {
      galleryPage.displayGalleryTab();
    }

    currentTab = selectedTab;
  }

  function colorNavBar(selectedTab) {
    let index = tabNames.findIndex((el) => { return el == selectedTab });
    const tabElements = document.querySelector('nav').querySelectorAll('li:not([id*="toggle-nav-bar"]');
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

  colorNavBar('home');
  homePage.displayHomeTab();
  // galleryPage.displayGalleryTab();
  // menuPage.displayMenuTab();

})();
