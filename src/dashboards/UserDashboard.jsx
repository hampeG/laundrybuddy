import React from "react";
import UserBand from "./UserBand";
import ManageUser from "../components/ManageUser";
import "../MyBookingView.css";

const UserDashboard = () => {
  return (
    <div className="mybs-admin">
      <UserBand />
      <ManageUser />
    </div>
  );
};

export default UserDashboard;
