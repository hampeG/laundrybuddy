import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import "./UserBand.css";

const UserBand = () => {
  return (
    <div className="white-band-container">
    <div className="white-band-text">
      <FontAwesomeIcon icon={faBuildingUser} className="white-band-icon" />
      Tenant Dashboard
    </div>
  </div>
  )
}

export default UserBand