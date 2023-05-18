# 📸 Photo Tagging App

Challenge yourself to find the hidden character in each scene, and see how fast you can do it. With randomized characters and difficulty levels, each game is a unique experience.

![GIF of project](xxx.png)

[▶ Live Preview](https://creme332.github.io/my-odin-projects/photo-tagging/build)

> ⚠ Since this website uses `BrowserRouter` which is not supported by Github Pages, reloading a page or accessing a page (other than home page) directly  through its URL will cause a 404 error.

# 🚀Features
* Light and dark themes
* Mobile-responsive design
* User authentication with Google
* Photo zooming
* Reveal position of character option
* Multiple maps with randomized characters
* Global leaderboard
* Profile page with statistics with graphs and settings
# How to play

If you get stuck click on zoom to element button. You will have to wait 30s to use this button again. The more times you used this button, 
the less your score will be.

# 🛠 Installation

## Set up Firestore

## Set up frontend

Clone repository locally

```bash
git clone git@github.com:creme332/my-odin-projects.git
```

Move to project directory

```
cd my-odin-projects/photo-tagging
```

Install dependencies

```bash
npm install
```

Launch web app  

```bash
npm start
```

Create a production build

```bash
npm run build
```

# Usage

### `npm run start`

Run project.

### `npm run build`

Generate production build.

## How to create your own maps

1. Update mapProvider but keep character list empty for now.
2. Add a background colour and an outline to Hitbox element.
3. Add a Hitbox element to TransformWrapper and manually modify its leftPos and topPos to move the hitbox element where needed
4. With live reload enabled and some trial and error, you will easily place the hitbox where needed. 
5. Update mapProvider.
# To-do

## Bugs

  + [x] fix shifting header bug - caused by presence of vertical scrollbar
  + [ ] flickering images when hitbox is clicked
    - [ ] memo not working - try memoizing character as well
    - [X] Tried replacing Avatar with normal img.
    - [X] Tried moving characters outside of transform wrapper
    - Ensured that ids are unique
    - [ ] character images are downloaded again each time hitbox is clicked
  + [ ] fix bug where map is centered when play button is clicked. i want header to be visible. (use scroll area on mantine)

* [ ] fix gap between sections on home screen
* [ ] place hitbox behind map to prevent inspect element
* [ ] create profile page
  + [ ] navigate to home page when log out is clicked
  + [ ] show validation temporarily when change usernmae button is clicked
  + [ ] unique colors in line graph
* [ ] create leaderboard page
  + [ ] add tab for each map
* [ ] implement backend using firebase
* [ ] compress images
* [ ] Generate production build
* [ ] Use pageInsight to test website after deployment.
# Extra 
* [ ] add difficulty rating to each character and rework formula
* [ ] add tour of website (reacttour)
* [ ] use react-image-crop to let user create their own maps
* [ ] User rated maps
