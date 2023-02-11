import React, { Component } from "react";
import { Form, Button, Row, Accordion } from "react-bootstrap";

class Skills extends Component {
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
      <Form.Group className="mb-3" controlId="Skills">
        <h3> Skills</h3>
        <Form.Text className="text-muted">
          Choose 5 of the most important skills to show your talents! Make sure
          they match the keywords of the job listing if applying via an online
          system
        </Form.Text>

        <Accordion defaultActiveKey="0">
          <Accordion.Item className="mb-3" eventKey="0">
            <Accordion.Header>(Not specified)</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Form.Label>Skill</Form.Label>
                <Form.Control className="blue-bg" type="text" />
              </Row>
              <Button variant="danger">Delete</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button variant="secondary">+ Add one more skill</Button>
      </Form.Group>
    );
  }
}

export default Skills;
