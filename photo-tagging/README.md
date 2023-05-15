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
* User rated maps
* User-submitted maps
* Global leaderboard
* Player statistics with graphs
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
* [ ] bugs
  * [ ] fix shifting header bug
  * [ ] fix bug where map is centered when play button is clicked. i want header to be visible.

* [ ] refactor
* [ ] add gap between character list and map
* [ ] add difficulty rating to each character and rework formula
* [ ] how to ensure unique ids in map
* [ ] place hitbox behind map to prevent inspect element
* [ ] create profile page
* [ ] create leaderboard page
  * [ ] leaderboard for each map
* [ ] add how to play section on home screen
* [ ] implement backend using firebase
* [ ] add tour of website (reacttour)
* [ ] compress images
* [ ] use react-image-crop to let user create their own maps
* [ ] Generate production build
* [ ] Use pageInsight to test website after deployment.
