import React, { Component } from "react";
import { Form, InputGroup, Button, Col, Row, Accordion } from "react-bootstrap";

class Employment extends Component {
  componentDidMount() {
    this.props.addEmploymentBox();
  }
  render() {
    const {
      employment_details,
      updateEmpCity,
      updateEmpEmployer,
      updateEmpEndDate,
      updateEmpStartDate,
      updateEmpJobTitle,
      updateEmpJobDesc,
      addEmploymentBox,
      removeEmploymentBox,
    } = this.props;

    return (
      <Form.Group className="mb-3" controlId="EmploymentHistory">
        <h3> Employment History</h3>
        <Form.Text className="text-muted">
          Show your relevant experience (last 10 years). Use bullet points to
          note your achievement, if possible - use numbers/facts (Achieved X,
          measured by Y, doing Z).
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {employment_details.map((emp) => {
            return (
              <Accordion.Item
                key={emp.box_id}
                className="mb-3"
                eventKey={emp.box_id}
              >
                <Accordion.Header>
                  {emp.job_title === "" ? "(Not specified)" : emp.job_title}
                </Accordion.Header>

                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicJobTitle">
                      <Form.Label>Job title</Form.Label>
                      <Form.Control
                        onChange={(e) => updateEmpJobTitle(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmployer">
                      <Form.Label>Employer</Form.Label>
                      <Form.Control
                        onChange={(e) => updateEmpEmployer(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Start & End date</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => updateEmpStartDate(e, emp.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                      <Form.Control
                        onChange={(e) => updateEmpEndDate(e, emp.box_id)}
                        className="blue-bg"
                        type="date"
                      />
                    </InputGroup>

                    <Form.Group as={Col} controlId="formBasicCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={(e) => updateEmpCity(e, emp.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label>Description</Form.Label>

                    <InputGroup onChange={updateEmpJobDesc}>
                      <Form.Control
                        className="blue-bg"
                        as="textarea"
                        aria-label="textarea to input professional summary"
                      />
                    </InputGroup>
                  </Row>
                  <Button
                    onClick={(e) => removeEmploymentBox(e, emp.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={addEmploymentBox} variant="secondary">
          + Add one more employment
        </Button>
      </Form.Group>
    );
  }
}

export default Employment;
