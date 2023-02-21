import React, { Component } from "react";
import { Form, Button, Row, Accordion } from "react-bootstrap";

class Skills extends Component {
  componentDidMount() {
    this.props.addSkillBox();
  }
  render() {
    const { skill_details, updateSkillBox, addSkillBox, removeSkillBox } =
      this.props;
    return (
      <Form.Group className="mb-3" controlId="Skills">
        <h3> Skills</h3>
        <Form.Text className="text-muted">
          Choose 5 of the most important skills to show your talents! Make sure
          they match the keywords of the job listing if applying via an online
          system
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {skill_details.map((box) => {
            return (
              <Accordion.Item
                className="mb-3"
                key={box.box_id}
                eventKey={box.box_id}
              >
                <Accordion.Header>
                  {" "}
                  {box.skill_name === "" ? "(Not specified)" : box.skill_name}
                </Accordion.Header>

                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control
                      onChange={(e) => updateSkillBox(e, box.box_id)}
                      className="blue-bg"
                      type="text"
                    />
                  </Row>

                  <Button
                    onClick={(e) => removeSkillBox(e, box.box_id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <Button onClick={addSkillBox} variant="secondary">
          + Add one more skill
        </Button>
      </Form.Group>
    );
  }
}

export default Skills;
