import React, { Component } from "react";
import { Form, Button, Col, Row, Accordion } from "react-bootstrap";

class Social extends Component {
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
      <Form.Group className="mb-3" controlId="SocialLinks">
        <h3> Websites & Social Links</h3>
        <Form.Text className="text-muted">
          You can add links to websites you want hiring managers to see! Perhaps
          it will be a link to your portfolio, LinkedIn profile, or personal
          website
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
    );
  }
}

export default Social;
