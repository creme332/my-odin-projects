import { createHtmlElement } from './helper';

const MenuPageFactory = (main) => {

  const menuItem = (title, ingredients, cost) => {
    return { title, ingredients, cost };
  };

  function displayMenuTab() {
    main.classList.add('menu');

    //create menus
    let menuArray = [];
    menuArray.push(menuItem('benedict', 'eggs, hollandaise, bacon, ham, smoked cheese', '$12.50'));
    menuArray.push(menuItem('chicken', 'chicken, hollandaise, bacon, ham, smoked cheese', '$16.95'));
    menuArray.push(menuItem('jerk sandwich', 'jamaican jerk chicken, avocado, grilled pineapple, roasted red pepper, mayo', '$16.95'));
    menuArray.push(menuItem('salad board', 'crispy teriyaki aubergine, pickled watermelon, mixed berries, cauliflower', '$5.85'));
    menuArray.push(menuItem('druggie', 'pure cocaine, watermelon, coconut', '$69.85'));
    //add cards
    addMenuItem(menuArray);
  };

  function removeMenuTab() {
    main.classList.remove('menu');

    const menuContainer = document.querySelector('.menu-container');
    menuContainer.remove();
  }

  function addMenuItem(menuArray) {
    const menuCard = createHtmlElement('div', null, ['menu-container'], null, null);
    for (let i = 0; i < menuArray.length; i++) {
      const menuTitle = createHtmlElement('h3', null, ['menu-title'], menuArray[i].title, null);

      const menuIngredients = createHtmlElement('div', null, ['menu-ingredients'], menuArray[i].ingredients, null);
      const menuPrice = createHtmlElement('div', null, ['menu-cost'], menuArray[i].cost, null);
      const line = createHtmlElement('hr', null, ['menu-line'], null, null);
      const container = createHtmlElement('div', null, ['menu-sub-container'], null, [menuIngredients, line, menuPrice]);

      const card = createHtmlElement('div', null, ['menu-card'], null, [menuTitle, container]);
      menuCard.appendChild(card);
    }
    main.appendChild(menuCard);
  };

  return { displayMenuTab, removeMenuTab };

};

export { MenuPageFactory }