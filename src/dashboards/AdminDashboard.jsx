import React from "react";
import AnalyticsHub from "./AnalyticsHub";
import AdminBand from "./AdminBand";
import ManageFeedback from "../components/ManageFeedback";

const AdminDashboard = () => {
  return (
    <div>
      <AdminBand />
      <AnalyticsHub />
      <ManageFeedback />
    </div>
  );
};

export default AdminDashboard;
