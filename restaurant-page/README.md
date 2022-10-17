# 🍽 Restaurant page
![HTML5 shield](https://img.shields.io/badge/-HTML5-blue)
![JavaScript shield](https://img.shields.io/badge/-JavaScript-yellow)
![CSS3 shield](https://img.shields.io/badge/-CSS3-orange)
![Webpack5 shield](https://img.shields.io/badge/-Webpack5-red)

A simple restaurant website generated entirely with JavaScript. 

![GIF of restaurant website in action](resto.gif)

[▶ Live Preview](https://creme332.github.io/my-odin-projects/restaurant-page/dist/)

# 🚀Features
- Responsive website.
- Single-page application.

#  🛠 Installation
Clone repository locally.
```bash
git clone git@github.com:creme332/my-odin-projects.git
```
Go to project directory.
```bash
cd my-odin-projects/restaurant-page
 ```

Install dependencies.
 ```bash
npm install
 ```

 ## Development mode
Set the `mode` in `webpack.config.js` parameter to `development` and add `devtool`.

**webpack.config.js**
```js
    module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Development',
        }),
    ],
+  devtool: 'inline-source-map',
   ...
```
To view changes in real-time,
 ```bash
npx webpack --watch
 ```
# 📌 Attributions
Resource | Source
---|---
UI | ThunderCut Alley website made by [Effector](https://effector.ie/). Original UI can be found [here](thundercutalley.png).
[marquee-moon font](src/assets/marqueem.ttf) | Raymond Larabie
Neon light logo | [Silvia O'Dwyer](https://css-tricks.com/how-to-create-neon-text-with-css/)
[Gallery images](dist/images/) | Unsplash

# 🔨 To-Do
- [ ] fix bug with sidebar on small screens (color flashing)
- [ ] add meta description.
- [ ] add contact page
 - [ ] improve semantics
 - [ ] add loading animation when page has not loaded yet
 - [ ] add transitions when switching from one tab to another.
### ✔ Done
 - [x] create assets folder for dist
-  [x] make a responsive nav bar
- [x] make website responsive
