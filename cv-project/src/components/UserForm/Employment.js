import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";

class Employment extends Component {
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
      <Form.Group className="mb-3" controlId="EmploymentHistory">
        <h3> Employment History</h3>
        <Form.Text className="text-muted">
          Show your relevant experience (last 10 years). Use bullet points to
          note your achievement, if possible - use numbers/facts (Achieved X,
          measured by Y, doing Z).
        </Form.Text>

        <Accordion defaultActiveKey="0">
          <Accordion.Item className="mb-3" eventKey="0">
            <Accordion.Header>(Not specified)</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicJobTitle">
                  <Form.Label>Job title</Form.Label>
                  <Form.Control className="blue-bg" type="text" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicEmployer">
                  <Form.Label>Employer</Form.Label>
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
              <Button variant="danger">Delete</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button variant="secondary">+ Add one more employment</Button>
      </Form.Group>
    );
  }
}

export default Employment;
