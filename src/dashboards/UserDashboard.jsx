import React from "react";
import UserBand from "./UserBand";
import ManageUser from "../components/ManageUser";

const UserDashboard = () => {
  return (
    <div>
      <UserBand />
      <ManageUser />
    </div>
  );
};

export default UserDashboard;
