import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

class Personal extends Component {
  constructor() {
    super();

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
    );
  }
}

export default Personal;
