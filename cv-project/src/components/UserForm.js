import React, { Component } from "react";
import { Button, Form, InputGroup, Col, Row, Accordion } from "react-bootstrap";
import "./../styles/UserForm.css";

class UserForm extends Component {
  constructor() {
    super();
    // TODO : Create separate component for personal details
    this.state = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    };
  }
  setFname(e) {
    this.setState({
      fname: e.target.value.trim(),
    });
    console.log(this.state);
  }

  setLname(e) {
    this.setState({
      lname: e.target.value.trim(),
    });
    console.log(this.state);
  }

  setEmail(e) {
    this.setState({
      email: e.target.value.trim(),
    });
    console.log(this.state);
  }

  setPhone(e) {
    this.setState({
      phone: e.target.value.trim(),
    });
    console.log(this.state);
  }

  setCountry(e) {
    this.setState({
      country: e.target.value.trim(),
    });
    console.log(this.state);
  }

  setCity(e) {
    this.setState({
      city: e.target.value.trim(),
    });
    console.log(this.state);
  }

  render() {
    return (
      <Form className="form-section">
        <Form.Group className="mb-3" controlId="PersonalDetails">
          <h3> Personal Details</h3>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={(e) => this.setFname(e)}
                className="blue-bg"
                type="text"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={(e) => this.setLname(e)}
                className="blue-bg"
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => this.setEmail(e)}
                className="blue-bg"
                type="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicTel">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={(e) => this.setPhone(e)}
                className="blue-bg"
                type="tel"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                onChange={(e) => this.setCountry(e)}
                className="blue-bg"
                type="text"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={(e) => this.setCity(e)}
                className="blue-bg"
                type="text"
              />
            </Form.Group>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ProfessionalSummary">
          <h3> Professional Summary</h3>
          <Form.Text className="text-muted">
            Write 2-4 short & energetic sentences to interest the reader!
            Mention your role, experience & most importantly - your biggest
            achievements, best qualities and skills
          </Form.Text>
          <InputGroup>
            <Form.Control
              className="blue-bg"
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="Skills">
          <h3> Skills</h3>
          <Form.Text className="text-muted">
            Choose 5 of the most important skills to show your talents! Make
            sure they match the keywords of the job listing if applying via an
            online system
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

        <Form.Group className="mb-3" controlId="SocialLinks">
          <h3> Websites & Social Links</h3>
          <Form.Text className="text-muted">
            You can add links to websites you want hiring managers to see!
            Perhaps it will be a link to your portfolio, LinkedIn profile, or
            personal website
          </Form.Text>

          <Accordion defaultActiveKey="0">
            <Accordion.Item className="mb-3" eventKey="0">
              <Accordion.Header>(Not specified)</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formBasicLabel">
                    <Form.Label>Label</Form.Label>
                    <Form.Control className="blue-bg" type="text" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicLink">
                    <Form.Label>Link</Form.Label>
                    <Form.Control className="blue-bg" type="text" />
                  </Form.Group>
                </Row>
                <Button variant="danger">Delete</Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button variant="secondary">+ Add one more link</Button>
        </Form.Group>

        <Button variant="primary" type="submit">
          Download as PDF
        </Button>
      </Form>
    );
  }
}

export default UserForm;
