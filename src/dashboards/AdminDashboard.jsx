import React from "react";
import AnalyticsHub from "./AnalyticsHub";
import AdminBand from "./AdminBand";
import ManageFeedback from "../components/ManageFeedback";
import ManageSlots from "../components/ManageSlots.jsx";

const AdminDashboard = () => {
  return (
    <div>
      <AdminBand />
      <AnalyticsHub />
      <ManageSlots />
      <ManageFeedback />
    </div>
  );
};

export default AdminDashboard;
