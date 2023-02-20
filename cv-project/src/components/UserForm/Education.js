import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";

class Education extends Component {
  componentDidMount() {
    this.props.addEduBox();
  }
  render() {
    const {
      education_details,
      updateEduCity,
      updateEduDegree,
      updateEduDescription,
      updateEduEndDate,
      updateEduSchool,
      updateEduStartDate,
      addEduBox,
      removeEduBox,
    } = this.props;

    return (
      <Form.Group className="mb-3" controlId="Education">
        <h3> Education</h3>
        <Form.Text className="text-muted">
          A varied education on your resume sums up the value that your
          learnings and background will bring to your job.
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {education_details.map((box) => {
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
                        onChange={(e) => updateEduSchool(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmployer">
                      <Form.Label>Degree</Form.Label>
                      <Form.Control
                        onChange={(e) => updateEduDegree(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Start & End date</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => updateEduStartDate(e, box.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                      <Form.Control
                        onChange={(e) => updateEduEndDate(e, box.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                    </InputGroup>

                    <Form.Group as={Col} controlId="formBasicCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={(e) => updateEduCity(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Form.Label>Description</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e) => updateEduDescription(e, box.box_id)}
                      className="blue-bg"
                      as="textarea"
                      aria-label="With textarea"
                    />
                  </InputGroup>

                  <Button
                    onClick={(e) => removeEduBox(e, box.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={addEduBox} variant="secondary">
          + Add one more education
        </Button>
      </Form.Group>
    );
  }
}

export default Education;
