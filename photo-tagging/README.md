# 📸 Photo Tagging App

Challenge yourself to find the hidden character in each scene, and see how fast you can do it. With randomized characters and difficulty levels, each game is a unique experience.

![GIF of project](xxx.png)

[▶ Live Preview](enigma69.web.app)

# 🚀Features
* Light and dark themes
* Mobile-responsive design
* User authentication with Google
* Photo zooming
* Reveal position of character 
* Multiple maps with randomized characters
* Global leaderboard
* Profile page with statistics with graphs and settings section
# How to play

If you get stuck click on zoom to element button. You will have to wait 30s to use this button again. The more times you used this button, 
the less your score will be.

# 🛠 Installation

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
* [ ] update hero header: unique feature is statistics, zoom
* [ ] remove hours from time in leaderboard
* [ ] show notification after zoom is clicked or incorrect guess is made
* [ ] Remove grid stats caption
* [ ] add animation for showing chracter images - card animation
* [ ] show validation temporarily when change username button is clicked
* [ ] add a [feature](https://ui.mantine.dev/category/features) section to homepage

## Bugs
  + [ ] fix bug where map is centered when play button is clicked. i want header to be visible. (use scroll area on mantine)

test the following:
- unregistered user playing game and checking leaderboard
- registered user who has not played any games checking profile and leaderboard
- all

## Optimizations 

* [ ] Use redux
  + when website first loads, make 1 request for user data. serve this data throughout web. when data changes, update stored state first then send changes to firestore. 
  + this prevents delay for fetching data for profile page each time it is clicked
* [ ] Compress images
* [ ] Do not save separate images for each character. Use image of map and coordinates to obtain character image dynamically
* [ ] Use typescript 



## IMPORTANT !!
* [ ] add firebase security rules
  + [ ] prevent anyone from writing
  + [ ] restrict domain
* [ ] place hitbox behind map to prevent inspect element
* [ ] Generate production build
* [ ] Use pageInsight to test website after deployment.
##  Extra 
* [ ] Add difficulty rating to each character and rework formula
* [ ] Add new map for waldo
* [ ] Find an easier way to place hitbox
* [ ] add tour of website (reacttour)
* [ ] Allow user to upload their own maps and use react-image-crop to select characters.
* [ ] Ask user to rate map when game ends
