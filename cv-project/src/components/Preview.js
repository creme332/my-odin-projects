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
    social_details = social_details.filter(
      (e) => e.link_name.trim() !== "" && e.url.trim() !== ""
    );
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
          <b> {social_details.length > 0 ? "Links" : ""}</b>{" "}
          {social_details.map((e, index) => {
            const name =
              e.link_name + (index === social_details.length - 1 ? "" : ", ");
            return (
              <a key={e.box_id} href={e.url}>
                {name}
              </a>
            );
          })}
        </p>
      </div>
    );
  }

  employmentComponent(employment_details) {
    if (
      employment_details.job_title.trim() === "" &&
      employment_details.city.trim() === "" &&
      employment_details.job_description.trim() === "" &&
      employment_details.employer.trim() === ""
    ) {
      return;
    }
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
        <p className="date empBox-left">
          {format(start_date, "MMM y")} - {format(end_date, "MMM y")}
        </p>
        <div className="empBox-right">
          <div className="d-flex justify-content-between">
            <b className="employee-title">
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
    if (
      education_details.school === "" &&
      education_details.city === "" &&
      education_details.degree === "" &&
      education_details.description === ""
    ) {
      return;
    }
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
        <p className="date empBox-left">
          {format(start_date, "MMM y")} - {format(end_date, "MMM y")}
        </p>
        <div className="empBox-right">
          <div className="d-flex justify-content-between">
            <b className="employee-title">{education_details.school}</b>
            <p>{education_details.city}</p>
          </div>
          <p className="degree">{education_details.degree}</p>{" "}
          <p>{education_details.description}</p>{" "}
        </div>
      </div>
    );
  }

  technicalSkills(skills) {
    let res = skills.join(", "); // create a comma-separated list of skills
    // remove last comma
    // return res.slice(0, -2);
    return res;
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
          <h6>
            {employment_details.length > 0
              ? employment_details[0].job_title
              : ""}
          </h6>
          {this.shortInfoComponent(personal_details, social_details)}
          <div className="empBox">
            <h3 className="empBox-left resume-heading">Profile</h3>
            <p className="empBox-right">{professional_summary}</p>
          </div>
          <h3 className="resume-heading">
            {" "}
            {employment_details.length > 0 ? "Employment" : ""}
          </h3>
          {employment_details.map((emp) => {
            return this.employmentComponent(emp);
          })}
          <h3 className="resume-heading">
            {" "}
            {education_details.length > 0 ? "Education" : ""}
          </h3>
          {education_details.map((emp) => {
            return this.educationComponent(emp);
          })}{" "}
          <h3 className="resume-heading">
            {" "}
            {skills.length > 0 ? "Technical Skills" : ""}
          </h3>
          <p>{this.technicalSkills(skills)}</p>
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
