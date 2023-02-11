import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";

class Education extends Component {
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
      <Form.Group className="mb-3" controlId="Education">
        <h3> Education</h3>
        <Form.Text className="text-muted">
          A varied education on your resume sums up the value that your
          learnings and background will bring to your job.
        </Form.Text>

        <Accordion defaultActiveKey="0">
          <Accordion.Item className="mb-3" eventKey="0">
            <Accordion.Header>(Not specified)</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicJobTitle">
                  <Form.Label>School</Form.Label>
                  <Form.Control className="blue-bg" type="text" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicEmployer">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control className="blue-bg" type="text" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text>Start & End date</InputGroup.Text>
                  <Form.Control className="blue-bg" type="date" />
                  <Form.Control className="blue-bg" type="date" />
                </InputGroup>

                <Form.Group as={Col} controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control className="blue-bg" type="text" />
                </Form.Group>
              </Row>

              <Form.Label>Description</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  className="blue-bg"
                  as="textarea"
                  aria-label="With textarea"
                />
              </InputGroup>

              <Button variant="danger">Delete</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button variant="secondary">+ Add one more education</Button>
      </Form.Group>
    );
  }
}

export default Education;
