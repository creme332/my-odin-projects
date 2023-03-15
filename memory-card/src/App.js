import "./App.css";
import React from "react";
import imgSrc from "./a.gif"
import imgSrc1 from "./b.png"

function App() {
  return <div className="App">
    <p>memory card</p>
    <img src= {imgSrc} height={250} alt="" />
    <img src= {imgSrc1} height={250} alt="" />

  </div>;
}

export default App;
