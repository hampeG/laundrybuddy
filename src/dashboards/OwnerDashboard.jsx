import React from "react";
import ManageSlots from "../components/ManageSlots.jsx";
import UserManagement from "../components/UserManagement.jsx";
import OwnerBand from "./OwnerBand.jsx";
import AnalyticsHub from "./AnalyticsHub.jsx";

const OwnerDashboard = () => {
  return (
    <div>
      <OwnerBand />
      <AnalyticsHub />
      <ManageSlots />
      <UserManagement />
    </div>
  );
};

export default OwnerDashboard;
