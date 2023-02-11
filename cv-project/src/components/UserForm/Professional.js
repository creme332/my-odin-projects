import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

class Professional extends Component {
  constructor() {
    super();

    this.state = {
      prof_summary: "",
    };
  }

  setSummary(e) {
    this.setState({
      prof_summary: e.target.value.trim(),
    });
    console.log(this.state);
  }

  render() {
    return (
      <Form.Group className="mb-3" controlId="ProfessionalSummary">
        <h3> Professional Summary</h3>
        <Form.Text className="text-muted">
          Write 2-4 short & energetic sentences to interest the reader! Mention
          your role, experience & most importantly - your biggest achievements,
          best qualities and skills
        </Form.Text>
        <InputGroup onChange={(e) => this.setSummary(e)}>
          <Form.Control
            className="blue-bg"
            as="textarea"
            aria-label="textarea to input professional summary"
          />
        </InputGroup>
      </Form.Group>
    );
  }
}

export default Professional;
