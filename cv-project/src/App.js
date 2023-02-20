import "./styles/App.css";
import React, { Component } from "react";
import Preview from "./components/Preview";
import uniqid from "uniqid";
import { Button, Form } from "react-bootstrap";
import "./styles/UserForm.css";
import Personal from "./components/UserForm/Personal";
import Professional from "./components/UserForm/Professional";
import Employment from "./components/UserForm/Employment";
import Education from "./components/UserForm/Education";
import Skills from "./components/UserForm/Skills";
import Social from "./components/UserForm/Social";

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

    // bindings for Education event handlers
    this.updateEduSchool = this.updateEduSchool.bind(this);
    this.updateEduDegree = this.updateEduDegree.bind(this);
    this.updateEduStartDate = this.updateEduStartDate.bind(this);
    this.updateEduEndDate = this.updateEduEndDate.bind(this);
    this.updateEduCity = this.updateEduCity.bind(this);
    this.updateEduDescription = this.updateEduDescription.bind(this);
    this.addEduBox = this.addEduBox.bind(this);
    this.removeEduBox = this.removeEduBox.bind(this);
  }

  updateEduSchool(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, school: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduDegree(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, degree: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduStartDate(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, start_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateEduEndDate(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, end_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateEduCity(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, city: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduDescription(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, description: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  addEduBox() {
    const default_education_box = {
      box_id: uniqid(),
      school: "",
      degree: "",
      start_date: "",
      end_date: "",
      city: "",
      description: "",
    };
    this.setState({
      education_details: this.state.education_details.concat(
        default_education_box
      ),
    });
  }

  removeEduBox(e, box_id) {
    this.setState({
      education_details: this.state.education_details.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  render() {
    return (
      <div className="App">
        <Form className="form-section">
          <Personal />
          <Professional />
          <Employment />
          <Education
            education_details={this.state.education_details}
            updateEduCity={this.updateEduCity}
            updateEduDegree={this.updateEduDegree}
            updateEduDescription={this.updateEduDescription}
            updateEduEndDate={this.updateEduEndDate}
            updateEduSchool={this.updateEduSchool}
            updateEduStartDate={this.updateEduStartDate}
            addEduBox={this.addEduBox}
            removeEduBox={this.removeEduBox}
          />
          <Skills />
          <Social />

          <Button variant="primary" type="submit">
            Download as PDF
          </Button>
        </Form>{" "}
        <Preview />
      </div>
    );
  }
}

export default App;
