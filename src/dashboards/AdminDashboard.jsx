import React from "react";
import AnalyticsHub from "./AnalyticsHub";
import AdminBand from "./AdminBand";
import ManageFeedback from "../components/ManageFeedback";
import ManageSlots from "../components/ManageSlots.jsx";
import "../MyBookingView.css";

const AdminDashboard = () => {
  return (
    <div className="mybs-admin">
      <AdminBand />
      <AnalyticsHub />
      <ManageSlots />
      <ManageFeedback />
    </div>
  );
};

export default AdminDashboard;
