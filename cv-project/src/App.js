import "./styles/App.css";
import React, { Component } from "react";
import UserForm from "./components/UserForm";
import Preview from "./components/Preview";

class App extends Component {
  constructor() {
    super();
    this.state = {
      employment_details: [],
      education_details: [],
      personal_details: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        country: "",
        city: "",
      },
      professional_summary: "",
      skill_details: [],
      social_details: [],
    };
  }


  render() {
    return (
      <div className="App">
        <UserForm className="form-section" />
        <Preview />
      </div>
    );
  }
}

export default App;
