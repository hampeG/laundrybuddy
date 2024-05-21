import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import "./AboutBand.css";

const AboutBand = () => {
  return (
    <div className="white-band-container">
      <div className="white-band-text">
        <FontAwesomeIcon icon={faFileLines} className="white-band-icon" />
        About LaundryBuddy
      </div>
    </div>
  );
};

export default AboutBand;
