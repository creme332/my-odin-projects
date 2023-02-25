import "./styles/App.css";
import React, { Component } from "react";
import Preview from "./components/Preview";
import uniqid from "uniqid";
import { Button, Form } from "react-bootstrap";
import "./styles/UserForm.css";
import Personal from "./components/UserForm/Personal";
import Professional from "./components/UserForm/Professional";
import Employment from "./components/UserForm/Employment";
import Education from "./components/UserForm/Education";
import Skills from "./components/UserForm/Skills";
import Social from "./components/UserForm/Social";

class App extends Component {
  constructor() {
    super();
    this.state = {
      employment_details: [
        {
          box_id: uniqid(),
          job_title: "Software Engineer",
          job_description: "",
          employer: "Apple",
          start_date: "02/23",
          end_date: "02/23",
          city: "Remote",
        },
        {
          box_id: uniqid(),
          job_title: "Game developer",
          job_description: "",
          employer: "MindGeeks",
          start_date: "02/23",
          end_date: "02/23",
          city: "Piton",
        },
      ],
      education_details: [],
      personal_details: {
        fname: "Delo",
        lname: " Crystal",
        email: "crystal@gmail.com",
        phone: "+230 5732392",
        country: "Rodrigues",
        city: "Port-Mathurin",
      },
      professional_summary:
        "A passionate full-stack developer residing in Rodrigues.",
      skill_details: [
        {
          box_id: uniqid(),
          skill_name: "Communication",
        },
        {
          box_id: uniqid(),
          skill_name: "Teamwork",
        },
      ],
      social_details: [],
    };

    // bindings for Education event handlers
    this.updateEduSchool = this.updateEduSchool.bind(this);
    this.updateEduDegree = this.updateEduDegree.bind(this);
    this.updateEduStartDate = this.updateEduStartDate.bind(this);
    this.updateEduEndDate = this.updateEduEndDate.bind(this);
    this.updateEduCity = this.updateEduCity.bind(this);
    this.updateEduDescription = this.updateEduDescription.bind(this);
    this.addEduBox = this.addEduBox.bind(this);
    this.removeEduBox = this.removeEduBox.bind(this);

    // bindings for Employment event handlers
    this.updateEmpCity = this.updateEmpCity.bind(this);
    this.updateEmpEmployer = this.updateEmpEmployer.bind(this);
    this.updateEmpEndDate = this.updateEmpEndDate.bind(this);
    this.updateEmpJobTitle = this.updateEmpJobTitle.bind(this);
    this.updateEmpStartDate = this.updateEmpStartDate.bind(this);
    this.updateEmpJobDesc = this.updateEmpJobDesc.bind(this);
    this.addEmploymentBox = this.addEmploymentBox.bind(this);
    this.removeEmploymentBox = this.removeEmploymentBox.bind(this);

    //bindings for Personal
    this.updatePersonalCity = this.updatePersonalCity.bind(this);
    this.updatePersonalCountry = this.updatePersonalCountry.bind(this);
    this.updatePersonalEmail = this.updatePersonalEmail.bind(this);
    this.updatePersonalFname = this.updatePersonalFname.bind(this);
    this.updatePersonalLname = this.updatePersonalLname.bind(this);
    this.updatePersonalPhone = this.updatePersonalPhone.bind(this);

    //bindings for Professional
    this.updateProfessionalSummary = this.updateProfessionalSummary.bind(this);

    //bindings for Skills
    this.updateSkillBox = this.updateSkillBox.bind(this);
    this.removeSkillBox = this.removeSkillBox.bind(this);
    this.addSkillBox = this.addSkillBox.bind(this);

    //bindings for Social
    this.addSocialBox = this.addSocialBox.bind(this);
    this.removeSocialBox = this.removeSocialBox.bind(this);
    this.updateSocialLink = this.updateSocialLink.bind(this);
    this.updateSocialLabel = this.updateSocialLabel.bind(this);
  }

  updateEduSchool(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, school: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduDegree(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, degree: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduStartDate(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, start_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateEduEndDate(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, end_date: e.target.value };
        }
        return box;
      }),
    });
  }

  updateEduCity(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, city: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  updateEduDescription(e, box_id) {
    this.setState({
      education_details: this.state.education_details.map((box) => {
        if (box.box_id === box_id) {
          return { ...box, description: e.target.value.trim() };
        }
        return box;
      }),
    });
  }

  addEduBox() {
    const default_education_box = {
      box_id: uniqid(),
      school: "",
      degree: "",
      start_date: "",
      end_date: "",
      city: "",
      description: "",
    };
    this.setState({
      education_details: this.state.education_details.concat(
        default_education_box
      ),
    });
  }

  removeEduBox(e, box_id) {
    this.setState({
      education_details: this.state.education_details.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  updateEmpJobTitle(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          // console.log({ ...emp, job_title: e.target.value });
          return { ...emp, job_title: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateEmpEmployer(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, employer: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  updateEmpStartDate(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, start_date: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateEmpEndDate(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, end_date: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateEmpCity(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, city: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  addEmploymentBox() {
    const default_box = {
      box_id: uniqid(),
      job_title: "",
      job_description: "",
      employer: "",
      start_date: "",
      end_date: "",
      city: "",
    };
    this.setState({
      employment_details: this.state.employment_details.concat(default_box),
    });
  }

  updateEmpJobDesc(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, job_description: e.target.value.trim() };
        }
        return emp;
      }),
    });
  }

  removeEmploymentBox(e, box_id) {
    this.setState({
      employment_details: this.state.employment_details.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  updatePersonalFname(e) {
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        fname: e.target.value.trim(),
      },
    });
  }

  updatePersonalLname(e) {
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        lname: e.target.value.trim(),
      },
    });
  }

  updatePersonalEmail(e) {
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        email: e.target.value.trim(),
      },
    });
  }

  updatePersonalPhone(e) {
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        phone: e.target.value.trim(),
      },
    });
  }

  updatePersonalCountry(e) {
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        country: e.target.value.trim(),
      },
    });
  }

  updatePersonalCity(e) {
    // console.log(this.state.personal_details);
    this.setState({
      personal_details: {
        ...this.state.personal_details,
        city: e.target.value.trim(),
      },
    });
  }

  updateProfessionalSummary(e) {
    this.setState({
      professional_summary: e.target.value.trim(),
    });
  }

  updateSkillBox(e, box_id) {
    this.setState({
      skill_details: this.state.skill_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, skill_name: e.target.value };
        }
        return emp;
      }),
    });
  }

  addSkillBox() {
    const default_box = {
      box_id: uniqid(),
      skill_name: "",
    };
    this.setState({
      skill_details: this.state.skill_details.concat(default_box),
    });
  }

  removeSkillBox(e, box_id) {
    this.setState({
      skill_details: this.state.skill_details.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  removeSocialBox(e, box_id) {
    this.setState({
      social_details: this.state.social_details.filter(
        (box) => box.box_id !== box_id
      ),
    });
  }

  addSocialBox() {
    const default_box = {
      box_id: uniqid(),
      link_name: "",
      url: "",
    };
    this.setState({
      social_details: this.state.social_details.concat(default_box),
    });
  }

  updateSocialLabel(e, box_id) {
    this.setState({
      social_details: this.state.social_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, link_name: e.target.value };
        }
        return emp;
      }),
    });
  }

  updateSocialLink(e, box_id) {
    this.setState({
      social_details: this.state.social_details.map((emp) => {
        if (emp.box_id === box_id) {
          return { ...emp, url: e.target.value };
        }
        return emp;
      }),
    });
  }

  render() {
    return (
      <div className="App">
        <Form className="form-section">
          <Personal
            updatePersonalCity={this.updatePersonalCity}
            updatePersonalCountry={this.updatePersonalCountry}
            updatePersonalEmail={this.updatePersonalEmail}
            updatePersonalFname={this.updatePersonalFname}
            updatePersonalLname={this.updatePersonalLname}
            updatePersonalPhone={this.updatePersonalPhone}
          />

          <Professional
            updateProfessionalSummary={this.updateProfessionalSummary}
          />

          <Employment
            employment_details={this.state.employment_details}
            updateEmpCity={this.updateEmpCity}
            updateEmpEmployer={this.updateEmpEmployer}
            updateEmpEndDate={this.updateEmpEndDate}
            updateEmpStartDate={this.updateEmpStartDate}
            updateEmpJobDesc={this.updateEmpJobDesc}
            updateEmpJobTitle={this.updateEmpJobTitle}
            addEmploymentBox={this.addEmploymentBox}
            removeEmploymentBox={this.removeEmploymentBox}
          />

          <Education
            education_details={this.state.education_details}
            updateEduCity={this.updateEduCity}
            updateEduDegree={this.updateEduDegree}
            updateEduDescription={this.updateEduDescription}
            updateEduEndDate={this.updateEduEndDate}
            updateEduSchool={this.updateEduSchool}
            updateEduStartDate={this.updateEduStartDate}
            addEduBox={this.addEduBox}
            removeEduBox={this.removeEduBox}
          />

          <Skills
            skill_details={this.state.skill_details}
            updateSkillBox={this.updateSkillBox}
            addSkillBox={this.addSkillBox}
            removeskils={this.addSkillBox}
          />

          <Social
            social_details={this.state.social_details}
            addSocialBox={this.addSocialBox}
            removeSocialBox={this.removeSocialBox}
            updateSocialLabel={this.updateSocialLabel}
            updateSocialLink={this.updateSocialLink}
          />
          <div className="d-flex justify-content-between">
            <Button variant="warning" type="submit">
              Clear form
            </Button>
            <Button variant="primary" type="submit">
              Download as PDF
            </Button>
          </div>
        </Form>{" "}
        <Preview formInfo={this.state} />
      </div>
    );
  }
}

export default App;
