import React, { Component } from "react";
import { Form, Button, Col, Row, Accordion } from "react-bootstrap";
import uniqid from "uniqid";

class Social extends Component {
  constructor() {
    super();

    this.state = {
      social_boxes: [
        {
          box_id: uniqid(),
          link_name: "",
          url: "",
        },
      ],
    };

    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
  }

  removeBox(e, box_id) {
    this.setState({
      social_boxes: this.state.social_boxes.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  addBox() {
    const default_box = {
      box_id: uniqid(),
      link_name: "",
      url: "",
    };
    this.setState({
      social_boxes: this.state.social_boxes.concat(default_box),
    });
  }

  updateLabel(e, box_id) {
    this.setState({
      social_boxes: this.state.social_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, link_name: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateLink(e, box_id) {
    this.setState({
      social_boxes: this.state.social_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, url: e.target.value };
        }
        return emp;
      }),
    });
  }

  render() {
    const { social_boxes } = this.state;

    return (
      <Form.Group className="mb-3" controlId="SocialLinks">
        <h3> Websites & Social Links</h3>
        <Form.Text className="text-muted">
          You can add links to websites you want hiring managers to see! Perhaps
          it will be a link to your portfolio, LinkedIn profile, or personal
          website
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {social_boxes.map((box) => {
            return (
              <Accordion.Item
                className="mb-3"
                key={box.box_id}
                eventKey={box.box_id}
              >
                <Accordion.Header>
                  {" "}
                  {box.link_name === "" ? "(Not specified)" : box.link_name}
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicLabel">
                      <Form.Label>Label</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateLabel(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicLink">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        onChange={(e) => this.updateLink(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Button
                    onClick={(e) => this.removeBox(e, box.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={this.addBox} variant="secondary">
          + Add one more link
        </Button>
      </Form.Group>
    );
  }
}

export default Social;
