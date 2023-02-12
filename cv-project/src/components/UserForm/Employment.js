import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";
import uniqid from "uniqid";

class Employment extends Component {
  constructor() {
    super();

    this.state = {
      emp_boxes: [
        {
          box_id: uniqid(),
          job_title: "",
          employer: "",
          start_date: "",
          end_date: "",
          city: "",
        },
      ],
    };

    this.addEmploymentBox = this.addEmploymentBox.bind(this);
    this.removeEmploymentBox = this.removeEmploymentBox.bind(this);
    // this.updateJobTitle = this.updateJobTitle.bind(this);
  }

  updateJobTitle(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          console.log({ ...emp, job_title: e.target.value });
          return { ...emp, job_title: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateEmployer(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, employer: e.target.value.trim() };
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

  addEmploymentBox() {
    const default_box = {
      box_id: uniqid(),
      job_title: "",
      employer: "",
      start_date: "",
      end_date: "",
      city: "",
    };
    this.setState({
      emp_boxes: this.state.emp_boxes.concat(default_box),
    });
  }

  removeEmploymentBox(e, box_id) {
    this.setState({
      emp_boxes: this.state.emp_boxes.filter((box) => box.box_id !== box_id),
    });
  }

  render() {
    const { emp_boxes } = this.state;

    return (
      <Form.Group className="mb-3" controlId="EmploymentHistory">
        <h3> Employment History</h3>
        <Form.Text className="text-muted">
          Show your relevant experience (last 10 years). Use bullet points to
          note your achievement, if possible - use numbers/facts (Achieved X,
          measured by Y, doing Z).
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {emp_boxes.map((emp) => {
            return (
              <Accordion.Item key={emp.box_id} className="mb-3" eventKey="0">
                <Accordion.Header>
                  {emp.job_title === "" ? "(Not specified)" : emp.job_title}
                </Accordion.Header>

                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicJobTitle">
                      <Form.Label>Job title</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateJobTitle(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmployer">
                      <Form.Label>Employer</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateEmployer(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Start & End date</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => this.updateStartDate(e, emp.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                      <Form.Control
                        onChange={(e) => this.updateEndDate(e, emp.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                    </InputGroup>

                    <Form.Group as={Col} controlId="formBasicCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateCity(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>
                  <Button
                    onClick={(e) => this.removeEmploymentBox(e, emp.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={this.addEmploymentBox} variant="secondary">
          + Add one more employment
        </Button>
      </Form.Group>
    );
  }
}

export default Employment;
