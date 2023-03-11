import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

class Personal extends Component {
  render() {
    const {
      updatePersonalCity,
      updatePersonalCountry,
      updatePersonalEmail,
      updatePersonalFname,
      updatePersonalLname,
      updatePersonalPhone,
      personal_details,
    } = this.props;
    return (
      <Form.Group className="mb-3" controlId="PersonalDetails">
        <h3>Personal Details</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalFname(e)}
              className="blue-bg"
              type="text"
              defaultValue={personal_details.fname}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalLname(e)}
              className="blue-bg"
              type="text"
              defaultValue={personal_details.lname}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalEmail(e)}
              className="blue-bg"
              type="email"
              defaultValue={personal_details.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicTel">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalPhone(e)}
              className="blue-bg"
              type="tel"
              defaultValue={personal_details.phone}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalCountry(e)}
              className="blue-bg"
              maxLength="20"
              type="text"
              defaultValue={personal_details.country}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={(e) => updatePersonalCity(e)}
              className="blue-bg"
              type="text"
              maxLength="30"
              defaultValue={personal_details.city}
            />
          </Form.Group>
        </Row>
      </Form.Group>
    );
  }
}

export default Personal;
