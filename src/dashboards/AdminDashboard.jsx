import React from 'react';
import UserManagement from '../components/UserManagement';
import ViewAnalytics from '../components/ViewAnalytics';
import ManageFeedback from '../components/ManageFeedback';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserManagement />
      <ViewAnalytics />
      <ManageFeedback />
    </div>
  );
};

export default AdminDashboard;
