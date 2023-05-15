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


# To-do
* [x] complete play page
  + [x] add timer
  + [x] check if correct character was clicked and update badge
  + [x] add game over screen
  + [x] add delay between each reveal answer
  + [x] add at least 5 characters per map
  + [x] randomize characters
  + [x] verify if helpCount works
  + [x] make characters image box size responsive
  + [x] add missing characters
  + [x] initial image should cover container
  + [x] add hint popover
  + [x] fix character image flickering when character is clicked on map
* [ ] fix shifting header bug
* [ ] add difficulty rating to each character and rework formula
* [x] add new maps
* [ ] how to ensure unique ids in map
* [ ] place hitbox behind map to prevent inspect element
* [x] fix color of card title
* [x] add placeholder for image on home screen
* [ ] fix bug where map is centered when play button is clicked. i want header to be visible.
* [x] add tooltips to explain actionicon
* [ ] create profile page
* [x] use useNavigate instead of Link for buttons
* [ ] add how to play section on home screen
* [ ] add tour of website (reacttour)
* [x] add option to toggle theme
* [x] make header occupy full width
* [x] set width of image carousel =  width of hero header
* [x] add logo to header
* [ ] compress images
* [x] use grayclif font from mantine instead of css
* [ ] use react-image-crop to let user create their own maps
* [ ] Generate production build
* [ ] Use pageInsight to test website after deployment.
