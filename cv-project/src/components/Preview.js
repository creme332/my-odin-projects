import React, { Component } from "react";
import "./../styles/Preview.css";
import uniqid from "uniqid";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";
import { format } from "date-fns";

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

  shortInfoComponent(personal_details, social_details) {
    return (
      <div className="short-info">
        <p>
          <b>Phone</b> {personal_details.phone}
        </p>
        <p>
          <b>Email</b> {personal_details.email}
        </p>
        <p>
          <b>City</b> {personal_details.city}, {personal_details.country}
        </p>
        <p>
          <b>Links</b>{" "}
          {social_details.map((e) => {
            // console.log(e);
            return (
              <a key={e.box_id} href={e.url}>
                {e.link_name},&nbsp;
              </a>
            );
          })}
        </p>
      </div>
    );
  }

  employmentComponent(employment_details) {
    const start_date =
      employment_details.start_date === ""
        ? new Date()
        : new Date(employment_details.start_date);
    const end_date =
      employment_details.end_date === ""
        ? new Date()
        : new Date(employment_details.end_date);
    return (
      <div className="empBox" key={uniqid()}>
        <p className="empBox-left">
          {format(start_date, "MMM y")} - {format(end_date, "MMM y")}
        </p>
        <div className="empBox-right">
          <div className="d-flex justify-content-between">
            <b>
              {employment_details.job_title}{" "}
              {employment_details.employer === ""
                ? ""
                : `at ${employment_details.employer}`}
            </b>
            <p>{employment_details.city}</p>
          </div>
          <p>{employment_details.job_description}</p>{" "}
        </div>
      </div>
    );
  }

  educationComponent(education_details) {
    const start_date =
      education_details.start_date === ""
        ? new Date()
        : new Date(education_details.start_date);
    const end_date =
      education_details.end_date === ""
        ? new Date()
        : new Date(education_details.end_date);
    return (
      <div className="empBox" key={uniqid()}>
        <p className="empBox-left">
          {format(start_date, "MMM y")} - {format(end_date, "MMM y")}
        </p>
        <div className="empBox-right">
          <div className="d-flex justify-content-between">
            <b>{education_details.school}</b>
            <p>{education_details.city}</p>
          </div>
          <p>{education_details.degree}</p>{" "}
          <p>{education_details.description}</p>{" "}
        </div>
      </div>
    );
  }

  render() {
    const {
      employment_details,
      education_details,
      personal_details,
      professional_summary,
      skill_details,
      social_details,
    } = this.props.formInfo;

    const skills = [...skill_details.map((e) => e.skill_name)];

    return (
      <div className="preview-section">
        <div ref={this.setComponentRef} className="page">
          <h1>{`${personal_details.fname} ${personal_details.lname}`}</h1>
          <div className="square"></div>
          <h6>Software Developer</h6>
          {this.shortInfoComponent(personal_details, social_details)}
          <div className="d-flex justify-content-between">
            <h3>Profile</h3>
            <p>{professional_summary}</p>
          </div>
          <h3>Employment</h3>
          {employment_details.map((emp) => {
            return this.employmentComponent(emp);
          })}
          <h3>Education</h3>
          {education_details.map((emp) => {
            return this.educationComponent(emp);
          })}{" "}
          <h3>Technical skills</h3>
          <p>{skills.join(", ")}</p>
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
