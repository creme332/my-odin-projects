import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./../styles/UserForm.css";

import Personal from "./UserForm/Personal";
import Professional from "./UserForm/Professional";
import Employment from "./UserForm/Employment";
import Education from "./UserForm/Education";
import Skills from "./UserForm/Skills";
import Social from "./UserForm/Social";

class UserForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Form className="form-section">
        <Personal />
        <Professional />
        <Employment />
        <Education />
        <Skills />
        <Social />

        <Button variant="primary" type="submit">
          Download as PDF
        </Button>
      </Form>
    );
  }
}

export default UserForm;
