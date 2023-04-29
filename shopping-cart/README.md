# Shopping Cart 🛒
A prototype e-commerce website for an eco-friendly banana chip business. The design was inspired by [dbraden](https://www.figma.com/@dbraden).

![GIF of website](shop.gif)

[▶ Live Preview](https://creme332.github.io/my-odin-projects/shopping-cart/build/)

> ⚠ Since this website uses `BrowserRouter` which is not supported by Github Pages, reloading a page or accessing a page (other than home page) directly  through its URL will cause a 404 error. I deliberately chose not to [fix this issue with `HashRouter`](https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages) for simplicity.

# 🚀 Features
- Responsive design
- Smooth animations
- Search bar with auto-completion

# 🔨 Tools used
- React + React Router
- Framer motion
- CSS modules
- Mantine
- Jest for testing UI

# 🛠 Installation
Clone repository locally
```bash
git clone git@github.com:creme332/my-odin-projects.git
```
Move to project directory
```
cd my-odin-projects/shopping-cart
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

# 🧪 Testing 
In `RouteSwitch.js`, remove the `basename`  prop from the BrowserRouter component:
```js
<BrowserRouter> // good
...
```
Run tests
```bash
npm run test
```

# 🔨 To-Do
- [ ] Fix checkout button at bottom of drawer
- [ ] Fix issue with saerch bar test in `App.test.js`
- [ ] Add logo when no search found
- [ ] Add backend

