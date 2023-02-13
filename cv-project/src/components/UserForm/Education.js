import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";
import uniqid from "uniqid";

class Education extends Component {
  constructor() {
    super();

    this.state = {
      emp_boxes: [
        {
          id: uniqid(),
          school: "",
          degree: "",
          start_date: "",
          end_date: "",
          city: "",
          description: "",
        },
      ],
    };
  }

  updateSchool(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, school: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateDegree(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, degree: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateStartDate(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, start_date: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateEndDate(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, end_date: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateCity(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, city: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateDescription(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, description: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  addEducationBox() {
    const default_box = {
      id: uniqid(),
      school: "",
      degree: "",
      start_date: "",
      end_date: "",
      city: "",
      description: "",
    };
    this.setState({
      emp_boxes: this.state.emp_boxes.concat(default_box),
    });
  }

  removeEducationBox(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.filter((box) => box.box_id !== box_id),
    });
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
