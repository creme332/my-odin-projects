import React, { Component } from "react";
import './../styles/Preview.css';
 
class Preview extends Component {
  render() {
    return (
        <div className="preview-section">
            <div className="page">
                <h1>John Doe</h1>
                <div className="square"></div>
                <h6>Software Developer</h6>
                <div className="personal-details">
                    Address
                </div>
                <div className="">Email</div>
                <h3>Employment</h3>
                <h3>Education</h3>
                <h3>Projects</h3>
                <h3>Skills</h3>

            </div>
        </div>
    );
  }
}

export default Preview;
