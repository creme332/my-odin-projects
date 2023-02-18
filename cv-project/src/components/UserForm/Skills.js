import React, { Component } from "react";
import { Form, Button, Row, Accordion } from "react-bootstrap";
import uniqid from "uniqid";

class Skills extends Component {
  constructor() {
    super();

    this.state = {
      skill_boxes: [
        {
          box_id: uniqid(),
          skill_name: "",
        },
      ],
    };

    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
  }

  updateBox(e, box_id) {
    this.setState({
      skill_boxes: this.state.skill_boxes.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, skill_name: e.target.value };
        }
        return emp;
      }),
    });
  }

  addBox() {
    const default_box = {
      box_id: uniqid(),
      skill_name: "",
    };
    this.setState({
      skill_boxes: this.state.skill_boxes.concat(default_box),
    });
  }

  removeBox(e, box_id) {
    this.setState({
      skill_boxes: this.state.skill_boxes.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  render() {
    const { skill_boxes } = this.state;
    console.log(skill_boxes);
    return (
      <Form.Group className="mb-3" controlId="Skills">
        <h3> Skills</h3>
        <Form.Text className="text-muted">
          Choose 5 of the most important skills to show your talents! Make sure
          they match the keywords of the job listing if applying via an online
          system
        </Form.Text>

        <Accordion defaultActiveKey="0">
          {skill_boxes.map((box) => {
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
                      onChange={(e) => this.updateBox(e, box.box_id)}
                      className="blue-bg"
                      type="text"
                    />
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
          + Add one more skill
        </Button>
      </Form.Group>
    );
  }
}

export default Skills;
