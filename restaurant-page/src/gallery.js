//import images from gallery folder
import dancers_img from './assets/gallery/dancers.png';
import dj_img from './assets/gallery/dj.png';
import food1_img from './assets/gallery/food1.png';
import food2_img from './assets/gallery/food2.png';
import peopleEating_img from './assets/gallery/people-eating.png';
import randomGuy_img from './assets/gallery/random-guy.png';
import resto_img from './assets/gallery/resto.png';
import womanWhite_img from './assets/gallery/woman-in-white.png';

import { createHtmlElement, createImgElement } from './helper';

const GalleryPageFactory = (main) => {

    function displayGalleryTab() {
        main.classList.add('gallery');

        //add images
        addRandomImages(20);
    };

    function removeGalleryTab() {
        main.classList.remove('gallery');
        const gallery = main.querySelector('.gallery-container');
        gallery.remove();
    };

    function getImgWithContainer(src, alt) {
        const cardImg = createImgElement(src, alt, null, null);
        const imgContainer = createHtmlElement('div', null, ['img-container'], null, [cardImg]);
        return imgContainer;
    }
    function addRandomImages(imageCount) {
        const gallery = createHtmlElement('div', null, ['gallery-container'], null, null);

        let imgContainer = getImgWithContainer(resto_img, 'A chinese restaurant with a neon sign outside');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(dancers_img, 'A group of dancers in poorly lit night club');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(womanWhite_img, 'A woman in white posing seductively in a night club');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(randomGuy_img, 'Portrait of a black guy in a night club');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(food1_img, 'A plate with eggs');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(dj_img, 'A DJ in a nightclub');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(food2_img, 'A plate filled with veggies');
        gallery.appendChild(imgContainer);

        imgContainer = getImgWithContainer(peopleEating_img, 'People sitting in a calm environment');
        gallery.appendChild(imgContainer);

        // generate random images for testing
        // for (let i = 0; i < imageCount; i++) {
        //     imgContainer = getImgWithContainer(`https://source.unsplash.com/random/?nightclub&${Math.random()}`, 'A random image from Unsplash with keyword nightclub');
        //     gallery.appendChild(imgContainer);
        // }

        main.appendChild(gallery);
    };

    return { displayGalleryTab, removeGalleryTab };

};

export { GalleryPageFactory };