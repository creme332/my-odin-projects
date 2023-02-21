import React, { Component } from "react";
import { Form, Button, Col, Row, Accordion } from "react-bootstrap";

class Social extends Component {
  componentDidMount() {
    this.props.addSocialBox();
  }

  render() {
    const {
      social_details,
      addSocialBox,
      removeSocialBox,
      updateSocialLabel,
      updateSocialLink,
    } = this.props;

    return (
      <Form.Group className="mb-3" controlId="SocialLinks">
        <h3> Websites & Social Links</h3>
        <Form.Text className="text-muted">
          You can add links to websites you want hiring managers to see! Perhaps
          it will be a link to your portfolio, LinkedIn profile, or personal
          website
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {social_details.map((box) => {
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
                        onChange={(e) => updateSocialLabel(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicLink">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        onChange={(e) => updateSocialLink(e, box.box_id)}
                        className="blue-bg"
                        type="text"
                      />
                    </Form.Group>
                  </Row>

                  <Button
                    onClick={(e) => removeSocialBox(e, box.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={addSocialBox} variant="secondary">
          + Add one more link
        </Button>
      </Form.Group>
    );
  }
}

export default Social;
