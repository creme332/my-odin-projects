import React, { Component } from "react";
import "./../styles/Preview.css";
import uniqid from "uniqid";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";

class Preview extends Component {
  componentRef = null;

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  reactToPrintTrigger = () => {
    // ! Do NOT pass an `onClick` prop to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    return (
      <Button variant="primary" type="submit">
        Download as PDF
      </Button>
    );
  };

  render() {
    const {
      employment_details,
      education_details,
      personal_details,
      professional_summary,
      skill_details,
      social_details,
    } = this.props.formInfo;

    return (
      <div className="preview-section">
        <div ref={this.setComponentRef} className="page">
          <h1>{`${personal_details.fname} ${personal_details.lname}`}</h1>
          <div className="square"></div>
          <h6>Software Developer</h6>
          <p>
            <b>Phone</b> {personal_details.phone}
          </p>
          <p>
            <b>Email</b> {personal_details.email}
          </p>
          <p>
            <b>City</b> {personal_details.city}, {personal_details.country}
          </p>
          <div className="d-flex justify-content-between">
            <h3>Profile</h3>
            <p>{professional_summary}</p>
          </div>

          <h3>Employment</h3>
          {employment_details.map((emp) => {
            return (
              <div key={uniqid()}>
                <p>
                  <b>
                    {emp.job_title}{" "}
                    {emp.employer === "" ? "" : `at ${emp.employer}`}
                  </b>
                </p>
                <p>{emp.city}</p>
              </div>
            );
          })}
          <h3>Education</h3>
          <h3>Projects</h3>
          <h3>Skills</h3>
        </div>
        <ReactToPrint
          content={this.reactToPrintContent}
          documentTitle="AwesomeFileName"
          onAfterPrint={this.handleAfterPrint}
          onBeforeGetContent={this.handleOnBeforeGetContent}
          onBeforePrint={this.handleBeforePrint}
          removeAfterPrint
          trigger={this.reactToPrintTrigger}
        />
      </div>
    );
  }
}

export default Preview;
