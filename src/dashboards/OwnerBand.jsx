import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./OwnerBand.css";

const OwnerBand = () => {
  return (
    <div className="white-band-container">
    <div className="white-band-text">
      <FontAwesomeIcon icon={faUserSecret} className="white-band-icon" />
      Owner Dashboard
    </div>
  </div>
  )
}

export default OwnerBand