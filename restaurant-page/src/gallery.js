//import images

import { createHtmlElement } from './helper';

const GalleryPageFactory = (main) => {

    function displayGalleryTab() {
        main.classList.add('gallery');

        //add images
        addImages();
    };

    function removeGalleryTab() {
        main.classList.remove('gallery');
        const gallery  = main.querySelector('.gallery-container');
        gallery.remove();
    };

    function addImages(cardsArray) {
        const gallery = createHtmlElement('div', null, ['gallery-container'], null, null);
        const imageCount = 5;
        for(let i=0;i<imageCount;i++){
            const cardImg = new Image();
            cardImg.src = `https://source.unsplash.com/random/500x500?sig=${i}`;
            cardImg.alt = 'a random image';
            const imgContainer = createHtmlElement('div',null,['img-container'],null,[cardImg]);
            gallery.appendChild(imgContainer);
        }

        main.appendChild(gallery);
    };

    return { displayGalleryTab, removeGalleryTab };

};

export { GalleryPageFactory };