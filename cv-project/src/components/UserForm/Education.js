import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";
import uniqid from "uniqid";

class Education extends Component {
  constructor() {
    super();

    this.state = {
      boxes: [
        {
          box_id: uniqid(),
          school: "",
          degree: "",
          start_date: "",
          end_date: "",
          city: "",
          description: "",
        },
      ],
    };

    this.addEducationBox = this.addEducationBox.bind(this);
    this.removeEducationBox = this.removeEducationBox.bind(this);
  }

  updateSchool(e, box_id) {
    // console.log(this.state.boxes);
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, school: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateDegree(e, box_id) {
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, degree: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateStartDate(e, box_id) {
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, start_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateEndDate(e, box_id) {
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, end_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateCity(e, box_id) {
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, city: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateDescription(e, box_id) {
    this.setState({
      boxes: this.state.boxes.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, description: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  addEducationBox() {
    const default_box = {
      box_id: uniqid(),
      school: "",
      degree: "",
      start_date: "",
      end_date: "",
      city: "",
      description: "",
    };
    this.setState({
      boxes: this.state.boxes.concat(default_box),
    });
  }

  removeEducationBox(e, box_id) {
    this.setState({
      boxes: this.state.boxes.filter((box) => box.box_id !== box_id),
    });
  }

  render() {
    const { boxes } = this.state;

    return (
      <Form.Group className="mb-3" controlId="Education">
        <h3> Education</h3>
        <Form.Text className="text-muted">
          A varied education on your resume sums up the value that your
          learnings and background will bring to your job.
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {boxes.map((box) => {
            return (
              <Accordion.Item
                key={box.box_id}
                className="mb-3"
                eventKey={box.box_id}
              >
                <Accordion.Header>
                  {box.school === "" ? "(Not specified)" : box.school}
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicJobTitle">
                      <Form.Label>School</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateSchool(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmployer">
                      <Form.Label>Degree</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateDegree(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Start & End date</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => this.updateStartDate(e, box.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                      <Form.Control
                        onChange={(e) => this.updateEndDate(e, box.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                    </InputGroup>

                    <Form.Group as={Col} controlId="formBasicCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateCity(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Form.Label>Description</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e) => this.updateDescription(e, box.box_id)}
                      className="blue-bg"
                      as="textarea"
                      aria-label="With textarea"
                    />
                  </InputGroup>

                  <Button
                    onClick={(e) => this.removeEducationBox(e, box.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={this.addEducationBox} variant="secondary">
          + Add one more education
        </Button>
      </Form.Group>
    );
  }
}

export default Education;
