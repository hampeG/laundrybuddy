import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import "./AdminBand.css";

const OwnerBand = () => {
  return (
    <div className="white-band-container">
    <div className="white-band-text">
      <FontAwesomeIcon icon={faUserTie} className="white-band-icon" />
      Admin Dashboard
    </div>
  </div>
  )
}

export default OwnerBand