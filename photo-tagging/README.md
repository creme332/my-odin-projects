# 📸 Photo Tagging App

Challenge yourself to find the hidden character in each scene, and see how fast you can do it. With randomized characters and difficulty levels, each game is a unique experience.

![GIF of project](website.gif)

[▶ Live Preview](enigma69.web.app)

# 🚀Features
* Light and dark themes
* Mobile-responsive design
* User authentication with Google
* Photo zooming
* Reveal position of character if stuck (available every minute)
* Multiple maps with randomized characters
* Global leaderboard for each map
* Profile page with statistics and settings section
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

# To-do
* [ ] Add more characters/map + maps
* [ ] Add difficulty rating to each character and rework formula for score calculation
* [ ] Add on-screen alert when correct character is clicked so that player does not have to scroll up to check if correct.
* [ ] Add a private subcollection for each `user`. This will be accessible only to 1 user.
* [ ] Add more authentication methods
* [x] Generate production build
* [x] Use pageInsight to test website after deployment.

## Optimizations 

* [ ] Use redux for state management
  + when website first loads, make 1 request for user data. serve this data throughout web. when data changes, update stored state first then send changes to firestore. 
  + this prevents delay for fetching data for profile page each time it is clicked
* [ ] Rework method of setting characters. Do not save separate images for each character. Use image of map and coordinates to obtain character image dynamically
* [ ] Rewrite everything in typescript

##  Extra features

* [ ] Add a map creator page where user can upload their own maps, crop characters and upload it to firestore. Use [`Cropper.js`](https://fengyuanchen.github.io/cropperjs/).
* [ ] add tour of website (reacttour)
* [ ] add animation for showing character images - card animation
